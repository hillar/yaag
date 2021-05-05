# yaag

svelte component: yet another anvaka graph

see repl https://svelte.dev/repl/b21b42b8753749e8b6d203ad036757fd?version=3.38.2

```
<script>

	import Graph from '@hillar/yaag'
	import { onMount } from 'svelte'

	let graph

	onMount( async () => {
		graph.add('parent',['child a','child b'])
	})

</script>

<div class="" style="height:90vh; width:90vw; ">
  <Graph bind:this="{graph}" />
  <button on:click="{graph.relayout()}"> relayout </button>
  <button on:click="{graph.birdview()}"> birdview </button>
</div>


```
