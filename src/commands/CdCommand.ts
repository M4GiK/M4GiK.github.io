// ==========================================
// Cd Command
// ==========================================

import { BaseCommand } from './BaseCommand.js';
import { FileSystem } from '../utils/FileSystem.js';

/**
 * Command that changes the current working directory, similar to the Unix 'cd' command
 * This command allows navigation through the virtual file system by changing
 * the current directory context. It supports special directory references like
 * '~' for home directory and handles various path formats.
 *
 * The command updates both the file system's internal state and the terminal's
 * prompt to reflect the current directory location.
 */
export class CdCommand extends BaseCommand {
    /**
     * Executes the cd command to change the current working directory
     * The command accepts an optional directory path argument. If no argument
     * is provided, it defaults to the home directory ('~').
     *
     * Special handling includes:
     * - '~' or empty string: Navigate to home directory (/home/m4gik)
     * - '-': Not implemented (would typically go to previous directory)
     * - Relative or absolute paths: Navigate to specified directory
     *
     * Upon successful directory change, the terminal prompt is updated to
     * show the current directory path.
     *
     * @param terminal - The terminal instance to update prompt and display errors
     * @param args - Command arguments, expects optional directory path
     */
    execute(terminal: any, ...args: string[]): void {
        const directory = args[0] || '~';
        const fileSystem = FileSystem.getInstance();

        let targetPath = directory;

        this.logger.info(`Attempting to change directory to: ${directory}`);

        // Handle special directory references
        if (directory === '~' || directory === '') {
            targetPath = '/home/m4gik';
            this.logger.info('Using home directory as target path');
        } else if (directory === '-') {
            this.safeError(terminal, 'cd: no previous directory');
            this.logger.warn('Previous directory navigation not implemented');
            return;
        }

        // Attempt to change directory
        if (fileSystem.setCurrentDirectory(targetPath)) {
            this.logger.info(`Successfully changed directory to: ${targetPath}`);

            // Update terminal prompt to reflect new directory
            const currentDir = fileSystem.getCurrentDirectory();
            const shortDir = currentDir.replace('/home/m4gik', '~') || '/';

            if (terminal && typeof terminal.set_prompt === 'function') {
                const newPrompt = `guest@m4gik-terminal:${shortDir}$ `;
                terminal.set_prompt(newPrompt);
                this.logger.info(`Updated terminal prompt to: ${newPrompt}`);
            } else {
                this.logger.warn('Could not update terminal prompt: set_prompt method not available');
            }
        } else {
            this.safeError(terminal, `cd: ${directory}: No such file or directory`);
            this.logger.warn(`Failed to change directory: ${directory} does not exist`);
        }
    }

    /**
     * Returns the description of the cd command for help display
     * @returns A string describing what the cd command does
     */
    getDescription(): string {
        return 'Change directory';
    }

    /**
     * Returns the usage syntax for the cd command
     * @returns A string showing how to use the cd command
     */
    getUsage(): string {
        return 'cd [directory]';
    }
}
