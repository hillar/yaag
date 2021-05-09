<script>
import { onMount } from 'svelte'
import Graph from '../../../../packages/yaag/src/index.mjs'
import ngraph from 'ngraph.graph'
import { aStar } from 'ngraph.path'
import {icons} from '../../../../packages/yaag/src/icons.mjs'

let graph

let debug



$: debug = graph

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

onMount( async () => {
  //graph.add('foo','bar')

  graph.add('a',['x','22'])
  graph.add(1,['a','b','c'])
  graph.add(2,['a','b','c'])
  graph.add(3,['b','c',0])
  graph.add(1,2)
  graph.add('b','c')
  graph.add('44','c')
  graph.add('x','y')
  graph.add('z','y')

  graph.add('23','33')
  graph.add('44','33')
  graph.add('44','55')

  graph.add('y',['a1','b1','c1'])

  for (const key of Object.keys(icons)){
    graph.add('icons',{id:key,data:{type:key}})
  }
  /*
  const circle = [1,2,3,4,5,6,7,8,9,0]
  //for (let i = 0; i < (circle.length -1); i++ ) graph.add(''+circle[i],''+circle[i+1])
  for (let i = 0; i < (circle.length -2); i++ ) graph.add(''+circle[i],''+circle[i+2])
  graph.add(''+circle[0],''+circle[circle.length -1])
  graph.add(''+circle[0],0)


  graph.add('kala','maja')
  sleep(1000)
	graph.add('maja',[1,2,3,4,5,6,7,8,9,0])
  sleep(1000)
	graph.add(1,['a','b','c'])


  for (let i = 0; i < 409; ++i) {
    //await sleep(Math.random()*100)
		graph.add(Math.round(Math.random()*10),[Math.round(Math.random()*190)])
  }

  */


})



  function __findPath(from,to){

    const pathFinder = aStar(graph)
    const sg = new ngraph()
    function _findPath(from, to){
      const p = pathFinder.find(to,from)
      //console.log('_',from,to,p)
      //for (const n of p) sg.addNode(n.id)
      for (let i = 0; i < (p.length -1); i++ ) sg.addLink(p[i].id,p[i+1].id)

      if (p.length > 2 ) {
        for ( let i = 0; i < (p.length -1); i++ ){
          if (p[i].links.length > (p[i].id===from? 1 : 2)) {
            for ( const link of p[i].links) {
              //console.log(link.fromId,link.toId)
              if (!(link.fromId === p[i+1].id || link.toId === p[i+1].id)){
                const next = link.fromId === p[i].id ? link.toId: link.fromId
                //console.log('found',next)
                const pp = pathFinder.find(to,next)
                if (pp.length>1){
                  if (!(pp[1].id === p[i].id)) {
                    sg.addLink(p[i].id,pp[0].id)
                    for (let i = 0; i < (pp.length -1); i++ ) sg.addLink(pp[i].id,pp[i+1].id)
                    //console.log('good',pp)
                    if (pp.length>2 ) {
                        const ll = graph.getNode(next)
                        if (ll.links.length > 2) {
                          //console.log('possible', ll)
                          for (const link of ll.links) {
                            if (!(link.fromId === p[i].id ||link.doId === p[i].id)){
                              if (!(link.fromId === next ||link.doId === next)){
                                const nn = link.fromId === ll.id ? link.toId: link.fromId
                                if (!sg.getNode(nn) && graph.getNode(nn).links.length > 2) {
                                  //console.log('forfard',nn,to)
                                  const gg = _findPath(to,nn)
                                  if (gg) sg.addLink(nn,next)
                                  //gg.forEachLink(l=>console.log('ö',l))
                                }
                              }
                            }
                          }
                        }
                      //const gg = _findPath(next, to)
                    }
                  }
                }
              }
            }
            //const pp = pathFinder.find(p[0].id,to)
            break
          } else {
            //console.log('single',i)
          }
        }
      }

      return sg
    }

    const connetion = _findPath(from,to)
    const linksCount = connetion.getLinksCount()
    //console.log(linksCount,connetion)
    return linksCount ? connetion : undefined
  }

  /*
  function _____________findPath(from,to){
    const pathFinder = aStar(graph)
    const result = new ngraph()
    const path = pathFinder.find(to,from)
    for (let i = 0; i < (path.length -1); i++ ) result.addLink(path[i].id,path[i+1].id)

    function _findPath(f,t,p) {
      if (p.length > 1 ) {
        // find splitting points
        let fs
        for ( let i = 0; i < (p.length -1); i++ ){
          if (p[i].links && p[i].links.length > (p[i].id === f ? 1 : 2)) {
              fs = p[i]
              break
          }
        }
        let ts
        for ( let i = (p.length-1); i > 1; i-- ){
          if (p[i].links && p[i].links.length > (p[i].id === t ? 1 : 2)) {
              ts = p[i]
              break
          }
        }
        console.log(fs,ts)
        if (fs && ts && fs.id !== ts.id) {
          const fss = []
          graph.forEachLinkedNode(fs.id,(n)=>{
            if (!result.getNode(n.id)) {
                //console.log(n)
                fss.push(n)
            }
          })
          const tss = []
          graph.forEachLinkedNode(ts.id,(n)=>{
            if (!result.getNode(n.id)) {
                //console.log(n)
                tss.push(n)
            }
          })
          for (const fn of fss) {
            for (const tn of tss) {
              const ppp = pathFinder.find(fn.id,tn.id)
              console.log(ppp)
              //console.log(ppp[1].id ,ts.id, '',ppp[ppp.length-2].id,  fs.id)
              if (ppp.length > 1 && !(ppp[1].id === ts.id || ppp[ppp.length-2].id === fs.id )) {
                console.log(ppp)
                for (let i = 0; i < (ppp.length -1); i++ ) result.addLink(ppp[i].id,ppp[i+1].id)
              }
            }
          }
          //console.log(fss,tss)
        }
      }
    }
    _findPath(from,to,path)

    return result.getLinksCount() ? result : undefined
  }
  */

  // Astar + deletion
