<script>
import { onMount } from 'svelte'
import Graph from '../../../../packages/yaag/src/Component.svelte'

let graph

let debug



$: debug = graph

onMount( () => {

  graph.add('kala','maja asd as as ca dv aõppöä !?#€%€%&/ ')
	graph.add('maja',[1,2,3,4,5,6,7,8,9,0])
	graph.add(1,['a','b','c'])

})



</script>

<div class="" style="height:25em; width:50%; background-color:black;">
    <Graph bind:this="{graph}"/>
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
