import { EnhanceStrategy } from '@src/EnhanceStrategy';
import { Strategy } from '@src/plugin.types';
import { Mixin, Standalone } from './schemas';

const mixinStrategy: Strategy<Mixin, Object> = {
    key: 'mixin',
    exec: (target, plugin) => Object.assign(target, { [plugin.name]: plugin }),
};

const enhancerStrategy = {
    key: 'enhancer',
    exec: (target, plugin) =>
        Object.assign(target, { [plugin.name]: (a, b) => +a + +b }),
};

const standaloneStrategy = new EnhanceStrategy<Standalone>(
    'standalone',
    (_, plugin) =>
        plugin.allowExec &&
        console.log(`I'm an Standalone plugin: ${plugin.name}`)
);

export const enhanceStrategies = [
    mixinStrategy,
    enhancerStrategy,
    standaloneStrategy,
    {
        key: 'none',
        exec: (_, plugin) => {},
    },
    {
        key: 'modifier',
        exec: (target, plugin) => {
            target.name = plugin.name;
        },
    },
];

const newOne = new EnhanceStrategy<{ name: string }, { name: string }>(
    'new',
    (target, plugin) => {
        target.name = plugin.name;
    }
);
