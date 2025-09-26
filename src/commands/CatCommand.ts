// ==========================================
// Cat Command
// ==========================================

import { BaseCommand } from './BaseCommand.js';
import { FileSystem } from '../utils/FileSystem.js';

/**
 * Command that displays the contents of files, similar to the Unix 'cat' command
 * This command reads and displays the contents of text files from the virtual
 * file system. It handles various error conditions like missing files,
 * directories, and permission issues.
 *
 * The command demonstrates file system interaction and proper error handling
 * in the context of a terminal emulator.
 */
export class CatCommand extends BaseCommand {
    /**
     * Executes the cat command to display file contents
     * The command expects exactly one argument: the path to the file to display.
     * It performs several checks:
     * - Validates that a file path is provided
     * - Checks if the file exists in the virtual file system
     * - Ensures the path points to a file, not a directory
     * - Reads and displays the file content line by line
     *
     * @param terminal - The terminal instance to output file contents or errors to
     * @param args - Command arguments, expects one file path argument
     */
    execute(terminal: any, ...args: string[]): void {
        const filePath = args[0];

        // Validate input arguments
        if (!filePath) {
            this.safeError(terminal, 'cat: missing file operand');
            this.safeEcho(terminal, 'Usage: cat <file>');
            this.logger.warn('Cat command executed without file path argument');
            return;
        }

        this.logger.info(`Attempting to display contents of file: ${filePath}`);

        const fileSystem = FileSystem.getInstance();
        const content = fileSystem.readFile(filePath);

        // Handle various error conditions
        if (content === null) {
            if (!fileSystem.fileExists(filePath)) {
                this.safeError(terminal, `cat: ${filePath}: No such file or directory`);
                this.logger.warn(`File does not exist: ${filePath}`);
            } else if (fileSystem.isDirectory(filePath)) {
                this.safeError(terminal, `cat: ${filePath}: Is a directory`);
                this.logger.warn(`Attempted to cat a directory: ${filePath}`);
            } else {
                this.safeError(terminal, `cat: ${filePath}: Permission denied`);
                this.logger.error(`Permission denied for file: ${filePath}`);
            }
            return;
        }

        this.logger.info(`Successfully read file: ${filePath}, content length: ${content.length}`);

        // Display file content line by line
        // This preserves line breaks and formatting
        const lines = content.split('\n');
        lines.forEach(line => {
            this.safeEcho(terminal, line);
        });

        this.logger.info(`File display completed for: ${filePath}`);
    }

    /**
     * Returns the description of the cat command for help display
     * @returns A string describing what the cat command does
     */
    getDescription(): string {
        return 'Display file contents';
    }

    /**
     * Returns the usage syntax for the cat command
     * @returns A string showing how to use the cat command
     */
    getUsage(): string {
        return 'cat <file>';
    }
}
