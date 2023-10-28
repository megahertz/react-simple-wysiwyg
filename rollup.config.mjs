import styles from '@ironkinoko/rollup-plugin-styles';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import fileSize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-ts';

import packageJson from './package.json' assert { type: 'json' };

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
      typescript({
        browserslist: false,
        hook: {
          outputPath: (filePath, kind) => {
            return kind === 'declaration' ? packageJson.typings : filePath;
          }
        },
      }),
      styles({ minimize: true }),
      fileSize(),
    ],
    watch: {
      clearScreen: false,
    },
  },
];
