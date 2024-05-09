module.exports = function(api) {
    api.cache.using(() => process.env.NODE_ENV);
  
    const isProd = process.env.NODE_ENV === 'production';
  
    const presets = [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
        "react-refresh/babel"
    ];
  
    const plugins = [
      ['@babel/plugin-proposal-optional-chaining', { "loose": true }]
    ];
  
    if (!isProd) {
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
  };
  