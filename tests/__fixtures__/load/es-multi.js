export function functionOne() {
    return 'hello';
}

export const _plugins = [
    { name: 'mixed', type: 'mixin' },
    { name: 'plays 2', type: 'mixin', data: [Array] },
    { name: 'boost', type: 'enhancer' },
    { name: 'single one', type: 'standalone' },
    { name: 'voider', type: 'none' },
    { name: 'Mutation', type: 'modifier' },
    { name: 'common', type: 'module' },
];

export const simplePlugin = { name: 'simple plugin', type: 'simple' };

export const invalidPlugins = { plugin: { not: 'type' } };

export const one = 1;
