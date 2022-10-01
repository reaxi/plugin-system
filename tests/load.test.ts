import { loadPlugin } from '@src/utils';
import path from 'path';

// CommonJS assertions
const _moduleExports = {
    name: 'exported plugin',
};

const _moduleExportsArr = [
    {
        name: 'exported plugin in array',
    },
    {
        name: 'second exported plugin in array',
    },
];

const _moduleExportsMulti = [
    [{ name: 'exported plugin in arr too' }],
    { name: 'exported plugin of multi' },
];

// ES assertions

const _simpleExports = [{ name: 'simple exp plugin' }];

const _simpleExportsArr = [
    [
        { name: 'simple exp plugin in arr[0]' },
        { name: 'simple exp plugin in arr[1]' },
    ],
];

const _multiExportsPlugins = [
    [
        { name: 'mixed', type: 'mixin' },
        { name: 'plays 2', type: 'mixin', data: [Array] },
        { name: 'boost', type: 'enhancer' },
        { name: 'single one', type: 'standalone' },
        { name: 'voider', type: 'none' },
        { name: 'Mutation', type: 'modifier' },
        { name: 'common', type: 'module' },
    ],
    { name: 'simple plugin', type: 'simple' },
    { plugin: { not: 'type' } },
];

describe('loadPlugin', () => {
    test('should load module exports (single)', async () => {
        const loaded = await loadPlugin(
            path.join(__dirname, './__fixtures__/', 'load', 'module-single.js')
        );
        expect(loaded).toStrictEqual([_moduleExports]);
    });

    test('should load module exports (array)', async () => {
        const loaded = await loadPlugin(
            path.join(__dirname, './__fixtures__/', 'load', 'module-array.js')
        );

        expect(loaded).toStrictEqual(_moduleExportsArr);
    });

    test('should load module exports (multi)', async () => {
        const loaded = await loadPlugin(
            path.join(__dirname, './__fixtures__/', 'load', 'module-multi.js')
        );

        expect(loaded).toStrictEqual(_moduleExportsMulti);
    });

    test('should load ES Exports (single)', async () => {
        const loaded = await loadPlugin(
            path.join(__dirname, './__fixtures__/', 'load', 'es-single.js')
        );

        expect(loaded).toStrictEqual(_simpleExports);
    });

    test('should load ES Exports (array)', async () => {
        const loaded = await loadPlugin(
            path.join(__dirname, './__fixtures__/', 'load', 'es-array.js')
        );

        expect(loaded).toStrictEqual(_simpleExportsArr);
    });

    test('should load ES Exports (multi)', async () => {
        const loaded = await loadPlugin(
            path.join(__dirname, './__fixtures__/', 'load', 'es-multi.js')
        );

        expect(loaded).toStrictEqual(_multiExportsPlugins);
    });
});
