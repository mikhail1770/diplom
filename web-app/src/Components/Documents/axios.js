import axios from "axios";

let host = 'http://localhost:3001/';

function get(url) {
    return axios.get(host + url);

}

function post(url, obj) {
    return axios.post(host + url, obj);

}

export {get, post};