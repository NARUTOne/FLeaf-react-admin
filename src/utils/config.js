/**
 * some config
 */
var apiBaseUrl = '/'

if(process.env.NODE_ENV == 'development') {
  apiBaseUrl = 'http://192.168.98.116:8080/'
}

module.exports = {
  apiBaseUrl
}