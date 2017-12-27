import postcss from 'rollup-plugin-postcss'
import precss from 'precss'
import autoprefixer from 'autoprefixer'
import buble from 'rollup-plugin-buble'

export default {
  input: 'app/index.js',
  output: [
    {
      file: 'lib/guigui.js',
      format: 'cjs'
    }
  ],
  external: ['simple-color-picker'],
  plugins: [
    postcss({
      plugins: [
        precss(),
        autoprefixer()
      ]
    }),
    buble()
  ]
}
