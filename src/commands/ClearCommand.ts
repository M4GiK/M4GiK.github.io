// ==========================================
// Clear Command
// ==========================================

import { BaseCommand } from './BaseCommand.js';

/**
 * Command that clears the terminal screen
 * This command removes all previous output from the terminal display,
 * providing a clean slate for new commands. It's equivalent to clearing
 * the terminal history and starting fresh.
 */
export class ClearCommand extends BaseCommand {
    /**
     * Executes the clear command to clear the terminal screen
     * The command calls the terminal's clear method to remove all
     * previous output and reset the display. This provides users
     * with a clean terminal interface for continued interaction.
     *
     * @param terminal - The terminal instance to clear
     * @param args - Command arguments (not used in this command)
     */
    execute(terminal: any, ...args: string[]): void {
        this.logger.info('Executing clear command');

        if (terminal && typeof terminal.clear === 'function') {
            terminal.clear();
            this.logger.info('Terminal screen cleared successfully');
        } else {
            this.logger.warn('Terminal clear method not available');
            this.safeError(terminal, 'Unable to clear terminal: clear method not available');
        }
    }

    /**
     * Returns the description of the clear command for help display
     * @returns A string describing what the clear command does
     */
    getDescription(): string {
        return 'Clear terminal';
    }

    /**
     * Returns the usage syntax for the clear command
     * @returns A string showing how to use the clear command
     */
    getUsage(): string {
        return 'clear';
    }
}
