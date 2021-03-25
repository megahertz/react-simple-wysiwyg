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
        format: 'umd',
        sourcemap: true,
        name: 'ReactSimpleWysiwyg',
      },
      {
        file: packageJson.unpkg,
        format: 'umd',
        sourcemap: true,
        name: 'ReactSimpleWysiwyg',
        plugins: [terser({ output: { comments: false } })]
      },
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            target: 'ES5',
            declaration: false,
          },
        }
      }),
      styles(),
      fileSize(),
    ],
    watch: {
      clearScreen: false,
    },
  },
];
