import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

const name = require('./package.json').main.replace(/\.js$/, '')

const bundle = (config) => ({
  ...config,
  input: 'src/diod.ts',
  external: (id) => !/^[./]/.test(id),
})

export default [
  bundle({
    plugins: [esbuild({ target: 'es2015' })],
    output: [
      {
        file: `${name}.js`,
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: `${name}.mjs`,
        format: 'es',
        sourcemap: false,
      },
    ],
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: 'es',
    },
  }),
]
