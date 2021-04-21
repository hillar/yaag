<script>
  import { createScene, createGuide } from 'w-gl';
  import ngraph from 'ngraph.graph'
  import forcelayout from 'ngraph.forcelayout'
  import createtree from 'yaot'

  import {style2rgba, toColor, toRgba} from './colors.mjs'
  import PointCollection from './PointCollection.js'
  import LineCollection from './LineCollection.js'
  import TextCollection from './TextCollection.js'

  import { onMount } from 'svelte'

  export let nodeColor = 0xddaaaa
  export let lineColor = 0xffffff50
  export let textColor = 0xffffff50
  export let rootColor = 0xffffff
  export let highlightColor = -65281
  export let childColor = 0x90f8fcff
  export let parentColor = 0xddaaaa
  export let spehereRadius = 3

  const ITERATIONS_COUNT = 1000

  let linkColor = lineColor

  export function add(parent,childs) {
    return _add(parent,childs)
  }
  export function relayout() {
     console.log('relayout')
	   return _relayout()
  }


  export function birdview() {
    console.log('birdview')
    const rect = layout.getGraphRect()
    const factor = navigator.platform.startsWith('Win') ? 1.2 : .9
    scene.setViewBox({
      left: rect.min_x * factor,
      top: rect.min_y * factor,
      right: rect.max_x * factor,
      bottom: rect.max_y* factor,
    })
  }



  let viewport
  let viewport_height
  let viewport_width
  let canvas
  let pixelRatio = 1




let physicsSettings = {
  dimensions: 2,
  timeStep: 0.5,
  springLength: 20,
  springCoefficent: 0.8,
  gravity: -100,
  dragCoefficent: 0.9,
  theta: 0.8,
  nodeMass : (nodeId) => {
      const links = graph.getLinks(nodeId);
      if (links && links.length) return 1 + links.length / 3.0;
      else if (links && links.size) return 1 + links.size / 3.0;
      else return 1
    }
}
let scene
let graph
let layout
let nodes
let lines
let texts

//let nodesCount = graph.getNodesCount()
//let linksCount = graph.getLinksCount()
let pointPositions
let idxPositions
let frameToken = 0


  function initScene() {
    scene = createScene(canvas);
    texts = new TextCollection(scene.getGL())
    //scene.setClearColor(0x0f / 255, 0x0f / 0, 0x0f / 0, .5);
    graph = new ngraph()
    layout = forcelayout(graph, physicsSettings)
    lines = new LineCollection(scene.getGL())
    nodes = new PointCollection(scene.getGL())

    scene.appendChild(lines)
    scene.appendChild(nodes)
    scene.appendChild(texts)
  }

function _add(parent, childs) {
  if (!parent.id) parent = { id: parent , data: {}}
  let needBirdView = false
  if (!graph.hasNode(parent.id)) {
    graph.addNode(parent.id, parent.data)
    // pin root node to 0,0 and make it big
    if (graph.getNodesCount() === 1) {
      let nodeRoot = graph.getNode(parent.id)
			nodeRoot.data.size = nodeRoot.data.size ?  nodeRoot.data.size : spehereRadius * 4
			nodeRoot.data.color = nodeRoot.data.color ?  nodeRoot.data.color : rootColor
      //nodeRoot.data.type = nodeRoot.data.type ? nodeRoot.data.type : 'root'
      //layout.pinNode(nodeRoot, true)
      layout.setNodePosition(parent.id, 0, 0, 0)
      needBirdView = true
    }
    let node = graph.getNode(parent.id)
    const point = layout.getNodePosition(parent.id)
    let size = spehereRadius * 2
    if (node.data && node.data.size) {
      size = node.data.size
    } else {
      if (!node.data) node.data = {}
      node.data.size = size
    }
    node.ui = {
      size,
      position: [point.x, point.y, point.z || 0],
      color: node.data.color || parentColor,
    }

    node.textId = texts.addText({
      id: node.id,
			x: point.x,
			y: point.y,
			text: node.data.label ? ''+node.datal.label : ''+node.id,
			color: textColor
		});

    //node.uiId = nodes.add(node.ui)
    if (node.data.type && icons[node.data.type]){
      node.puiIds = []
      const icon = icons[node.data.type] ? icons[node.data.type] : icons[node.data.menuType]

      for (const c in icon){
        for (let i = 1; i < icon[c].length; ++i) {
          const puid = pnodes.add({
            from: [icon[c][i-1][0]+point.x, icon[c][i-1][1]+point.y, 0],
            to: [icon[c][i][0]+point.x, icon[c][i][1]+point.y,  0],
            //color: rootColor,
          });
          node.puiIds.push({id:puid,i,c})
        }
      }
    } else {
      node.uiId = nodes.add(node.ui)
    }

  }
  if (!Array.isArray(childs)) childs = [childs]
  for (let child of childs) {
      if (!child.id) child = {id: child, data: {}}
      if (!graph.hasNode(child.id)) {
        graph.addNode(child.id, child.data)
        let node = graph.getNode(child.id)
        const point = layout.getNodePosition(child.id)
        let size = spehereRadius
        if (node.data && node.data.size) {
          size = node.data.size
        } else {
          if (!node.data) node.data = {}
          node.data.size = size
        }

        node.ui = {
          size,
          position: [point.x, point.y, point.z || 0],
          color: node.data.color || childColor,
        }

        node.textId = texts.addText({
          id: node.id,
    			x: point.x,
    			y: point.y,
    			text: node.data.label ? ''+node.datal.label : ''+node.id,
    			color: textColor
    		});

        //node.uiId = nodes.add(node.ui)

        if (node.data.type && icons[node.data.type]){
          node.puiIds = []
          const icon = icons[node.data.type] ? icons[node.data.type] : icons[node.data.menuType]
          for (const c in icon){
            for (let i = 1; i < icon[c].length; ++i) {
              const puid = pnodes.add({
                from: [icon[c][i-1][0]+point.x, icon[c][i-1][1]+point.y, 0],
                to: [icon[c][i][0]+point.x, icon[c][i][1]+point.y,  0],
                color: node.ui.color
              });
              node.puiIds.push({id:puid,i,c})
            }
          }
        } else {
          node.uiId = nodes.add(node.ui)
        }
      }
      if (!graph.hasLink(parent.id, child.id)) {
        graph.addLink(parent.id, child.id, child.linkdata)
        let link = graph.getLink(parent.id, child.id)
        const from = layout.getNodePosition(parent.id)
        const to = layout.getNodePosition(child.id)
        const line = {
          from: [from.x, from.y, from.z || 0],
          to: [to.x, to.y, to.z || 0],
          color: linkColor,
        }
        link.ui = line
        link.uiId = lines.add(link.ui)
      }
    //}, 0)
  }
  relayout()
  if (needBirdView) {
    birdview()
  }
}

