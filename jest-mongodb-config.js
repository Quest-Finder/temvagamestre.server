module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest'
    },
    binary: {
      version: '6.0.6',
      skipMD5: true
    },
    autoStart: false
  }
}
