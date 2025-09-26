// ==========================================
// Base Command (Command Pattern)
// ==========================================

import { Logger } from '../utils/Logger.js';

/**
 * Interface defining the contract for all terminal commands
 * This interface ensures that all commands implement the basic methods
 * required for execution, description, and usage information.
 */
export interface ITerminalCommand {
    /**
     * Executes the command with the given arguments
     * @param terminal - The terminal instance to interact with
     * @param args - Variable number of string arguments passed to the command
     */
    execute(terminal: any, ...args: string[]): void;

    /**
     * Returns a brief description of what the command does
     * @returns A string describing the command's purpose
     */
    getDescription(): string;

    /**
     * Returns the usage syntax for the command
     * @returns A string showing how to use the command with parameters
     */
    getUsage(): string;
}

/**
 * Abstract base class for all terminal commands implementing the Command Pattern
 * This class provides common functionality and utilities that all commands can use,
 * such as logging, safe terminal output methods, and error handling.
 *
 * The Command Pattern allows treating commands as objects, enabling features like
 * undo/redo, command queuing, and dynamic command registration.
 */
export abstract class BaseCommand implements ITerminalCommand {
    /** Logger instance for command execution tracking and debugging */
    protected logger = Logger.getInstance();

    /**
     * Abstract method that must be implemented by concrete command classes
     * Contains the main logic for executing the command
     * @param terminal - The terminal instance to output results and interact with user
     * @param args - Arguments passed to the command from user input
     */
    abstract execute(terminal: any, ...args: string[]): void;

    /**
     * Abstract method that must be implemented by concrete command classes
     * Provides a human-readable description of the command's purpose
     * @returns Brief description string used in help systems
     */
    abstract getDescription(): string;

    /**
     * Abstract method that must be implemented by concrete command classes
     * Defines the correct syntax for using the command
     * @returns Usage string showing command name and expected parameters
     */
    abstract getUsage(): string;

    /**
     * Safely outputs a message to the terminal with null checks
     * This method ensures that terminal operations don't fail if the terminal
     * instance is not properly initialized or doesn't have the echo method.
     * @param terminal - The terminal instance to output to
     * @param message - The message to display in the terminal
     */
    protected safeEcho(terminal: any, message: string): void {
        if (terminal && typeof terminal.echo === 'function') {
            terminal.echo(message);
        } else {
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
    protected safeError(terminal: any, message: string): void {
        if (terminal && typeof terminal.error === 'function') {
            terminal.error(message);
        } else if (terminal && typeof terminal.echo === 'function') {
            terminal.echo(`Error: ${message}`);
        } else {
            this.logger.error(`Cannot display error: terminal not available - ${message}`);
        }
    }

    /**
     * Alias for safeEcho for backward compatibility
     * @param terminal - The terminal instance to output to
     * @param message - The message to display
     * @deprecated Use safeEcho instead for consistency
     */
    protected echo(terminal: any, message: string): void {
        this.safeEcho(terminal, message);
    }
}
