
class RestClient {
    constructor() {
        this.baseUrl = 'https://ntfy.sh/' + process.env.NTFY_TOPIC;
    }

    async online(lxc) {
        fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Title': 'LXC is Online Again',
                'Priority': '3',
                'Tags': 'green_circle, lxc',
            },
            body: 'LXC with ID "' + lxc.vmid + '" and Name "' + lxc.name + '" is online again.'
        });
    }

    async offline(lxc) {
        fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Title': 'LXC is Offline',
                'Priority': '5',
                'Tags': 'red_circle, lxc',
            },
            body: 'LXC with ID "' + lxc.vmid + '" and Name "' + lxc.name + '" is Offline.'
        });
    }

    async cpuNotify(lxc) {
        fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Title': 'High CPU Usage',
                'Priority': '4',
                'Tags': 'yellow_circle, lxc',
            },
            body: 'LXC with ID "' + lxc.vmid + '" and Name "' + lxc.name + '" has high CPU usage.'
        });
    }

    async memNotify(lxc) {
        fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Title': 'High Memory Usage',
                'Priority': '4',
                'Tags': 'yellow_circle, lxc',
            },
            body: 'LXC with ID "' + lxc.vmid + '" and Name "' + lxc.name + '" has high memory usage.'
        });
    }
}

export default RestClient;