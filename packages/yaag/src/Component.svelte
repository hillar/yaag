<script>
  import { createScene, createGuide } from 'w-gl';
  import ngraph from 'ngraph.graph'
  import forcelayout from 'ngraph.forcelayout'
  import createtree from 'yaot'
  import paths from 'ngraph.path'

  import {style2rgba, toColor, toRgba} from './colors.mjs'
  import PointCollection from './PointCollection.js'
  import LineCollection from './LineCollection.js'
  import TextCollection from './TextCollection.js'

  import Loading from './Loading.svelte'

  import { onMount, createEventDispatcher } from 'svelte'

  export let nodeColor = 0xddaaaa
  export let lineColor = 0xffffff50
  export let textColor = 0xffffff
  export let rootColor = 0xffaaaa
  export let highlightColor = -65281
  export let childColor = 0xddaaaa  //0x90f8fcff
  export let parentColor = 0xddaaaa
  export let spehereRadius = 5
  export let findPath = findPathAStar

  const aStar = paths.aStar

  const ITERATIONS_COUNT = 10000
  const intersectSphereRadius = 20 // TODO set depending on graph nodes size
  let X, Y
  const _dispatch = createEventDispatcher()
  const dispatch = (n,d) => {
    console.log(n,d)
    _dispatch(n,d)
  }

  let linkColor = lineColor

  export function add(parent,childs) {
    return _add(parent,childs)
  }
  export function relayout() {
	   renderFrame()
  }


  export function birdview() {
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
    // TODO better way to wait for textcolletion is ready
    texts = new TextCollection(scene.getGL(),()=>{updatePositions(); scene.renderFrame()})
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

  //return new Promise ( (resolve) => {
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
      layout.pinNode(nodeRoot, true)
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

    // text id must be same as node id, as addtext can not return ;/

    texts.addText({
      id: node.id,
			x: point.x,
			y: point.y,
			text: node.data.label ? ''+node.datal.label : ''+node.id,
			color: textColor
		});

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

        texts.addText({
          id: node.id,
    			x: point.x - node.data.size ,
    			y: point.y - node.data.size,
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
    relayout()
  }
  // relayout()
  if (needBirdView) {
    birdview()
  }
  //resolve()
  //})

}

function _relayout() {

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
    const pos = layout.getNodePosition(node.id)
    const uiPosition = node.ui.position
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
			x: pos.x -  node.data.size/2 ,
			y: pos.y  + node.data.size/2 ,
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

let waittimeouter
let waitcounter = 0
let startwait

function renderFrame() {
  if (!frameToken) frameToken = requestAnimationFrame(frame)
}

function frame() {
  renderScene()
  frameToken = 0
}

let maxTimePerChunk

function renderScene() {
  maxTimePerChunk = maxTimePerChunk || 100;
  let startTime
  let iters = 0
  let stable
  if (!startwait) {
    startwait = window.performance.now()
  }
  function doIters(){
    startTime = window.performance.now();
    while (iters < ITERATIONS_COUNT) {
      iters++
      stable = layout.step()
  		if (stable) {
        clearTimeout(waittimeouter)
        waittimeouter = setTimeout(()=>{
          const took = window.performance.now() - startwait
          startwait = undefined
        },maxTimePerChunk*2)
        break
      }
      const elapsed = window.performance.now() - startTime;
      if (elapsed > maxTimePerChunk && iters < ITERATIONS_COUNT) {
        const rect = layout.getGraphRect()
        updatePositions()
        scene.setViewBox({
          left: rect.min_x,
          top: rect.min_y,
          right: rect.max_x,
          bottom: rect.max_y,
        })
        scene.renderFrame()
        setTimeout( () => { doIters() },1)
        break
      }
    }
    const rect = layout.getGraphRect()
    updatePositions()
    scene.setViewBox({
      left: rect.min_x,
      top: rect.min_y,
      right: rect.max_x,
      bottom: rect.max_y,
    })
    scene.renderFrame()
  }
  doIters()
}



function preciseCheck(x, y, z, cx, cy, cz, r) {
  function sqr(x) {
    return x * x
  }
  const r2 = r * r
  return sqr(x - cx) + sqr(y - cy) + sqr(z - cz) < r2
}


function xyisnode(x,y,z,intersectRadius = intersectSphereRadius){
  const maybehit = pointPositions.intersectSphere(Math.round(x), Math.round(y), Math.round(z), intersectRadius)
  for (let i in maybehit) {
    const hit = (maybehit[i] + 3) / 3
    const hittedNode = idxPositions[hit - 1]
    const node = graph.getNode(hittedNode)
    const r = node.ui.size / 2
    const xx = node.ui.position[0]
    const yy = node.ui.position[1]
    const zz = node.ui.position[2]
    const testhit = preciseCheck(xx, yy, zz, x, y, z, r)
    if (testhit) {
      return node
    }
  }
}




function findPathAStar(graph,from,to){

  let pathFinder = aStar(graph)
  const result = new ngraph()
  const path = pathFinder.find(to,from)
  if (path.length) for (let i = 0; i < (path.length -1); i++ ) result.addLink(path[i].id,path[i+1].id)
  return result.getLinksCount() ? result : undefined
}

function drawPath(connetion, color){
  for (let i = 0; i < (connetion.length-1); ++i) {
    for (const link of connetion[i].links) {
      if (link.fromId === connetion[i+1].id || link.toId === connetion[i+1].id) {
        link.ui.color = color
        lines.update(link.uiId,link.ui)
      }
    }
  }
}
function drawSubGraphLinks(subg, lcolor, ncolor){
  ncolor = ncolor ? ncolor : ( lcolor ? lcolor : undefined)
  subg.forEachLink((l) => {
    let link
    link = graph.getLink(l.fromId,l.toId)
    if (!link) link = graph.getLink(l.toId,l.fromId)
    link.ui.color = lcolor ? lcolor : (link.data && link.data.color ? link.data.color : linkColor)
    lines.update(link.uiId,link.ui)
  })

  subg.forEachNode((n) => {
    const node = graph.getNode(n.id)
    node.ui.color = ncolor ? ncolor : (node.data.color && node.data.color ? node.data.color : nodeColor)
    nodes.update(node.uiId,node.ui)
  })

}

function drawNode(node, ncolor) {
  node.ui.color = ncolor ? ncolor : (node.data.color && node.data.color ? node.data.color : nodeColor)
  nodes.update(node.uiId,node.ui)
}

  onMount( () => {
    //TODO get colors from style
    /*
    let cs = getComputedStyle(viewport)
    let color = cs.getPropertyValue('color')
    */
    initScene()
    /*
    background-color
    color
    fill
    */
    /*
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
      let waitformousetostop
      let mouseOnNode
      let clickedNode
      scene.on('mousemove',(e)=>{
        clearTimeout(waitformousetostop)
        waitformousetostop = setTimeout(() => {
            const node = xyisnode(e.x,e.y,e.z)
            if (node) {
              if (mouseOnNode) {
                mouseOnNode.node.ui.color = mouseOnNode.oldcolor
                nodes.update(mouseOnNode.node.uiId, mouseOnNode.node.ui)
                for (const link of mouseOnNode.node.links){
                  link.ui.color = linkColor
                  lines.update(link.uiId,link.ui)
                }
              }
              mouseOnNode =  { oldcolor: node.ui.color, node}
              //dispatch('mouseOnNode', node)
              node.ui.color = highlightColor
              nodes.update(node.uiId, node.ui)
              let connetion
              if (clickedNode) {
                if (clickedNode.connetion ) {
                  drawSubGraphLinks(clickedNode.connetion)
                }
                connetion = findPath(graph,clickedNode.node.id,node.id)
                clickedNode.connetion = connetion
              }
              if (connetion) {
                drawSubGraphLinks(connetion, highlightColor)
                dispatch('mouseOnPath', connetion)
              } else {
                dispatch('mouseOnNode', node)
                for (const link of node.links){
                  link.ui.color = highlightColor
                  lines.update(link.uiId,link.ui)
                }
              }
              scene.renderFrame()
            }
        },50)
      })
      scene.on('click',(e)=>{
        const node = xyisnode(e.x,e.y,e.z)
        if (node) {
          if (mouseOnNode) {
            mouseOnNode.node.ui.color = mouseOnNode.oldcolor
            nodes.update(mouseOnNode.node.uiId, mouseOnNode.node.ui)
            for (const link of mouseOnNode.node.links){
              link.ui.color = linkColor
              lines.update(link.uiId,link.ui)
            }
            mouseOnNode = undefined
          }
          if (clickedNode) {
            if (clickedNode.connetion) {
              dispatch('clickOnPath', clickedNode.connetion)
            }
            clickedNode.node.ui.color = clickedNode.oldcolor
            nodes.update(clickedNode.node.uiId, clickedNode.node.ui)
            if (clickedNode.connetion ) {
              //drawPath(clickedNode.connetion,linkColor)
              drawSubGraphLinks(clickedNode.connetion)
            }
          }
          if (!clickedNode || clickedNode.node.id !== node.id){
            if (!(clickedNode && clickedNode.connetion)) dispatch('clickOnNode', node)
            clickedNode =  {oldcolor:node.ui.color, node}
            node.ui.color = highlightColor
            nodes.update(node.uiId, node.ui)
            }
          scene.renderFrame()
        }
      })

  })




</script>

<style>
	svelte-yaag-viewport {
		position: relative;
		display: block;
    height: 100%;
    width: 100%;
	}
	canvas {
		display: block;
    height: 100%;
    width: 100%;
	}
  .loading {
    position: absolute;
    top: 45%;
    left: 5%;
    width: 90%;
  }

</style>

<svelte-yaag-viewport bind:this={viewport}  >
    <canvas bind:this={canvas}
      on:contextmenu="{
        (e)=>{
          // TODO move it to scene if w-gl ready
          e.preventDefault();
          const {x,y,z} = scene.getSceneCoordinate(e.clientX, e.clientY)
          const node = xyisnode(x,y,z)
          if (node) {
            console.log('contextmenu',node)
          } else {
            console.log('contextmenu','MAIN')
          }
        }
      }"
    />
    {#if (startwait)}
    <div class="loading">
        <Loading />
    </div>
    {/if}
</svelte-yaag-viewport>
