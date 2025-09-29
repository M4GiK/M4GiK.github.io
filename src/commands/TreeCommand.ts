// ==========================================
// Tree Command
// ==========================================

import { BaseCommand } from './BaseCommand.js';
import { FileSystem } from '../utils/FileSystem.js';

/**
 * Command that displays directory contents in a tree-like structure
 * This command displays files and directories in a hierarchical tree view,
 * similar to the Unix 'tree' command. It provides a visual representation
 * of the file system structure with proper indentation and branch indicators.
 */
export class TreeCommand extends BaseCommand {
    /**
     * Executes the tree command to display directory contents in tree format
     * The command accepts an optional directory path argument. If no path
     * is provided, it displays the tree starting from the current directory.
     *
     * The output shows a hierarchical view with ASCII art branch drawings,
     * making it easy to visualize the file system structure and navigate categories.
     *
     * @param terminal - The terminal instance to output tree structure to
     * @param args - Command arguments, expects optional directory path
     */
    execute(terminal: any, ...args: string[]): void {
        const startPath = args[0] || '.';

        this.logger.info(`Executing tree command for path: ${startPath}`);

        const fileSystem = FileSystem.getInstance();
        const resolvedPath = fileSystem.resolvePath(startPath);

        if (!fileSystem.getDirectoryContents(resolvedPath) && !fileSystem.isDirectory(resolvedPath)) {
            this.safeError(terminal, `tree: '${startPath}': No such file or directory`);
            this.logger.warn(`Directory not found for tree: ${startPath}`);
            return;
        }

        // Display tree header
        terminal.echo(`${startPath}`);
        this.displayTree(terminal, resolvedPath, '', true);

        this.logger.info(`Tree command completed for path: ${startPath}`);
    }

    /**
     * Recursively displays the tree structure for a given directory
     * @param terminal - Terminal instance for output
     * @param path - Current directory path
     * @param prefix - Prefix string for indentation and branches
     * @param isLast - Whether this is the last item in parent directory
     */
    private displayTree(terminal: any, path: string, prefix: string, isLast: boolean): void {
        const fileSystem = FileSystem.getInstance();
        const contents = fileSystem.getDirectoryContents(path);

        if (!contents) {
            return;
        }

        contents.forEach((item, index) => {
            const isLastItem = index === contents.length - 1;
            const itemPath = fileSystem.resolvePath(path + '/' + item);
            const fileInfo = fileSystem.getFileInfo(itemPath);

            if (!fileInfo) {
                return;
            }

            // Determine branch indicators
            const branch = isLastItem ? '└── ' : '├── ';
            const nextPrefix = prefix + (isLast ? '    ' : '│   ');

            // Display item with appropriate icon/color
            let displayName = item;
            if (fileInfo.type === 'directory') {
                displayName += '/';
                terminal.echo(`${prefix}${branch}📁 ${displayName}`);
                // Recursively display subdirectory contents
                this.displayTree(terminal, itemPath, nextPrefix, isLastItem);
            } else {
                terminal.echo(`${prefix}${branch}📄 ${displayName}`);
            }
        });
    }

    /**
     * Returns the description of the tree command for help display
     * @returns A string describing what the tree command does
     */
    getDescription(): string {
        return 'Display directory tree structure';
    }

    /**
     * Returns the usage syntax for the tree command
     * @returns A string showing how to use the tree command
     */
    getUsage(): string {
        return 'tree [directory]';
    }
}
