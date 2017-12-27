import buble from 'rollup-plugin-buble'

export default {
  input: 'index.js',
  output: [
    {
      file: 'bundle.js',
      format: 'cjs'
    }
  ],
  external: ['simple-color-picker'],
  plugins: [
    buble()
  ]
}
