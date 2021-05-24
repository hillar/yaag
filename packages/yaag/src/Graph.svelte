<script lang="ts">

    import {onMount} from 'svelte'
    import Wait from './Wait.svelte'
    import { createScene, createGuide } from './lib/w-gl/index';
    import type { WglScene } from './lib/w-gl/src/createScene';

    export let sceneColor: string|null = null

    let canvas: HTMLCanvasElement
    let scene: WglScene
    let wait:boolean = true;

    onMount( () => {
        scene = createScene(canvas);
        createGuide(scene, {showGrid: true});
        if (sceneColor) {
          
        }
        wait = false

    })

</script>

<style>

    canvas {
        position: relative;
        display: block;
        height: 100%;
        width: 100%;
    }

    div {
      position: relative;
      display: block;
      height: 100%;
      width: 100%;
    }

</style>

<div>

    <canvas bind:this={canvas} />

    {#if (wait)}
        <Wait color="cyan"></Wait>
    {/if}

</div>
