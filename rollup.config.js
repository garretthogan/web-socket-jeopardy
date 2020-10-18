import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import scss from 'rollup-plugin-scss';
import posthtml from 'rollup-plugin-posthtml-template';

// rollup.config.js
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'client/bundle.js',
      format: 'es',
    },
    {
      file: 'client/bundle.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()],
    },
  ],
  plugins: [
    json(),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
      preferBuiltins: true,
    }),
    commonjs(),
    nodePolyfills(),
    scss(),
    posthtml(),
  ],
};
