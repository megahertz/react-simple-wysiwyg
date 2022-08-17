import fileSize from 'rollup-plugin-filesize';
import styles from 'rollup-plugin-styles';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-ts';

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
      },
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.unpkg,
        format: 'umd',
        name: 'ReactSimpleWysiwyg',
        plugins: [terser({ output: { comments: false } })],
        globals: { 'react': 'React' },
        sourcemap: true,
      },
    ],
    plugins: [
      typescript({
        browserslist: false,
        hook: {
          outputPath: (filePath, kind) => {
            return kind === 'declaration' ? packageJson.typings : filePath;
          }
        }
      }),
      styles({ minimize: true }),
      fileSize(),
    ],
    watch: {
      clearScreen: false,
    },
  },
];
