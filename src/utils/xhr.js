/**
 * xhr  base on whatwg-fetch
 * @param {*url} response 
 * @param {*options} response 
 */

import { apiBaseUrl } from 'src/utils/config.js'
import { message } from 'antd'
import auth from 'src/utils/auth'
import { browserHistory } from 'react-router'

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
 *
 * @param  {object} [options] The options we want to pass to "fetch"
 *  options = {
 *    url: 'api',  {string} url       The URL we want to request
 *    type: 'GET,
 *    data: {},
 *    success: res => {}
 * }
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(options) {
  if(!options) return new Error ('The options field is required, and the type is object, for XHR !')
  
  const opt = {
    method: (options.type || "GET").toUpperCase(),
    body: setData(options.data) || {},
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  }

  const apiUrl = apiBaseUrl + options.url + '';

  return fetch(apiUrl, opt)
    .then(checkStatus)
    .then(parseJSON)
    .then(res => {
      if (typeof res !== 'object') {
        message.error( apiUrl + ': response data should be JSON')
        return
      }
      switch (res.code) {
        case 200:
          options.success && options.success(res)
          break
        case 401:
          auth.destroy()
          browserHistory.push('/login')
          break
        default:
          message.error(res.message || 'unknown error')
      }
    })
    .catch(err => {
      options.error && options.error(err)
      new Error(err)
    });
}
