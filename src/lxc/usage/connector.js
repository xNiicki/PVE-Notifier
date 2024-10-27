import Factory from "./Factory.js";

export default class Connector {
    constructor() {
        this.lxcRunner = Factory.getLxcRunner();
    }

    run() {
        this.lxcRunner.run();
    }
}