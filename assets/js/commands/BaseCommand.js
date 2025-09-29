// ==========================================
// Base Command (Command Pattern)
// ==========================================
import { Logger } from '../utils/Logger.js';
/**
 * Abstract base class for all terminal commands implementing the Command Pattern
 * This class provides common functionality and utilities that all commands can use,
 * such as logging, safe terminal output methods, and error handling.
 *
 * The Command Pattern allows treating commands as objects, enabling features like
 * undo/redo, command queuing, and dynamic command registration.
 */
export class BaseCommand {
    constructor() {
        /** Logger instance for command execution tracking and debugging */
        this.logger = Logger.getInstance();
    }
    /**
     * Safely outputs a message to the terminal with null checks
     * This method ensures that terminal operations don't fail if the terminal
     * instance is not properly initialized or doesn't have the echo method.
     * @param terminal - The terminal instance to output to
     * @param message - The message to display in the terminal
     */
    safeEcho(terminal, message) {
        if (terminal && typeof terminal.echo === 'function') {
            terminal.echo(message);
        }
        else {
            this.logger.warn(`Cannot echo message: terminal not available - ${message}`);
        }
    }
    /**
     * Safely outputs an error message to the terminal with null checks
     * Similar to safeEcho but specifically for error messages, using the terminal's
     * error method if available, falling back to regular echo or logging.
     * @param terminal - The terminal instance to output error to
     * @param message - The error message to display
     */
    safeError(terminal, message) {
        if (terminal && typeof terminal.error === 'function') {
            terminal.error(message);
        }
        else if (terminal && typeof terminal.echo === 'function') {
            terminal.echo(`Error: ${message}`);
        }
        else {
            this.logger.error(`Cannot display error: terminal not available - ${message}`);
        }
    }
    /**
     * Alias for safeEcho for backward compatibility
     * @param terminal - The terminal instance to output to
     * @param message - The message to display
     * @deprecated Use safeEcho instead for consistency
     */
    echo(terminal, message) {
        this.safeEcho(terminal, message);
    }
}
//# sourceMappingURL=BaseCommand.js.map