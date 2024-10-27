import CommonFactory from "../../common/Factory.js";
import fs from 'fs';
import path from 'path';
import Factory from "./Factory.js";
import notifyRunner from "./notifyRunner.js";




class LxcRunner {
    constructor() {
        this.utils = CommonFactory.getUtils();
        this.path = path.resolve('./src/lxc/status/data/notified.json');
        this.notifyRunner = Factory.getNotifyRunner();
    }

    run() {
        this.main();
    }

    async main() {
        const lxcData = await this.utils.getLxcData();
        this.processLxcData(lxcData);
    }

    processLxcData(lxcData) {
        // Process LXC data
        for (const lxc of lxcData) {
            console.log('Container:', lxc.vmid, 'Status:', lxc.status);
            console.log('--------------------------------------------------')

            if (!this.isOfflineNotified(lxc.vmid) && lxc.status !== 'running') {
                this.notifyRunner.isOffline(lxc);
            } else if (!this.isOnlineNotified(lxc.vmid) && lxc.status === 'running') {
                this.notifyRunner.isOnline(lxc);
            }
        }
    }

    isOfflineNotified(vmid) {

        const data = this.getNotifiedData();

        if (data.includes(vmid)) {
            return true;
        } else {
            data.push(vmid);
            fs.writeFileSync(this.path, JSON.stringify(data));
            return false;
        }
    }

    isOnlineNotified(vmid) {
        const data = this.getNotifiedData();

        if (data.includes(vmid)) {
            // remove vmid from the list
            const index = data.indexOf(vmid);
            data.splice(index, 1);
            fs.writeFileSync(this.path, JSON.stringify(data));
            return false;
        } else {
            return true;
        }
    }

    getNotifiedData() {
        // Check if the file exists
        if (!fs.existsSync(this.path)) {
            // Create the file with an empty array if it does not exist
            fs.writeFileSync(this.path, JSON.stringify([]));
        }

        let data;
        try {
            // Read the file
            data = JSON.parse(fs.readFileSync(this.path, 'utf8'));
        } catch (error) {
            // Handle JSON parsing error
            console.error('Error parsing JSON:', error);
            data = [];
        }

        return data;
    }
}

export default LxcRunner;