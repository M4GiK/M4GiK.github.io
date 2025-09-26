// ==========================================
// Logger (Singleton Pattern)
// ==========================================
export class Logger {
    constructor() {
        this.isDevelopment = false; // Browser environment - disable development logging by default
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    info(message) {
        if (this.isDevelopment) {
            console.info(`[INFO] ${message}`);
        }
    }
    error(message) {
        console.error(`[ERROR] ${message}`);
    }
    warn(message) {
        console.warn(`[WARN] ${message}`);
    }
}
