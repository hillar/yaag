<script>
import { onMount } from 'svelte'
import Graph from '../../../../packages/yaag/src/Component.svelte'

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
  graph.add(3,['b','c'])
  graph.add('x','y')
  graph.add('z','y')
  graph.add('22','23')
  graph.add('22','33')
  graph.add('23','33')
  graph.add('44','33')
  graph.add('44','55')
  graph.add('22','44')

  /*
  graph.add('kala','maja')
  sleep(1000)
	graph.add('maja',[1,2,3,4,5,6,7,8,9,0])
  sleep(1000)
	graph.add(1,['a','b','c'])


  for (let i = 0; i < 141; ++i) {
    //await sleep(Math.random()*100)
		graph.add(Math.round(Math.random()*100),[Math.round(Math.random()*110)])
  }
  */


})



</script>

<div class="" style="height:40em; width:90%; background-color:black;">
    <Graph
    bind:this="{graph}"
    on:mouseOnNode="{({detail: node})=>{/*console.log('mouseOnNode',node)*/}}"
    />
		<button on:click="{graph.relayout()}"> o </button>
    <button on:click="{graph.birdview()}"> v </button>
</div>
