// ==========================================
// Help Command
// ==========================================

import { BaseCommand, ITerminalCommand } from './BaseCommand.js';

/**
 * Command that displays help information for all available terminal commands
 * This command implements a help system that lists all registered commands
 * with their descriptions and provides guidance on how to get detailed usage
 * information for specific commands.
 *
 * The HelpCommand demonstrates the Command Pattern by encapsulating the help
 * functionality as an object that can be executed like any other command.
 */
export class HelpCommand extends BaseCommand {
    /** Map containing all registered commands for help display */
    private commands: Map<string, ITerminalCommand>;

    /**
     * Creates a new HelpCommand instance
     * @param commands - Map of all available commands indexed by their names
     *                  This allows the help command to dynamically display
     *                  information about all registered commands
     */
    constructor(commands: Map<string, ITerminalCommand>) {
        super();
        this.commands = commands;
        this.logger.info(`HelpCommand initialized with ${commands.size} available commands`);
    }

    /**
     * Executes the help command, displaying available commands and usage guidance
     * If a specific command name is provided as an argument, it could potentially
     * show detailed help for that command (currently shows general help).
     *
     * The method iterates through all registered commands and displays their
     * names along with their descriptions in a formatted list.
     *
     * @param terminal - The terminal instance to output help information to
     * @param args - Optional command arguments (currently not used for specific command help)
     */
    execute(terminal: any, ...args: string[]): void {
        this.logger.info('Executing help command');

        this.safeEcho(terminal, 'Available commands:');

        // Display each command with its description
        this.commands.forEach((command, name) => {
            this.safeEcho(terminal, `  ${name} - ${command.getDescription()}`);
        });

        this.safeEcho(terminal, '');
        this.safeEcho(terminal, 'Type "help <command>" for detailed usage');

        this.logger.info('Help command execution completed');
    }

    /**
     * Returns the description of the help command for help display
     * @returns A string describing what the help command does
     */
    getDescription(): string {
        return 'Show this help message';
    }

    /**
     * Returns the usage syntax for the help command
     * @returns A string showing how to use the help command
     */
    getUsage(): string {
        return 'help [command]';
    }
}
