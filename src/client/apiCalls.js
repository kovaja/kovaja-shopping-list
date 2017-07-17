import axios from 'axios';

export class ApiCalls {
    static callApiGet(url) {
        return new Promise((resolve, reject) => {
            axios.get(url)
                    .then((res) => {
                        if (res.data.result !== 0) {
                            return Promise.reject(url + 'server response ' + res.data.result + ' ' + res.data.message);
                        }
                        return Promise.resolve(res.data.data);
                    })
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((error) => {
                        console.log('Api call error ', error);
                        reject();
                    });
        });
    }
    static callApiPost(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                    .then((res) => {
                        if (res.data.result !== 0) {
                            return Promise.reject(url + 'server response ' + res.data.result + ' ' + res.data.message);
                        }
                        return Promise.resolve(res.data.data);
                    })
                    .then((data) => {
                        resolve(data);
                    })
                    .catch((error) => {
                        console.log('Api call error ', error);
                        reject();
                    });
        });
    }
}