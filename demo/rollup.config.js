import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import buble from 'rollup-plugin-buble'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

export default {
  input: 'index.js',
  output: [
    {
      file: 'bundle.js',
      format: 'cjs'
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    serve(),
    livereload(),
    buble()
  ]
}
