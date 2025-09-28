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

/**
 * Main application class responsible for initializing and starting the terminal application.
 * This class serves as the entry point for the application lifecycle, coordinating
 * the initialization of terminal components and handling the startup process.
 */
class Application {
    /** Instance of the terminal application that manages the terminal interface */
    private terminalApp: TerminalApplication;
    /** Logger instance for application-level logging */
    private logger = Logger.getInstance();

    /**
     * Initializes the Application instance.
     * Creates a new TerminalApplication instance and prepares it for startup.
     */
    constructor() {
        this.terminalApp = new TerminalApplication();
    }

    /**
     * Starts the application asynchronously.
     * This method coordinates the initialization sequence:
     * 1. Initializes the ASCII animation
     * 2. Sets up the terminal with welcome animation
     * 3. Logs successful startup
     *
     * @returns Promise that resolves when application startup is complete
     * @throws Error if application startup fails
     */
    async start(): Promise<void> {
        try {
            this.logger.info('Application starting...');

            // Initialize ASCII animation
            await this.terminalApp.initializeAnimation();

            // Initialize terminal with the welcome animation
            await this.terminalApp.initializeTerminalWithAnimation();

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
