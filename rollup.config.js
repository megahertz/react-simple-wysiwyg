'use strict';

const fileSize = require('rollup-plugin-filesize');
const nodeResolve = require('rollup-plugin-node-resolve');
const typeScript = require('rollup-plugin-typescript2');
const uglify = require('rollup-plugin-uglify');

module.exports = [
  build('index.umd.js'),
  build('index.umd.min.js'),
];

function build(fileName) {
  const options = getBuildOptions(fileName);
  return {
    input: 'src/index.ts',
    output: [{
      file: `lib/${options.path}/${fileName}`,
      format: options.format,
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
      name: 'ReactSimpleWysiwyg',
      sourcemap: true,
    }],
    external(id) {
      if (id.indexOf('tslib') >= 0) {
        return false;
      }

      return id.indexOf('node_modules') >= 0;
    },
    plugins: [
      nodeResolve(),
      typeScript({
        tsconfig: "tsconfig.json",
        tsconfigOverride: { compilerOptions: {
          declaration: false,
          target: options.target
        }}
      }),
      fileSize(),
      options.min && uglify.uglify({ ie8: false }),
    ]
  };
}

/**
 * Return build options by parsing output filename
 * @param fileName
 * @return {{
 *   extension: string,
 *   min: boolean,
 *   format: string,
 *   target: string,
 *   path: string
 * }}
 */
function getBuildOptions(fileName) {
  let min = false;
  let format;
  let target = 'es5';

  const [, ...pieces] = fileName.split('.');
  const extension = pieces.pop();

  format = pieces.pop();
  if (format === 'min') {
    min = true;
    format = pieces.pop();
  }

  if (format === 'es') {
    target = 'esnext';
  }

  const path = format;

  return {
    extension,
    format: format || 'cjs',
    min,
    path,
    target,
  }
}
