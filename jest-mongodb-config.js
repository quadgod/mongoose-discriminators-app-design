module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.2.15',
      skipMD5: true,
    },
    autoStart: false,
    instance: {
      port: 27_777,
    },
  },
};
