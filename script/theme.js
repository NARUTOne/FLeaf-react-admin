/**
 * antd theme config
 */

module.exports = () => {
  return {
    'primary-color': '#1b6d85',
    'link-color': '#1b6d85',
    'border-radius-base': '3px',
  };
};

// const fs = require('fs')
// const path = require('path')
// const lessToJs = require('less-vars-to-js')

// module.exports = () => {
//   const themePath = path.join(__dirname, './src/utiles/style/theme.less')
//   return lessToJs(fs.readFileSync(themePath, 'utf8'))
// }
