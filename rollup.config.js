import nodeResolve from '@rollup/plugin-node-resolve';
import fileSize from 'rollup-plugin-filesize';
import styles from 'rollup-plugin-styles';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

import packageJson from './package.json';

export default [
  {
    input: 'src/index.ts',
    external: [...Object.keys(packageJson.devDependencies)],
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'es',
        sourcemap: true,
      },
      {
        file: packageJson['umd:main'],
        format: 'umd',
        sourcemap: true,
        name: 'ReactSimpleWysiwyg',
      },
    ],
    plugins: [
      nodeResolve(),
      typescript(),
      styles(),
      terser({ output: { comments: false } }),
      fileSize(),
    ],
    watch: {
      clearScreen: false,
    },
  },
];
