import { PluginEnhancer } from '../src/PluginEnhancer';
import { _plugins } from './__fixtures__/plugins';
import { enhanceStrategies } from './__fixtures__/enhanceStrategies';
import { Strategy } from '@src/plugin.types';

type Target = {};

type TargetWithName = {
    name: string;
};

describe('PluginEnhancer', () => {
    test('should enhance object with enhance strategies', async () => {
        const pe = new PluginEnhancer<Target>();

        const startingApp = { namespace: 'awesome-app' };
        const _target = Object.assign({}, startingApp);

        expect(_target).toStrictEqual(startingApp);

        const enhancedTarget = await pe.enhance(
            _target,
            _plugins,
            enhanceStrategies
        );

        expect(_target).toStrictEqual(enhancedTarget);
        expect(_target).not.toStrictEqual(startingApp);
    });

    test('should return a new object with enhance strategies', async () => {
        const pe = new PluginEnhancer<TargetWithName>();

        const startingApp = { name: 'hello', namespace: 'awesome-app' };
        const _target = Object.assign({}, startingApp);

        const nameModifierStrategy: Strategy<TargetWithName, TargetWithName> = {
            key: 'modifier',
            exec: (target, plugin) => {
                target.name = plugin.name;
            },
        };

        const enhancedTarget = await pe.enhance(
            Object.assign({}, _target),
            _plugins,
            [nameModifierStrategy]
        );

        expect(enhancedTarget).not.toStrictEqual(_target);
    });
});

// ? say that it will modify the object
// ? say how to return a new  object : Object.assign({}, target) or {...target }
