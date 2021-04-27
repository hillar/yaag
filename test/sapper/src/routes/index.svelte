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
  /*
  await graph.add('kala','maja')
	await graph.add('maja',[1,2,3,4,5,6,7,8,9,0])
	await graph.add(1,['a','b','c'])
  */
  for (let i = 0; i < 1409; ++i) {
    //await sleep(Math.random()*10)
		graph.add(Math.round(Math.random()*1000),[Math.round(Math.random()*1100)])
  }

})



</script>

<div class="" style="height:25em; width:50%; background-color:black;">
    <Graph
    bind:this="{graph}"
    on:mouseOnNode="{({detail: node})=>{console.log(node)}}"
    />
		<button on:click="{graph.relayout()}"> v </button>
</div>


<small>
<small>
  <hr>
<pre>

 {JSON.stringify(debug,null,4)}

</pre>
</small>
</small>
