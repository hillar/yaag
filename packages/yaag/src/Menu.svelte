<script>
	import  * as icons from './menuicons.mjs'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let x
	export let y
	export let items
	export let fontsize = 16

	// menu diameter depends on elements count and icons size
	const radius = Math.round((fontsize * (items.length/3.14))+fontsize/3.14)

	//check icons ..
	const menu = []
	const customicons = []
	const _defaultIconNames = Object.keys(icons)
	for (const name of items){
			if (!_defaultIconNames.includes(name)){
				if (typeof name === 'string') throw new Error('no default icon:'+name)
				const customname = Object.keys(name)[0]
				if (customname){
					customicons[customname] = name[customname]
					menu.push(customname)
				} else throw new Error('not a icon path d')
			} else {
				menu.push(name)
			}
	}

	// just shortcuts
	let f = fontsize
	let l = menu.length

	function icon(n){
		return icons[n] ? icons[n] : (customicons[n] ? customicons[n] : icons['error'])
	}

	function menuPositionX(i,l){
		const angle = (6/(l))*i
		return radius *  Math.cos(angle)
	}

	function menuPositionY(i,l){
		const angle = (6/(l))*i
		return radius *  Math.sin(angle)
	}

</script>

<style>

	svg {
		background: transparent;
		position:absolute;
		height: 100%;
		width:100%;
	}

	circle {
    fill-opacity: 0.7;
	  fill:silver;
		pointer-events: bounding-box;

	}
	path {
		pointer-events: bounding-box;
	}

</style>

<svg on:click="{(e)=>{dispatch('cancel',null);}}">
	<circle cx="{x}" cy="{y}" r="{radius+f}"  />
	{#each menu as item,i}
		<svg x="{x+menuPositionX(i,l)-f/2}"
				 y="{y+menuPositionY(i,l)-f/2}"
				 width="{fontsize}"
				 height="{fontsize}"
				 role="presentation"
				 viewBox="0 0 512 512"
				 on:click="{()=>{dispatch('click',item)}}">
				<g>
					<path key="path-0" d="{icon(item)}"></path>
				</g>
		</svg>
	{/each}
</svg>