function _relayout() {
  /*
	let stable =  layout.step()
  for (let i = 0; i < count; ++i) {
    stable =  layout.step()
		if (stable) break
  }*/
  renderFrame()
}

function updatePositions() {
  pointPositions = createtree()
  idxPositions = []
  const tmp = []
  // TODO move instead of remove
  //scene.removeChild(texts)
  //texts = new TextCollection(scene.getGL())
  graph.forEachNode((node) => {
    let pos = layout.getNodePosition(node.id)
    let uiPosition = node.ui.position
    uiPosition[0] = pos.x
    uiPosition[1] = pos.y
    uiPosition[2] = pos.z || 0
    nodes.update(node.uiId, node.ui)

    for (const p of uiPosition) tmp.push(p)
    idxPositions.push(node.id)
    if (node.puiIds){
      let point = pos
      const icon = icons[node.data.type] ? icons[node.data.type] : icons[node.data.menuType]
      for (const {id,i,c} of node.puiIds){
          pnodes.update(id,{
            from: [icon[c][i-1][0]+point.x, icon[c][i-1][1]+point.y, pos.z || 0],
            to: [icon[c][i][0]+point.x, icon[c][i][1]+point.y,  pos.z || 0],
            color: node.ui.color
          })
      }
    }
    texts.updateText({
      id: node.id,
			x: pos.x,
			y: pos.y,
			color: textColor
		});
  })
  scene.appendChild(texts)
  pointPositions.init(tmp)

  graph.forEachLink((link) => {
    var fromPos = layout.getNodePosition(link.fromId)
    var toPos = layout.getNodePosition(link.toId)
    let { from, to } = link.ui
    from[0] = fromPos.x
    from[1] = fromPos.y
    from[2] = fromPos.z || 0
    to[0] = toPos.x
    to[1] = toPos.y
    to[2] = toPos.z || 0
    lines.update(link.uiId, link.ui)
  })
}

function renderFrame() {
  if (!frameToken) frameToken = requestAnimationFrame(frame)
}

function frame() {
  renderScene()
  frameToken = 0
}

function renderScene() {
	let stable =  layout.step()
  for (let i = 0; i < ITERATIONS_COUNT; ++i) {
		if (stable) break
   	stable =  layout.step()
  }
  updatePositions()
  const rect = layout.getGraphRect()
  scene.setViewBox({
    left: rect.min_x,
    top: rect.min_y,
    right: rect.max_x,
    bottom: rect.max_y,
  })
  scene.renderFrame()
}




  onMount( () => {
    initScene()
    /*
    let cs = getComputedStyle(viewport.parentElement)
    let c = cs.getPropertyValue('color')
    for (const p of cs) {
      const sv = cs.getPropertyValue(p)
      if (sv.startsWith('rgb')) {
        const c = style2rgba(cs.getPropertyValue(p))
        console.log(p,sv)
        const [r,g,b,a] = c
        const n = toColor(r,g,b,a)
        const cc = toRgba(n)

        console.log(n,c,cc)
      }
    }
    */

  })




</script>

<style>
	svelte-yaag-viewport {
		position: relative;
		display: block;
    height: 100%;
    width: 100%;
    //border: 1px outset blue;
	}
	canvas {
		display: block;
    height: 100%;
    width: 100%;
    //border: 1px outset red;
	}

</style>

<svelte-yaag-viewport
  bind:this={viewport}

  >
    <canvas
      bind:this={canvas}
      />
</svelte-yaag-viewport>
<!--

bind:offsetHeight={viewport_height}
bind:offsetWidth={viewport_width}


style="width: 100%; height: 100%;"
width={viewport_height * pixelRatio}
height={viewport_width * pixelRatio}
style="width: {viewport_width-2}px; height: {viewport_height-2}px;"

-->
