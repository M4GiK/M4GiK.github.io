// ==========================================
// Logger (Singleton Pattern)
// ==========================================

export interface ILogger {
    info(message: string): void;
    error(message: string): void;
    warn(message: string): void;
}

export class Logger implements ILogger {
    private static instance: Logger;
    private isDevelopment: boolean;

    private constructor() {
        this.isDevelopment = false; // Browser environment - disable development logging by default
    }

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    info(message: string): void {
        if (this.isDevelopment) {
            console.info(`[INFO] ${message}`);
        }
    }

    error(message: string): void {
        console.error(`[ERROR] ${message}`);
    }

    warn(message: string): void {
        console.warn(`[WARN] ${message}`);
    }
}
