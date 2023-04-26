module.exports = function override(config, env) {
  config.resolve = {
    fallback: {
      fs: false,
      stream: false,
      http: false,
      zlib: false,
      path: false,
      crypto: false,
    },
  };
  return config;
};
