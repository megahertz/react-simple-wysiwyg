import replace from '@rollup/plugin-replace';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import fileSize from 'rollup-plugin-filesize';
import styles from 'rollup-plugin-styler';

import packageJson from './package.json' with { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    external: [...Object.keys(packageJson.devDependencies)],
    output: [
      {
        file: packageJson.module,
        format: 'es',
        plugins: [replace({
          //'React.createElement': 'createElement',
          // 'import React, { ': 'import { ',
        })],
        sourcemap: true,
        exports: 'named',
        interop: 'defaultOnly'
      },
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: packageJson.unpkg,
        format: 'umd',
        name: 'ReactSimpleWysiwyg',
        plugins: [terser()],
        globals: { 'react': 'React' },
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      typescript({ sourceMap: false }),
      styles({ minimize: true }),
      fileSize(),
    ],
    watch: {
      clearScreen: false,
    },
  },
];
