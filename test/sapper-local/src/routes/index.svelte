<script>
	//import Graph from '@hillar/yaag'
  import Graph from '../../../../packages/yaag/src/index.mjs'
  import {names} from '../../../../packages/yaag/src/colors.mjs'

  	import { onMount } from 'svelte'

  	let graph
  	let menus = [
  		{basic:['open', 'search']},
  		{root:['open','search','foo', 'bar']}
  	]

  	onMount( async () => {
  		const parent = {id:'parent',data:{menu:'root',label:'ROOT'}}
  		for (let i = 1 ; i < 10; i++) {
  			  const child = {id:i,data:{menu:'basic', size:i, label:'label'+i, type:'bug'}}
  				graph.add(parent,child)
  		}
      const pp = {id:'pp',data:{menu:'root',label:'ROOT',type:'phone', color:'deeppink'}}

  		for (let i = 1 ; i < 10; i++) {
  			  const child = {id:'i'+i,data:{menu:'basic', size:i, label:'label'+i, color:'#f0f'}}
  				graph.add(pp,child)
  		}
      graph.add(pp,parent)
      for (const c of Object.keys(names)) {
        const child = {id:c,data:{menu:'basic', label:c, color:c}}
        graph.add(pp,child)
      }
  	})

  	let menuaction = 'right-click on node(s)'

  </script>

  <div class="" style="height:50vh; width:90vw; ">
    <Graph
  				 bind:this="{graph}"
  				 menus="{menus}"
           sceneColor="blue"
  				 on:menuAction="{ ({detail}) => { menuaction = JSON.stringify(detail,null,4) }}"
  				 />
  </div>
  <small><pre> {menuaction} </pre></small>
