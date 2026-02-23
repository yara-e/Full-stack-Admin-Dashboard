"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }
        Logger.instance = this;
    }
    log(level, message, metadata) {
        const logObject = {
            level,
            message,
            timestamp: new Date().toISOString(),
            ...metadata,
        };
        console.log(JSON.stringify(logObject));
    }
    info(message, metadata) {
        this.log("info", message, metadata);
    }
    error(message, metadata) {
        this.log("error", message, metadata);
    }
    warn(message, metadata) {
        this.log("warn", message, metadata);
    }
    debug(message, metadata) {
        this.log("debug", message, metadata);
    }
}
const logger = new Logger();
exports.default = logger;
