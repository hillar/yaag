<script>
	//import Graph from '@hillar/yaag'
  import Graph from '../../../../packages/yaag/src/index.mjs'

  	import { onMount } from 'svelte'

  	let graph
  	let menus = [
  		{basic:['open', 'search']},
  		{root:['open','search','foo', 'bar']}
  	]

  	onMount( async () => {
  		const parent = {id:'parent',data:{menu:'root'}}
  		for (let i = 1 ; i < 10; i++) {
  			  const child = {id:i,data:{menu:'basic', size:i}}
  				graph.add(parent,child)
  		}
  	})

  	let menuaction = 'right-click on node(s)'

  </script>

  <div class="" style="height:50vh; width:90vw; ">
    <Graph
  				 bind:this="{graph}"
  				 menus="{menus}"
  				 on:menuAction="{ ({detail}) => { menuaction = JSON.stringify(detail,null,4) }}"
  				 />
  </div>
  <small><pre> {menuaction} </pre></small>
