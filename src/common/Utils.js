import Factory from "./Factory.js";


class Utils {
    constructor() {
        // Initialize Utils
    }

    formatDate(date) {
        // Implement date formatting
    }

    validateEmail(email) {
        // Implement email validation
    }

    async getLxcData() {
        const rc = Factory.getRestClient();
        let lxcData;

        try {
            lxcData = await rc.get('/nodes/pve/lxc');
        } catch (error) {
            console.error(error);
        }

        return lxcData;

    }

    // Add other utility methods as needed
}


export default Utils;