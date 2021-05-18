<script>
  import { createScene, createGuide } from 'w-gl';
  import ngraph from 'ngraph.graph'
  import forcelayout from 'ngraph.forcelayout'
  import createtree from 'yaot'
  import paths from 'ngraph.path'


  import PointCollection from './PointCollection.js'
  import LineCollection from './LineCollection.js'
  import TextCollection from './TextCollection.js'
  import { toWGL, toRGBA, getComplimentaryColor } from './colors.mjs'
  import Loading from './Loading.svelte'
  import {icons as defaultIcons} from './icons.mjs'
  import Menu from './Menu.svelte'

  import { onMount, createEventDispatcher } from 'svelte'

  export let fontJSON
  export let fontPNG

  export let sceneColor = 'white'
  export let nodeColor = 'mediumseagreen'
  export let clickedColor
  export let lineColor
  export let textColor
  export let highlightColor
  export let rootColor
  export let parentColor
  export let childColor

  export let spehereRadius = 5
  export let findPath = findPathAStar
  export let icons = {}
  export let menus = []
  export let actions = []
  const colors = {}
  const actionsMap = new Map()
  const menusMap = new Map()

  const defaultMenuNode = [remove]
  const defaultMenuGraph = [{name:'relayout',fn:relayout},{name:'birdview',fn:birdview}]


  let contextmenu
  let X, Y

  const aStar = paths.aStar

  const ITERATIONS_COUNT = 6000
  const intersectSphereRadius = spehereRadius * 4 // TODO set depending on graph nodes size

  const _dispatch = createEventDispatcher()
  const dispatch = (n,d) => {
    console.log('dispatch',n,d)
    _dispatch(n,d)
  }

  export function clear(){
    graph.clear()
    initScene()
  }


  export function remove(node) {
    if (!node.id) node = graph.getNode(node)
    if (!node) throw new Error('not node: '+ node)
    return _remove(node)
  }

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
  springLength: 30,
  springCoefficent: 0.9,
  gravity: -400,
  dragCoefficent: 0.8,
  theta: 0.9,
  nodeMass : (nodeId) => {
      const links = graph.getLinks(nodeId);
      if (links && links.length) return 1 + links.length / 3.0;
      else if (links && links.size) return 1 + links.size / 3.0;
      else return 1
    }
}
let scene
export let graph
let layout
let nodes
let pnodes
let lines
let texts
let mouseOnNode
let clickOnNode

//let nodesCount = graph.getNodesCount()
//let linksCount = graph.getLinksCount()
let pointPositions
let idxPositions
let frameToken = 0


  function initScene() {
    scene = createScene(canvas);
    // TODO better way to wait for textcolletion is ready
    texts = new TextCollection(scene.getGL(),fontJSON,fontPNG,()=>{updatePositions(); scene.renderFrame()})
    const {r,g,b,a} = toRGBA(sceneColor)
    scene.setClearColor(r,g,b,a);
    graph = new ngraph()
    layout = forcelayout(graph, physicsSettings)
    lines = new LineCollection(scene.getGL())
    nodes = new PointCollection(scene.getGL())
    pnodes = new LineCollection(scene.getGL(),{width:4})

    scene.appendChild(lines)
    scene.appendChild(nodes)
    scene.appendChild(pnodes)
    scene.appendChild(texts)

  }

