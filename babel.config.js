module.exports = api => {
    api.cache.using(() => process.env.NODE_ENV);

    const presets = [
        '@babel/preset-env',
        '@babel/preset-react',
        ['@babel/preset-typescript', { "isTSX": true, "allExtensions": true }],
    ];

    const plugins = [
        ['@babel/plugin-proposal-optional-chaining', { "loose": true }]
    ];

    if (process.env.NODE_ENV === 'development') {
        plugins.push('react-refresh/babel');
    }

    plugins.push(
        ["@babel/plugin-transform-private-methods", { "loose": true }],
        ["@babel/plugin-transform-private-property-in-object", { "loose": true }]
    );

    return {
        presets,
        plugins
    };
}