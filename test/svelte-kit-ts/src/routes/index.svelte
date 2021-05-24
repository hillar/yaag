<script>
   import Graph from '../../../../packages/yaag/src/Graph.svelte'
   import {onMount} from 'svelte'

   let foo

   onMount( async () => {

      const r = await fetch('/api/'+Math.random())
      const j = await r.json()
      foo = JSON.stringify(j,null,4)

   })

</script>

<h1>{foo}</h1>
<div style="height:80vh; width:80vw;">
   <Graph style="height:80vh; width:80vw;" />
</div>
