/**
 * NARUTOne create on 2017-10-25
 * @public
 * @name xhr
 * @param  {object} options 当前请求配置
 * @description xhr  base on whatwg-fetch
 *
 */

const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
const isArray = arr => Array.isArray(arr)

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function setData(params) {
  let sendData = params
  if (isObject(sendData)) {
    sendData = Object.assign({}, sendData)
    sendData = Object.keys(sendData).map(key => {
      let value = sendData[key]
      if (isArray(value) || isObject(value)) {
        value = JSON.stringify(value)
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    }).join('&')
  }else {
    return new Error ('options.data is object type')
  }

  return sendData
}

/**
 * Requests a URL, returning a promise.
 * @public
 * @name xhr.getUrl
 * @param  {object} [options] The options we want to pass to "fetch"
 * ```js
 *  options = {
 *    url: 'api',  //{string} url , The URL we want to request
 *    type: 'GET,
 *    data: {},
 *    success: res => {},
 *    error: err => {}
 * }
 * ```
 * @return {object}  return an object containing either "data" or "err"
 */
export default function xhr(options) {
  if(!options) return new Error ('The options field is required, and the type is object, for XHR !')
  
  const opt = {
    method: (options.type || "GET").toUpperCase(),
    body: setData(options.data) || {},
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  }

  /**
   * @public
   * @name xhr.getUrl
   * @param {object} options 当前请求配置
   * @description 实现动态 url
   * ```js
   * xhr.getUrl = option => [apiBaseUrl] + option.url
   * ```
   * @return {string} 返回实际请求 url
   */
  if (xhr.getUrl) {
    options.url = xhr.getUrl(options)
  } else {

    /**
     * @public
     * @name xhr.baseUrl
     * @type {string}
     * @description 全局基础 URL，常用的场景是接口是另外的服务，方便统一设置路径, 默认使用脚手架中 src/utils/config 中的apiBaseUrl, 
     * 配置 xhr_config.js
     */
    options.url = xhr.baseUrl + options.url
  }

  let apiUrl = options.url + '';

  return fetch(apiUrl, opt)
    .then(checkStatus)
    .then(parseJSON)
    .then(res => {
      const success = xhr.success || options.success
      success && success(res, options)
    })
    .catch(err => {
      options.error && options.error(err)
      new Error(err)
    });
}
