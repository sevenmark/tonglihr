const axios = require('axios');
const crypto = require('crypto');
const qs = require('qs');

//参数
const data = {
    "id_number": "123456789",
    "mobile_number": "18511111111"
};
//密钥
const secret = "your secret";
//发送地址
const url = "your sent url";
const client_id = "your client_id";

verifyEmployee(url, data);

function verifyEmployee(url, data) {
    return sent(url, data);
}

function sent(url, data) {
    const timestamp = (new Date()).getTime().toString();
    const params = {
        data: JSON.stringify(data),
        timestamp,
        client_id
    }

    params.sign = getSignature(params, timestamp, secret);
    const reqParams = qs.stringify(params);
    return axios.post(url, reqParams)
        .then(result => {
            console.log("🚀 ~ file: index.js ~ line 30 ~ sent ~ result", result)
        })
        .catch(error => {
            console.log("🚀 ~ file: index.js ~ line 33 ~ sent ~ error", error)
        });
}

function getSignature(data, timestamp, secret) {
    const encryptData = data;
    encryptData.timestamp = timestamp;
    encryptData.sign_key = secret;
    const decipher = crypto.createHash('sha1');
    const encryptInput = Object.keys(encryptData).sort().reduce((_params, key) => {
        let value = encryptData[key].toString();
        return _params += `${key}${value}`;
    }, '');
    const encryptOutput = decipher.update(encryptInput).digest('hex');
    return encryptOutput;
}
