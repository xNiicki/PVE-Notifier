import 'dotenv/config';
import lxcStatus from './src/lxc/status/connector.js';
import lxcUsage from './src/lxc/usage/connector.js';


const lxcStatusConnector = new lxcStatus();
const lxcUsageConnector = new lxcUsage();


while (true) {
    lxcStatusConnector.run();
    await new Promise(r => setTimeout(r, 2000));
    lxcUsageConnector.run();
    await new Promise(r => setTimeout(r, 2000));
}