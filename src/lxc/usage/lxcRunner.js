import CommonFactory from '../../common/Factory.js';
import fs from 'fs';
import path from 'path';

class LxcRunner {
    constructor() {
        this.utils = CommonFactory.getUtils();
        this.path = path.resolve('./src/lxc/usage/data/');
        this.notifyRunner = CommonFactory.getNotifyRestClient();
    }

    run() {
        this.main();
    }

    async main() {
        const lxcData = await this.utils.getLxcData();

        for (const lxc of lxcData) {
            const mem = this.memoryUsage(lxc);
            const cpu = this.cpuUsage(lxc) * 100;

            console.log('Container:', lxc.vmid, 'Memory:', mem, 'CPU:', cpu);
            console.log('--------------------------------------------------')

            if (!this.lastTenMinutes(lxc, "mem") && mem > process.env.USAGE_FIX_POINT) {
                await this.notifyRunner.memNotify(lxc);
            } else {
            }
            if (!this.lastTenMinutes(lxc, "cpu") && cpu > process.env.USAGE_FIX_POINT) {
                await this.notifyRunner.cpuNotify(lxc);
            } else {
            }
        }

    }

    cpuUsage(lxcData) {
        const cpu = lxcData.cpu;

        return cpu.toFixed(2)
    }

    memoryUsage(lxcData) {
        const maxmem = lxcData.maxmem / 1024 / 1024;
        const mem = lxcData.mem / 1024 / 1024;

        var percent =  (mem / maxmem * 100);

        return percent.toFixed(2)
    }

    lastTenMinutes(lxcData, action) {
        const containerID = lxcData.vmid;

        const path = this.path + '/' + action + '.json';

        try {
            const data = fs.readFileSync(path, 'utf8');
            const uptimeData = JSON.parse(data);



            if (lxcData.uptime < uptimeData[containerID]) {

                console.log('Uptime is less than the last uptime data');

                uptimeData[containerID] = lxcData.uptime;
                fs.writeFileSync(path, JSON.stringify(uptimeData));
            }

            console.log('Uptime:', lxcData.uptime, 'Last Uptime:', uptimeData[containerID], 'Action: ', action);
            console.log('--------------------------------------------------')


            if (uptimeData[containerID] === 0) {
                uptimeData[containerID] = lxcData.uptime;
                fs.writeFileSync(path, JSON.stringify(uptimeData));

                return false;
            }

            if (uptimeData[containerID]) {
                const uptimeFromLastNotify = uptimeData[containerID];
                const now = lxcData.uptime;

                const diff = now - uptimeFromLastNotify ;
                const diffInMinutes = diff / 60;

                if (diffInMinutes < 10) {
                    return true;
                } else {
                    uptimeData[containerID] = lxcData.uptime;
                    fs.writeFileSync(path, JSON.stringify(uptimeData));
                    return false;
                }

            } else {
                uptimeData[containerID] = lxcData.uptime;
                fs.writeFileSync(path, JSON.stringify(uptimeData));

                return false;
            }


        } catch (error) {
            console.error('Error reading uptime data file:', error);
            return false;
        }
    }

}

export default LxcRunner;