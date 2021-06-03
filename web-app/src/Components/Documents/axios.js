import axios from "axios";

let host = 'http://localhost:3001/';

function get(url, params) {
    return axios.get(host + url, {params: params, headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res => {
        return new Promise((resolve, rej) => {
            resolve(res)
        })
    }).catch((err) => {
        errorHandler(err);
        return new Promise((resolve, reject) => {
          reject(err);
        });
      });

}

function post(url, obj) {
    return axios.post(host + url, obj, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(res => {
        return new Promise((resolve, rej) => {
            resolve(res)
        })
    }).catch((err) => {
        errorHandler(err);
        return new Promise((resolve, reject) => {
          reject(err);
        });
      });

}


function errorHandler(error, msg) {
    if (error.response.status === 401 && window.location.pathname !== '/login') {
        localStorage.removeItem('token');
        window.location.reload();
    }

    if (error.response.data.error) {
      //message.error(msg)
      return;
    }

    // if(error.response.data.error || error.response.data.data.error){
    //     message.error(error.response.data.detail || error.response.data.data.detail)
    // }
  }

export {get, post};

