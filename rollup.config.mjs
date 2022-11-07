import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const outputBaseName = 'lib/diod'

const bundle = (config) => ({
	...config,
	input: 'src/diod.ts',
	external: (id) => !/^[./]/.test(id),
})

export default [
	bundle({
		plugins: [esbuild({ target: 'es2016' })],
		output: [
			{
				file: `${outputBaseName}.js`,
				format: 'cjs',
				sourcemap: false,
			},
			{
				file: `${outputBaseName}.es.js`,
				format: 'es',
				sourcemap: false,
			},
			{
				file: `${outputBaseName}.umd.js`,
				format: 'umd',
				name: 'diod',
				sourcemap: false,
			},
		],
	}),
	bundle({
		plugins: [dts()],
		output: {
			file: `${outputBaseName}.d.ts`,
			format: 'es',
		},
	}),
]
