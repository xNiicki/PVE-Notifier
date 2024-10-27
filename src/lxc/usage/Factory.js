import LxcRunner from "./lxcRunner.js";
import NotifyRunner from "./notifyRunner.js";

class Factory {

    static getLxcRunner() {
        return new LxcRunner();
    }

    static getNotifyRunner() {
        return new NotifyRunner();
    }


}

export default Factory;