// ==========================================
// Professional TypeScript Implementation
// Using Design Patterns and Best Practices
// ==========================================

// ==========================================
// Main Entry Point
// ==========================================

import { Logger } from './utils/Logger.js';
import { AsyncUtils } from './utils/AsyncUtils.js';
import { TerminalApplication } from './app/TerminalApplication.js';

class Application {
    private terminalApp: TerminalApplication;
    private logger = Logger.getInstance();

    constructor() {
        this.terminalApp = new TerminalApplication();
    }

    async start(): Promise<void> {
        try {
            this.logger.info('Application starting...');

            // Initialize ASCII animation
            await this.terminalApp.initializeAnimation();

            // Wait before initializing terminal
            await AsyncUtils.delay(300);

            // Initialize terminal
            await this.terminalApp.initializeTerminal();

            this.logger.info('Application started successfully');
        } catch (error) {
            this.logger.error(`Application startup error: ${error}`);
            throw error;
        }
    }
}

// ==========================================
// Bootstrap
// ==========================================

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const app = new Application();
        await app.start();
    } catch (error) {
        console.error('Failed to start application:', error);
    }
});
