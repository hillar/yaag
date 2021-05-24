import typescript from '@rollup/plugin-typescript';

export default {
	input: './index.ts',
  output: {
    dir: './',
    format: 'es',
  },
	plugins: [
		typescript({target:'esnext'})
	]
}

// ../../node_modules/.bin/rollup -c rollup.config.js
