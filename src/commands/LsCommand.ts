// ==========================================
// Ls Command
// ==========================================

import { BaseCommand } from './BaseCommand.js';
import { FileSystem } from '../utils/FileSystem.js';

/**
 * Command that lists directory contents, similar to the Unix 'ls' command
 * This command displays files and directories in the current or specified
 * directory from the virtual file system. It provides basic file listing
 * functionality with file type indicators and permissions display.
 */
export class LsCommand extends BaseCommand {
    /**
     * Executes the ls command to list directory contents
     * The command accepts an optional directory path argument. If no path
     * is provided, it lists the contents of the current directory.
     *
     * The output mimics Unix-style directory listing with file permissions,
     * ownership, size, and modification time information.
     *
     * @param terminal - The terminal instance to output directory listing to
     * @param args - Command arguments, expects optional directory path
     */
    execute(terminal: any, ...args: string[]): void {
        const path = args[0] || '.';

        this.logger.info(`Executing ls command for path: ${path}`);

        const fileSystem = FileSystem.getInstance();
        const contents = fileSystem.getDirectoryContents(path);

        if (contents === null) {
            this.safeError(terminal, `ls: cannot access '${path}': No such file or directory`);
            this.logger.warn(`Directory not found: ${path}`);
            return;
        }

        if (contents.length === 0) {
            this.logger.info(`Directory is empty: ${path}`);
            return; // Empty directory, no output needed
        }

        this.logger.info(`Listing ${contents.length} items in directory: ${path}`);

        // Display each file/directory with Unix-style formatting
        contents.forEach(item => {
            const fullPath = fileSystem.resolvePath(path === '.' ? item : path + '/' + item);
            const fileInfo = fileSystem.getFileInfo(fullPath);

            if (fileInfo) {
                if (fileInfo.type === 'directory') {
                    // Directory: drwxr-xr-x  2 user group 4096 date dirname/
                    terminal.echo(`drwxr-xr-x  2 m4gik users 4096 ${new Date().toISOString().split('T')[0]} ${item}/`);
                } else {
                    // File: -rw-r--r--  1 user group size date filename
                    terminal.echo(`-rw-r--r--  1 m4gik users 1024 ${new Date().toISOString().split('T')[0]} ${item}`);
                }
            } else {
                this.logger.warn(`Could not get file info for: ${fullPath}`);
            }
        });

        this.logger.info(`Ls command completed for path: ${path}`);
    }

    /**
     * Returns the description of the ls command for help display
     * @returns A string describing what the ls command does
     */
    getDescription(): string {
        return 'List directory contents';
    }

    /**
     * Returns the usage syntax for the ls command
     * @returns A string showing how to use the ls command
     */
    getUsage(): string {
        return 'ls [directory]';
    }
}
