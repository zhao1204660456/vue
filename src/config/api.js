/*
* 封装fetch
* Parmas
* method :必填 字符串
* url: 必填 字符串
* data: 可选 对象
* */
import {SUCCESS,HOSTNAME} from "./base";

function api(url,method , data) {
    //get方式
    method = method.toUpperCase().trim();
    let token = sessionStorage.getItem('token');
    let headers = {
        token,
    };
    let option = {
        headers,
        method
    };

    if (method === 'GET' || method === 'PUT') {
        let str = "?";
        for (let i in data) {
            str += `${i}=${data[i]}&`;
        }
        str = str.slice(0, -1);
        url += str;
    }
    if (method === 'POST' && data && Object.keys(data).length) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }
    url = HOSTNAME + url;
    let promise=new Promise(function (resolve, reject) {
            fetch(url, option,)
                .then(res => res.json())
                .then(data => {
                    if (resolve.code === SUCCESS) {
                        resolve(data);
                    } else {
                        reject(data);
                    }
                });
        });
    return promise;
}

export {api};