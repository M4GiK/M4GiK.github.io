// ==========================================
// Pwd Command
// ==========================================
import { BaseCommand } from './BaseCommand.js';
import { FileSystem } from '../utils/FileSystem.js';
/**
 * Command that prints the current working directory, similar to the Unix 'pwd' command
 * This command displays the full path of the current directory in the virtual
 * file system. It provides users with context about their current location
 * within the directory structure.
 */
export class PwdCommand extends BaseCommand {
    /**
     * Executes the pwd command to display the current working directory
     * The command retrieves the current directory path from the file system
     * and displays it to the user. This is essential for navigation and
     * understanding the current context in the terminal environment.
     *
     * @param terminal - The terminal instance to output the current directory to
     * @param args - Command arguments (not used in this command)
     */
    execute(terminal, ...args) {
        this.logger.info('Executing pwd command');
        const fileSystem = FileSystem.getInstance();
        const currentDirectory = fileSystem.getCurrentDirectory();
        this.safeEcho(terminal, currentDirectory);
        this.logger.info(`Pwd command completed, current directory: ${currentDirectory}`);
    }
    /**
     * Returns the description of the pwd command for help display
     * @returns A string describing what the pwd command does
     */
    getDescription() {
        return 'Print working directory';
    }
    /**
     * Returns the usage syntax for the pwd command
     * @returns A string showing how to use the pwd command
     */
    getUsage() {
        return 'pwd';
    }
}
