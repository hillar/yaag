<script>

import { onMount } from 'svelte'
import Graph from '@hillar/yaag'

let graph

onMount( () => {
  graph.add('kala','maja')
})

</script>

<div class="" style="height:15em; width:20em;">
    <Graph bind:this="{graph}"/>
</div>
