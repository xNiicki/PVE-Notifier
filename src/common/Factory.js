import RestClient from './RestClient.js';
import Utils from './Utils.js';
import NotifyRestClient from "./NotifyRestClient.js";

class Factory {
    static getRestClient() {
        return new RestClient();
    }

    static getUtils() {
        return new Utils();
    }

    static getNotifyRestClient() {
        return new NotifyRestClient();
    }
}

export default Factory;