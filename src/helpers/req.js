const { default: axios } = require("axios")

const req = async ({ method, url, headers = {} }) => axios({
    method,
    url,
    headers,
});

module.exports = req;