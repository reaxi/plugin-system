const simplePlugin = {
    name: 'exported plugin of multi',
};

const Hello = () => {
    return 'hello';
};

const arrPlugins = [
    {
        name: 'exported plugin in arr too',
    },
];

const val = 1;

module.exports = {
    val,
    arrPlugins,
    Hello,
    simplePlugin,
};
