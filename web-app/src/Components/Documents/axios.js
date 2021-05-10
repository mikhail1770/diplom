import axios from "axios";

let host = 'http://193.124.115.147:3001/';

function get(url, params) {
    return axios.get(host + url, params);

}

function post(url, obj) {
    return axios.post(host + url, obj);

}

export {get, post};

