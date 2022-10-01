export const _plugins = [
    {
        name: 'mixed',
        type: 'mixin',
    },
    {
        name: 'plays 2',
        type: 'mixin',
        data: ['cars', 'shoots'],
    },
    {
        name: 'boost',
        type: 'enhancer',
    },
    {
        name: 'single one',
        type: 'standalone',
    },
    {
        name: 'voider',
        type: 'none',
    },
    {
        name: 'Mutation',
        type: 'modifier',
    },
    {
        name: 'common',
        type: 'module',
    },
];

export const simplePlugin = {
    name: 'simple plugin',
    type: 'simple',
};

// invalid Plugins

export const invalidPlugins = {
    plugin: {
        not: 'type',
    },
};

// invalid types

export function functionOne() {
    return '';
}

export const one = 1;
