import { PluginSchema } from '@src/PluginSchema';
import { mixinSchema, moduleSchema } from './__fixtures__/schemas';

const _validPlugin = { name: 'mixed', type: 'mixin' as 'mixin' };
const _invalidPlugin = {
    name: 'mixed',
    type: 'inValidType',
    invalidProp: true,
};

const _invalidPlugin2 = {
    type: 'mixin',
};

// @TEST test all

describe('PluginSchema', () => {
    test('should import plugins from paths and return validated', async () => {
        const validatedPlugin = mixinSchema.validate(_validPlugin);

        expect(validatedPlugin).toStrictEqual(_validPlugin);

        const validatedPlugin2 = mixinSchema.validate(_invalidPlugin as any);

        expect(validatedPlugin2).toBeFalsy();

        const validatedPlugin3 = mixinSchema.validate(_invalidPlugin2 as any);

        expect(validatedPlugin3).toBeFalsy();
    });
});
