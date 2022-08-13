import { Options } from 'tsup'

const options: Options = {
  format: [
    'cjs',
    'esm'
  ],
  target: 'esnext',
  clean: true,
  dts: true,
  entryPoints: [
    'src/*'
  ]
}

export default options
