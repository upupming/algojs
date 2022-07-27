import { Options } from 'tsup'

const options: Options = {
  format: [
    'cjs',
    'esm'
  ],
  target: 'es2016',
  clean: true,
  dts: true,
  entryPoints: [
    'src/*'
  ]
}

export default options