function _add(parent, childs) {

  //return new Promise ( (resolve) => {
  if (!parent.id) parent = { id: parent , data: {}}
  let needBirdView = false
  if (!graph.hasNode(parent.id)) {
    if (!parent.data) parent.data = {}
    const isRoot = graph.getNodesCount() === 0
    parent.data.size = parent.data.size ? parent.data.size : (isRoot ? spehereRadius * 4 : spehereRadius * 2)
    parent.data.color = parent.data.color ? toWGL(parent.data.color) : (isRoot ? colors.rootColor : colors.parentColor)
    let node = graph.addNode(parent.id, parent.data)
    if (isRoot) {
      layout.pinNode(node, true)
      layout.setNodePosition(node.id, 0, 0, 0)
      needBirdView = true
    }
    const point = layout.getNodePosition(parent.id)
    node.ui = {
      size: node.data.size,
      position: [point.x, point.y, point.z || 0],
      color: node.data.color,
    }

    // text id must be same as node id, as addtext can not return ;/
    texts.addText({
      id: node.id,
			x: point.x,
			y: point.y,
			text: node.data.label ? ''+node.data.label : ''+node.id,
			color: colors.textColor
		});

    if (node.data.type && icons[node.data.type]){
      node.puiIds = []
      const icon = icons[node.data.type] ? icons[node.data.type] : icons[node.data.menu]
      for (const c in icon){
        for (let i = 1; i < icon[c].length; ++i) {
          const puid = pnodes.add({
            from: [icon[c][i-1][0]+point.x, icon[c][i-1][1]+point.y, 0],
            to: [icon[c][i][0]+point.x, icon[c][i][1]+point.y,  0],
            color: node.ui.color,
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
        if (!child.data) child.data = {}
        child.data.size = child.data.size ? child.data.size : spehereRadius * 2
        child.data.color = child.data.color ? toWGL(child.data.color) : colors.childColor
        graph.addNode(child.id, child.data)
        let node = graph.getNode(child.id)
        const point = layout.getNodePosition(child.id)
        node.ui = {
          size: node.data.size,
          position: [point.x, point.y, point.z || 0],
          color: node.data.color,
        }
        if (node.data.type && icons[node.data.type]){
          node.puiIds = []
          const icon = icons[node.data.type] ? icons[node.data.type] : icons[node.data.menu]
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

        texts.addText({
          id: node.id,
    			x: point.x,
    			y: point.y,
    			text: node.data.label ? ''+node.data.label : ''+node.id,
    			color: colors.textColor
    		});

      }
      if (!graph.hasLink(parent.id, child.id)) {
        graph.addLink(parent.id, child.id, child.linkdata)
        let link = graph.getLink(parent.id, child.id)
        const from = layout.getNodePosition(parent.id)
        const to = layout.getNodePosition(child.id)
        const line = {
          from: [from.x, from.y, from.z || 0],
          to: [to.x, to.y, to.z || 0],
          color: colors.lineColor,
        }
        link.ui = line
        link.uiId = lines.add(link.ui)
      }
    relayout()
  }
  if (needBirdView) {
    birdview()
  }
}

function _delNode(node){
  if (node.puiIds){
    for (const id of node.puiIds) {
      pnodes.remove(id)
    }
  } else if (node.uiId) {
    nodes.remove(node.uiId)
  }
  texts.remove(node.id)
}
function _remove(node) {
  if (mouseOnNode && mouseOnNode.node.id === node.id) mouseOnNode = undefined
  if (clickOnNode && clickOnNode.endpoint.id === node.id) clickOnNode.endpoint = undefined
  if (clickOnNode && clickOnNode.node.id === node.id) clickOnNode = undefined
  if (node.links.length) {
      const todellinks = []
      const todelnodes = [node]
      // delete from scene
      graph.forEachLinkedNode( node.id, linkedNode => {
        let link = graph.getLink(node.id,linkedNode.id)
        if (!link) link = graph.getLink(linkedNode.id,node.id)
        todellinks.push(link)
        lines.remove(link.uiId)
        if (linkedNode.links.length < 2) {
          _delNode(linkedNode)
          todelnodes.push(linkedNode)
        }
      })
      _delNode(node)
      // delete from graph
      for (const link of todellinks) {
        graph.removeLink(link)
      }
      for (const n of todelnodes) {
        graph.removeNode(n.id)
      }
  } else {
    _delNode(node)
    graph.removeNode(node)
  }
  updatePositions()
  scene.renderFrame()
}

function _relayout() {
  renderFrame()
}

function updatePositions() {
  pointPositions = createtree()
  idxPositions = []
  const tmp = []
  graph.forEachNode((node) => {
    const pos = layout.getNodePosition(node.id)
    const uiPosition = node.ui.position
    uiPosition[0] = pos.x
    uiPosition[1] = pos.y
    uiPosition[2] = pos.z || 0
    nodes.update(node.uiId, node.ui)

    for (const p of uiPosition) tmp.push(p)
    idxPositions.push(node.id)
    let movetext = 0
    if (node.puiIds){
      movetext = 2
      let point = pos
      const icon = icons[node.data.type] ? icons[node.data.type] : icons[node.data.menu]
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
			x: pos.x - movetext, // -  node.data.size/2 ,
			y: pos.y + movetext, //  + node.data.size/2 ,
			color: colors.textColor
		});

  })
  //scene.appendChild(texts)
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
  //frameToken = 0
}

let maxTimePerChunk

function renderScene() {
  maxTimePerChunk = maxTimePerChunk || 25;
  let startTime
  let iters = 0
  let last = 0
  let stable
  if (!startwait) startwait = window.performance.now()
  function doIters(){
    startTime = window.performance.now();
    while (iters < ITERATIONS_COUNT) {
      iters++
      stable = layout.step()
  		if (stable || iters >= ITERATIONS_COUNT) {
        clearTimeout(waittimeouter)
        waittimeouter = setTimeout(()=>{
          const took = window.performance.now() - startwait
          startwait = undefined
          frameToken = 0
        },maxTimePerChunk*2)
        updatePositions()
        birdview()
        //frameToken = 0
        break
      }
      const elapsed = window.performance.now() - startTime;
      if (elapsed > maxTimePerChunk && iters < ITERATIONS_COUNT) {
        updatePositions()
        birdview()
        //console.log(iters - last)
        //last = iters
        setTimeout( () => { doIters() },1)
        break
      }
    }
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
    if (!node) return
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

function drawNode(node, ncolor, lcolor) {
  lcolor = lcolor ? lcolor : ncolor
  node = node.id ? node : graph.getNode(node)

  node.ui.color = ncolor ? ncolor : node.data.color //(node.data.color && node.data.color ? toWGL(node.data.color) : colors.nodeColor)
  if (node.puiIds) {
    for (const {id,i,c} of node.puiIds){
        const { from, to } = pnodes.get(id)
        pnodes.update(id,{ from, to, color: node.ui.color })
    }
  } else nodes.update(node.uiId,node.ui)
  for (const link of node.links){
    link.ui.color = lcolor ? lcolor : (link.data && link.data.color ? link.data.color : colors.lineColor)
    lines.update(link.uiId,link.ui)
  }
}

function drawSubGraphLinks(subg,ncolor,lcolor){
  subg.forEachNode((n) => {
    if (clickOnNode && clickOnNode.node.id === n.id) return
    //if (mouseOnNode && mouseOnNode.node.id == n.id) return
    drawNode(n.id,ncolor,lcolor)
  })
  /*
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
  */
}
/*
function drawNode(node, ncolor) {
  node.ui.color = ncolor ? ncolor : (node.data.color && node.data.color ? node.data.color : nodeColor)
  nodes.update(node.uiId,node.ui)
}
*/

function parseAction(action) {
  let name
  let fn
  if (typeof action === 'string') {
    name = action
    fn=(node)=>{dispatch('menuAction',{action,node})}
  } else if (typeof action === 'function') {
    name = action.name
    fn = action
  } else {
    name = Object.keys(action)[0]
    if (typeof action[name] === 'function') {
      fn = action[name]
    } else throw new Error('not a function: ' + name)
  }
  return {name , fn}
}

  onMount( () => {
    //TODO get colors from style
    /*
    let cs = getComputedStyle(viewport)
    let color = cs.getPropertyValue('color')
    export let sceneColor = 'black'
    export let nodeColor = 'green'
    export let lineColor = 'yellowgreen'
    export let textColor = toWGL('black')
    export let highlightColor = toWGL('indianred')
    export let clickedColor = toWGL('red')
    export let rootColor = toWGL('yellowgreen')
    export let parentColor = toWGL('yellowgreen')
    export let childColor = toWGL('yellowgreen')
    */
    colors.sceneColor = toWGL(sceneColor)
    colors.nodeColor = toWGL(nodeColor)
    colors.clickedColor = clickedColor ? toWGL(clickedColor) : toWGL('red')
    colors.rootColor = rootColor ? toWGL(rootColor) : colors.nodeColor
    colors.parentColor =  parentColor ? toWGL(parentColor) : getComplimentaryColor(colors.rootColor)
    colors.childColor = childColor ? toWGL(childColor) : getComplimentaryColor(colors.parentColor)
    colors.lineColor = lineColor ? toWGL(lineColor) : getComplimentaryColor(colors.childColor)
    colors.textColor = textColor ? toWGL(textColor) : getComplimentaryColor(colors.lineColor,1.5)
    colors.highlightColor = highlightColor ? toWGL(highlightColor) : getComplimentaryColor(colors.clickedColor)

    initScene()

      for (const key of Object.keys(defaultIcons)) {
        if (!icons[key]) icons[key] = defaultIcons[key]
      }
      for (const action of actions) {
        const { name, fn } = parseAction(action)
        if (!actionsMap.has(name)) actionsMap.set(name,fn)
        else throw new Error('duplicate action: ' + name)
      }
      for (const menu of menus) {
        const name = Object.keys(menu)[0]
        const ma = []
        for (const action of menu[name]) {
          const { name, fn } = parseAction(action)
          if (!actionsMap.has(name)) actionsMap.set(name,fn)
          else {
            const ofn = actionsMap.get(name)
            if (ofn.toString().replace(/\s/g, '') != fn.toString().replace(/\s/g, '')) throw new Error('conflicting function: ' + name +'\n\n'+ ofn.toString()+'\n\n'+fn.toString())
          }
          ma.push(name)
        }
        menusMap.set(name,ma)
      }
      for (const action of defaultMenuNode) {
        const { name, fn } = parseAction(action)
        if (!actionsMap.has(name)) actionsMap.set(name,fn)
      }
      for (const {name, fn} of defaultMenuGraph) {
        if (!actionsMap.has(name)) actionsMap.set(name,fn)
      }
      let waitformousetostop

      scene.on('mousemove',(e)=>{
        clearTimeout(waitformousetostop)
        waitformousetostop = setTimeout(() => {
            if (clickOnNode && clickOnNode.endpoint) return
            const node = xyisnode(e.x,e.y,e.z)
            if (node) {
              if (clickOnNode && clickOnNode.node.id === node.id) {
                if (clickOnNode.connetion) {
                  drawSubGraphLinks(clickOnNode.connetion)
                  clickOnNode.connetion = undefined
                  scene.renderFrame()
                }
                return
              }
              if (mouseOnNode) {
                if (mouseOnNode.node.id === node.id) return
                drawNode(mouseOnNode.node)
              }
              let connetion
              if (clickOnNode) {
                if (clickOnNode.connetion ) {
                  drawSubGraphLinks(clickOnNode.connetion)
                }
                connetion = findPath(graph,clickOnNode.node.id,node.id)
                clickOnNode.connetion = connetion
              }
              if (connetion) {
                drawSubGraphLinks(connetion, colors.highlightColor)
                dispatch('mouseOnPath', connetion)
              } else {
                drawNode(node,colors.highlightColor)
                dispatch('mouseOnNode', node)
              }
              mouseOnNode =  { node }
              scene.renderFrame()
            }
        },50)
      })
      scene.on('click',(e)=>{
        if (contextmenu) contextmenu = undefined
        const node = xyisnode(e.x,e.y,e.z)
        if (node) {
          if (clickOnNode && clickOnNode.endpoint) {
            console.log(clickOnNode.node.id, clickOnNode.endpoint.id)
            drawSubGraphLinks(clickOnNode.connetion)
            drawNode(clickOnNode.endpoint)
            clickOnNode.endpoint = undefined
            scene.renderFrame()
            return
          }
          if (mouseOnNode) {
            if (mouseOnNode.node.id !== node.id) {
            drawNode(mouseOnNode.node)
            }
            mouseOnNode = undefined
          }
          if (!clickOnNode) {
            clickOnNode =  { node }
            drawNode(node,colors.clickedColor)
            dispatch('clickOnNode', node)
          } else {
            if (clickOnNode.node.id === node.id) {
                if (clickOnNode.connetion) drawSubGraphLinks(clickOnNode.connetion)
                drawNode(node)
                clickOnNode = undefined
            } else {

              if (clickOnNode.connetion) {
                // keep it
                drawNode(node,colors.clickedColor)
                clickOnNode.endpoint = node
                dispatch('clickOnPath', clickOnNode.connetion)
              } else {
                drawNode(clickOnNode.node)
                drawNode(node,colors.clickedColor)
                clickOnNode =  { node }
                //drawNode(node,clickedColor)
                dispatch('clickOnNode', node)
              }

            }
          }
          /*
          if (mouseOnNode && mouseOnNode.node.id !== node.id) {
            mouseOnNode.node.ui.color = mouseOnNode.oldcolor
            nodes.update(mouseOnNode.node.uiId, mouseOnNode.node.ui)
            for (const link of mouseOnNode.node.links){
              link.ui.color = linkColor
              lines.update(link.uiId,link.ui)
            }
            mouseOnNode = undefined
          }*
          if (clickOnNode) {
            if (clickOnNode.connetion) {
              dispatch('clickOnPath', clickOnNode.connetion)
            }
            clickOnNode.node.ui.color = clickOnNode.oldcolor
            nodes.update(clickOnNode.node.uiId, clickOnNode.node.ui)
            if (clickOnNode.connetion ) {
              //drawPath(clickOnNode.connetion,linkColor)
              drawSubGraphLinks(clickOnNode.connetion)
            }
          }
          if (!clickOnNode || clickOnNode.node.id !== node.id){
            if (!(clickOnNode && clickOnNode.connetion)) dispatch('clickOnNode', node)
            clickOnNode =  {oldcolor:node.ui.color, node}
            node.ui.color = highlightColor
            nodes.update(node.uiId, node.ui)
            }
            */
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
{#if (contextmenu && X && Y )}
<Menu x="{X}" y="{Y}"
items="{contextmenu.menu}"
fontsize={24}
on:click={({detail})=>{
  const fn = actionsMap.get(detail)
  if (!fn) throw new Error('missing action function: '+ detail)
  else fn(contextmenu.node,graph)
  }}
on:cancel={(e)=>{contextmenu = undefined}}
/>
{/if}
    <canvas bind:this={canvas}
      on:contextmenu="{
        (e)=>{
          // TODO move it to scene if w-gl has contextmenu
          e.preventDefault();
          if (contextmenu) {
            contextmenu = undefined
            return
          }
          const [x,y,z] = scene.getSceneCoordinate(e.clientX, e.clientY)
          X =  e.offsetX
          Y = e.offsetY
          const node = xyisnode(x,y,z)
          const menu = []
          if (node) {
            if (node.data.actions) {
              for (const action of node.data.actions) {
                const  {name, fn} = parseAction(action)
                if (!actionsMap.get(action)) {
                  actionsMap.set(name,fn)
                // TODO override existing !?
                } else {
                  if (typeof action !== 'string') {
                    const ofn = actionsMap.get(name)
                    if (ofn.toString().replace(/\s/g, '') != fn.toString().replace(/\s/g, '')) {
                      console.log(fn.toString())
                    }
                  }
                }
                menu.push(name)
              }
            }
            if (node.data.menu) {
              if (menusMap.has(node.data.menu)) {
                for (const action of menusMap.get(node.data.menu)) {
                  if (!menu.includes(action)) menu.push(action)
                }
              } else throw new Error('missing menu: '+node.data.menu)
            }
            for (const {name} of defaultMenuNode) {
              if (!menu.includes(name)) menu.push(name)
            }
            contextmenu = { menu, node}
          } else {
            for (const {name} of defaultMenuGraph) {
              if (!menu.includes(name)) menu.push(name)
            }
            contextmenu = { menu, node:null}
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
