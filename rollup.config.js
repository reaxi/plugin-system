import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import command from 'rollup-plugin-command';

const plugins = [
    typescript({ tsconfig: './tsconfig.json' }),
    commonjs(),
    nodeResolve(),
    command('yarn minify'), // <- if you want to minify code (with terser)
    del({
        targets: 'dist/*',
    }),
];

const external = [
    '/node_modules/',
    ...Object.keys(require('./package.json').dependencies),
    'commander',
]; // external packages

const emitTypes = {
    // emitting types (bundled)
    input: './dist/.declaration/src/index.d.ts',
    output: [{ file: './dist/index.d.ts', format: 'es' }],
    plugins: [
        dts(),
        del({
            targets: 'dist/.declaration',
            hook: 'buildEnd',
        }),
    ],
};

export default [
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.js',
            format: 'commonjs',
        },
        plugins,
        external,
    },
    emitTypes,
];
