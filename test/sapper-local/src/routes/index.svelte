<script>
	//import Graph from '@hillar/yaag'
  import Graph from '../../../../packages/yaag/src/index.mjs'
  import {menuicons} from '../../../../packages/yaag/src/menuicons.mjs'
	import {onMount} from 'svelte'

	let graph

	onMount(()=>{
    const names = Object.keys(menuicons)
		graph.add(1,2)
		graph.add(2,[3,4,5,6,7,8,9])
		graph.add(9,{id:33,data:{actions:names}})
	})
</script>
<div style="height:50vh;">

<Graph
			 bind:this="{graph}"
			 />


</div>
