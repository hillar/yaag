<script>
	//import Graph from '@hillar/yaag'
  import Graph from '../../../../packages/yaag/src/index.mjs'
  import {menuicons} from '../../../../packages/yaag/src/menuicons.mjs'
	import {onMount} from 'svelte'

	let graph

  const names = Object.keys(menuicons)

  const menuactions = {
    bug : (name, node) => {
      alert(JSON.stringify(node))
    },
    expand : (name, node) => {
      graph.add(node.id,'expanded'+Math.random())
    }
  }

  const handleMenuAction = (name, node) => {
    if (menuactions[name]) menuactions[name](name, node)
    else throw new Error('missing action: '+ name)
  }

	onMount(()=>{

		graph.add(1,2)
		graph.add(2,[4,5,6,7,8,9])
		//graph.add(9,{id:33,data:{actions:Object.keys(menuactions)}})
    graph.add(33,[14,15,6,7,8,9])
	})
</script>
<div style="height:50vh;">

<Graph
			 bind:this="{graph}"
       on:menuAction="{({detail})=> {
         const {name, node} = detail
         handleMenuAction(name,node)
         }}"
			 />


</div>
