import CommonFactory from '../../common/Factory.js';


class NotifyRunner {
    constructor() {
        this.rc = CommonFactory.getNotifyRestClient();
    }

    isOffline(lxc) {
        this.rc.offline(lxc);
    }

    isOnline(lxc) {
        this.rc.online(lxc)
    }
}

export default NotifyRunner;