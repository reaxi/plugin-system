import { PluginImporter } from '@src/PluginImporter';
import path from 'path';
import { mixinSchema, moduleSchema } from './__fixtures__/schemas';

const _validatedPlugins = [
    { name: 'mixed', type: 'mixin' },
    { name: 'common', type: 'module' },
];

describe('PluginImporter', () => {
    test('should import plugins from paths and return validated', async () => {
        //do it
        const pluginImporter = new PluginImporter();

        const importedPlugins = await pluginImporter.load(
            {
                localPluginsPath: path.join(
                    __dirname,
                    './__fixtures__/plugins'
                ),
                filesFilter: ['mixin.ts', 'module.ts'],
                packageFilter: 'reaxi-plugin',
            },
            { schemas: [mixinSchema, moduleSchema], validate: true }
        );

        expect(importedPlugins).toStrictEqual(_validatedPlugins);
    });

    test('should import plugins from index', async () => {
        //do it
        const pluginImporter = new PluginImporter();

        const importedPlugins = await pluginImporter.load(
            {
                localPluginsPath: path.join(
                    __dirname,
                    './__fixtures__/plugins'
                ),
                filesFilter: ['index.ts'],
                packageFilter: 'reaxi-plugin',
            },
            { schemas: [], validate: false }
        );

        console.log(importedPlugins);

        expect(importedPlugins).toBeTruthy();
    });

    test.skip('should import plugins from installed node_modules', () => {
        // @TEST - should import plugins from installed node_modules
    });
    test.skip('should import plugins from installed globally', () => {
        // @TEST - should import plugins from installed globally
    });
});
