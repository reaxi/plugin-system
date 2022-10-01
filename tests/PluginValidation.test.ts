import { PluginValidator } from '../src/PluginValidation';

import { mixinSchema } from './__fixtures__/schemas';

describe('PluginValidation', () => {
    test.skip('should validate no plugins', () => {
        // @TEST - validate no plugins
    });

    test('should validate object with type mixin', () => {
        //do it
        const _plugins = [{}];

        const pv = new PluginValidator(_plugins, [mixinSchema]);

        const _validPlugins = pv.validateAll();

        expect(_validPlugins).toBeTruthy();
    });

    test.skip('should validate object with type standalone', () => {
        // @TEST   - validate object with type standalone
    });
    test.skip('should validate object with type custom', () => {
        // @TEST   - validate object with type custom
    });
    test.skip('should validate object with multiple types', () => {
        // @TEST   - validate object with multiple types
    });
    test.skip('should validate object with invalid types', () => {
        // @TEST   - validate object with invalid types
    });
});
