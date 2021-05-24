# yaag

svelte component: yet another anvaka graph

## basic usage

see repl https://svelte.dev/repl/b21b42b8753749e8b6d203ad036757fd?version=3.38.2

```
<script>

  import Graph from '@hillar/yaag'
  import { onMount } from 'svelte'

  let graph

  onMount( async () => {
    graph.add('parent','child')
    graph.add('parent',['child a','child b'])
  })

</script>

<div class="" style="height:90vh; width:90vw; ">
  <Graph bind:this="{graph}" />
</div>


```

## menu


see repl https://svelte.dev/repl/91d66347090c4026bf29c1071a40b37f?version=3.38.2
```

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


```
