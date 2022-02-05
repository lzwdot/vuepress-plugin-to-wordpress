const wpApi = require('./wordpress-api')

const vuepressToWordpress = ({username, password, options, onPrepared, onGenerated}, app = '') => {
  const wpRpc = new wpApi(username, password, options)
  return {
    name: 'vuepress-plugin-to-wordpress',
    getWpRpc: () => {
      return wpRpc
    },
    onPrepared: (app) => {
      typeof onPrepared === 'function' && onPrepared(wpRpc, app)
    },
    onGenerated: (app) => {
      typeof onGenerated === 'function' && onGenerated(wpRpc, app)
    },
  }
}

module.exports = vuepressToWordpress