import axios from 'axios';
import { getToken } from '../Auth';

let controller;

export function getRequest(URL) {
  let payload = {}, headers={}
  return apiRequest(URL, payload, "get", headers);
}

export function posttRequest(URL, payload) {
  // return axiosClient.post(`${URL}`, payload).then(response => response);
}

export function postRequest(URL, payload, headers = {}) {
  return apiRequest(URL, payload, "post", headers);
}

export function putRequest(URL, payload, headers = {}) {
  return apiRequest(URL, payload, "put", headers);
}
export function patchRequest(URL, payload, headers = {}) {
  return apiRequest(URL, payload, "patch", headers);
}

export function deleteRequest(URL, payload, headers = {}) {
  return apiRequest(URL, payload, "delete", headers);
}

export function cancelRequest() {
  console.log( controller );
  // console.log( controller.isPrototypeOf() );
  // console.log( controller.signal['Prototype'] );
  if (controller) {
    controller.abort();
    controller = null; // Reset the AbortController
  }
}


export async function apiRequest(endPoint, data, method, headers, requestOptions = {}) {
  
  // if(controller !== undefined){
  //   cancelRequest();
  // }

  return new Promise(async (resolve, reject) => {
    const token = getToken();
    const headers = {
      Accept: 'application/json',
    };
    
    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    } else {
      headers['Content-Type'] = 'application/json';
    }

    if (token) {
      headers['access_token'] = token;
    }

    controller = new AbortController(); // Create a new AbortController for each request
    const signal = controller.signal;

    axios({
      method: method,
      url: endPoint,
      headers:headers,
      data: data,
      signal: signal
    }).then((result) => { return resolve(result); }).catch(
      (error) => {
        if (axios.isCancel(error)) {
          return reject(new Error('Request canceled by user'));
        }
        return reject(error);
    });  
  });
}
