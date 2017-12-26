import postcss from 'rollup-plugin-postcss'
import precss from 'precss'
import autoprefixer from 'autoprefixer'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'app/index.js',
  output: {
    file: 'lib/guigui.js',
    format: 'cjs'
  },
  plugins: [
    resolve(),
    commonjs(),
    postcss({
      plugins: [
        precss(),
        autoprefixer()
      ]
    }),
    babel(),
    uglify()
  ]
}
