import https from 'https';
import axios from 'axios';

class RestClient {
    constructor() {
        this.baseUrl = 'https://'+ process.env.PVE_URL + ':8006/api2/json';
        this.headers = {
            'Authorization': `PVEAPIToken=${process.env.PVE_USER}!${process.env.PVE_TOKEN_NAME}=${process.env.PVE_API_KEY}`
        }
        this.agent = new https.Agent({
            rejectUnauthorized: false, // Disable TLS verification
        });
    }

    async get(url) {
        return axios.get(this.baseUrl + url, {
            headers: this.headers,
            httpsAgent: this.agent
        }).then(response => response.data.data);
    }

    post(url, data) {
        return axios.post(this.baseUrl + url, data, {
            headers: this.headers,
            httpsAgent: this.agent
        });
    }
}

export default RestClient;