const findPathD = (graph,from,to) => {
    // find shortest path
    let pathFinder = aStar(graph)
    const result = new ngraph()
    const path = pathFinder.find(to,from)
    for (let i = 0; i < (path.length -1); i++ ) result.addLink(path[i].id,path[i+1].id)
    // if there is path, find detours
    if (result.getLinksCount()) {
      // node deletion ahead, so copy original graph
      const copyofgraph = new ngraph()
      graph.forEachLink( l => { copyofgraph.addLink(l.fromId,l.toId) })

      function _findDetours(p) {
        let f = p[0].id
        let t = p[p.length-1].id
        if (p.length > 3) {
          // chop head and tail deadends of
          let start
          for (let i = 0 ; i < p.length; i++) {
            for (const link of p[i].links) {
              const id = link.fromId === p[i].id ? link.toId : link.fromId
              const node = copyofgraph.getNode(id)
              if (node.links.length < 2) {
                copyofgraph.removeNode(id)

              }
            }
            p[i] = copyofgraph.getNode(p[i].id)
            if (i>0 && p[i-1].links) {
              f = p[i-1].id
              start = i -1
              break
            }
          }
          let end
          for (let i = p.length-1 ; i > 0; i--) {
            if (p[i] && p[i].links) for (const link of p[i].links) {
              const id = link.fromId === p[i].id ? link.toId : link.fromId
              const node = copyofgraph.getNode(id)
              if (node.links.length < 2) {
                copyofgraph.removeNode(id)

              }
            }
            if (p[i]) p[i] = copyofgraph.getNode(p[i].id)
            if (i<(p.length-1) && p[i+1] && p[i+1].links) {
              t = p[i+1].id
              end = i +1
              break
            }
          }

          //if (!p[p.length-1] || !p[p.length-1].links) p.pop()
          //if (!p[0].links) p.shift()

          console.log('o',p)
          console.log(f,t,start,end)
          p = p.slice(start,end+1)
          console.log('sliced',p)



          if (p.length < 3) {
            return
          } else {
            const toburn = []
            for (let i = 1; i < p.length-1; i++) {
              if (p[i-1].links.length> 2 && p[i+1].links.length > 2) toburn.push(p[i].id)
              //const candel = (p[i-1].links.length> 2 && p[i+1].links.length > 2)
              //console.log(candel, p[i-1].links.length, p[i+1].links.length)
              /*
              if (p[i].links) for (const link of p[i].links) {

                const id = link.fromId === p[i].id ? link.toId : link.fromId
                drawNode(graph.getNode(id), 0xaaffff)

                const node = copyofgraph.getNode(id)
                if (node.links.length > 2) {
                  copyofgraph.removeNode(id)
                  drawNode(graph.getNode(id), 1)
                } else {
                  drawNode(graph.getNode(id), 0xaaaaff)
                }

              }
              */
            }
            if (toburn.length) {
              console.log(toburn)
              for (const id of toburn) copyofgraph.removeNode(id)
              pathFinder = aStar(copyofgraph)
              const pp = pathFinder.find(t,f)
              if (pp.length) {
                for (let i = 0; i < (pp.length -1); i++ ) {
                  result.addLink(pp[i].id,pp[i+1].id)
                }
              }
              console.log('pp',pp)
            }
          }

          /*
          for (const link of p[p.length-1].links) {
            const id = link.fromId === p[p.length-1].id ? link.toId : link.fromId
            if (copyofgraph.getNode(id).links.length < 2) {
              copyofgraph.removeNode(id)
              drawNode(graph.getNode(id), textColor)
            }
          }
          p[p.length-1] = copyofgraph.getNode(p[p.length-1].id)
          */

          // find splitting points
          /*
          const spittings = []
          const start = (p[0].links && p[0].links.length > 2) ? 1 : 2
          const end = (p[p.length-1].links && p[p.length-1].links.length > 2) ? (p.length - 1) : (p.length - 2)
          let fn
          let tn
          for ( let i = start; i < end; i++ ){
            if (p[i].links && p[i].links.length < 3) {
              if (!spittings.length) fn = p[i-1].id
              spittings.push(p[i])
              tn = p[i+1].id
            }
          }
          fn = fn?fn:f
          tn = tn?tn:t
          for (const { id } of spittings ) {
            copyofgraph.removeNode(id)
            drawNode(graph.getNode(id), textColor)
          }*/
          /*
          pathFinder = aStar(copyofgraph)
          const pp = pathFinder.find(fn,tn)
          if (pp.length) {
            for (let i = 0; i < (pp.length -1); i++ ) result.addLink(pp[i].id,pp[i+1].id)
            console.log(fn,tn,pp)
            //_findPath(fn,tn,pp) // <-- kill browser ;/
          }
          */
        }
      }

      _findDetours(path)
    }
    return result.getLinksCount() ? result : undefined
  }

  const fp = (graph, from, to) => {
  	let pathFinder = aStar(graph)
  	const result = new ngraph()
  	const path = pathFinder.find(to,from)
  	if (path.length) {
  		const walked = []
  		walked.push(path[0].id)
  		for (let i = 0; i < (path.length -1); i++ ) {
  			result.addLink(path[i].id,path[i+1].id)
  			walked.push(path[i+1].id)
  		}
  		//console.log(walked.join('-'))
  		graph.forEachNode( node => {
  			if (node.links.length < 2 || walked.includes(node.id)) return
  			walked.push(node.id)
  			const p2from = pathFinder.find(from,node.id)
  			if (p2from.length) {
  				const p2to = pathFinder.find(to,node.id)
  				if (p2to.length) {
  					for (const {id} of p2to) walked.push(id)
  					for (const {id} of p2from) walked.push(id)
  					let tmp
  					while (p2to.length > 0 && p2from.length > 0 && p2to[0].id === p2from[0].id) {
  							tmp = p2to.shift()
  							p2from.shift()
  					}
  					p2to.unshift(tmp)
  					const np = [...p2from.reverse(), ...p2to]
  					const distinct = [ ...new Set(np.map(x=>x.id))]
            if (distinct.length !== np.length) {
              const map = new Map()
              const loops = []
              for (let i = 0; i < np.length; i++) {
                if (map.has(np[i].id)) {
                  loops.push({id:np[i].id,s:map.get(np[i].id),e:i})
                } else map.set(np[i].id,i)
              }
              if (loops.length) {
                for (const loop of loops) {
                  np.splice(loop.s,loop.e-loop.s)
                }
              }
            }
  					//console.log(np.map(x=>x.id).join('-'))
  					for (let i = 0; i < (np.length -1); i++ ) {
  						result.addLink(np[i].id,np[i+1].id)
  					}
  				}
  			}
  		})
  	}
  	return result.getLinksCount() ? result : undefined
  }

  let currentNode
  let currentPath
  let graph2

</script>

<div class="" style="height:50vh; width:95vw; background-color:black;">
    <Graph
    bind:this="{graph}"
    findPath="{fp}"
    on:mouseOnNode="{({detail: node})=>{/*console.log('mouseOnNode',node)*/}}"
    on:mouseOnNode="{({detail}) => { currentNode = detail.id}}"
    on:mouseOnPath="{({detail}) => {
      currentPath = detail
      graph2.clear()
      currentPath.forEachLink( ({fromId, toId}) => {
        graph2.add(fromId, toId)
      })
      graph2.relayout()
    }}"
    />

</div>
<div class="" style="height:15vh; width:15vw; background-color:black;">
    <Graph
    bind:this="{graph2}"
    findPath="{fp}"
    sceneColor="blue"
    />

</div>
<div class="">
  <button on:click="{graph.relayout()}"> o </button>
  <button on:click="{graph.birdview()}"> v </button>
  {currentNode}
  {currentPath}
</div>

    <!--     findPath="{fp}" -->
