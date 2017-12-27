import postcss from 'rollup-plugin-postcss'
import precss from 'precss'
import autoprefixer from 'autoprefixer'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import buble from 'rollup-plugin-buble'

export default {
  input: 'app/index.js',
  output: [
    {
      file: 'lib/guigui.js',
      format: 'cjs'
    }, {
      file: 'demo/guigui.js',
      format: 'cjs'
    }
  ],
  external: ['simple-color-picker'],
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      plugins: [
        precss(),
        autoprefixer()
      ]
    }),
    buble()
  ]
}
