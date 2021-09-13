const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
  app.use(
    createProxyMiddleware(process.env.REACT_APP_BASE_URL, {
      target: 'http://merchant.qa.xingfufit.cn',
      changeOrigin: true,
      pathRewrite: {
        ['^' + process.env.REACT_APP_BASE_URL]: ''
      }
    })
  )
}