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
        file: packageJson.module,
        format: 'es',
        sourcemap: true,
        globals: { 'react': 'React' },
      },
      {
        file: packageJson.main,
        format: 'umd',
        sourcemap: true,
        name: 'ReactSimpleWysiwyg',
        globals: { 'react': 'React' },
      },
      {
        file: packageJson.unpkg,
        format: 'umd',
        sourcemap: true,
        name: 'ReactSimpleWysiwyg',
        plugins: [terser({ output: { comments: false } })],
        globals: { 'react': 'React' },
      },
    ],
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            target: 'ES5',
          },
        },
        useTsconfigDeclarationDir: true,
      }),
      styles({ minimize: true }),
      fileSize(),
    ],
    watch: {
      clearScreen: false,
    },
  },
];
