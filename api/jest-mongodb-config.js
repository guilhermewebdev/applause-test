module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '7.0.3', // Versão compatível com Debian 12
      skipMD5: true,
    },
    autoStart: false,
    instance: {
      dbName: 'jest',
    },
  },
};
