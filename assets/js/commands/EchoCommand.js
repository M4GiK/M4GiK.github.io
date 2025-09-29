// ==========================================
// Echo Command
// ==========================================
import { BaseCommand } from './BaseCommand.js';
/**
 * Command that echoes text back to the terminal, similar to the Unix 'echo' command
 * This command simply outputs its arguments to the terminal. If no arguments
 * are provided, it outputs a blank line. It's useful for displaying text,
 * testing command functionality, and creating simple output in scripts.
 */
export class EchoCommand extends BaseCommand {
    /**
     * Executes the echo command to display text arguments
     * The command joins all arguments with spaces and outputs them to the terminal.
     * If no arguments are provided, it outputs a single newline (blank line).
     * This mimics the behavior of the standard Unix echo command.
     *
     * @param terminal - The terminal instance to output the echoed text to
     * @param args - Command arguments to be echoed back (variable number of strings)
     */
    execute(terminal, ...args) {
        this.logger.info(`Executing echo command with ${args.length} arguments`);
        if (args.length === 0) {
            this.safeEcho(terminal, '');
            this.logger.info('Echo command executed with no arguments (blank line)');
        }
        else {
            const output = args.join(' ');
            this.safeEcho(terminal, output);
            this.logger.info(`Echo command output: "${output}"`);
        }
        this.logger.info('Echo command execution completed');
    }
    /**
     * Returns the description of the echo command for help display
     * @returns A string describing what the echo command does
     */
    getDescription() {
        return 'Echo text back';
    }
    /**
     * Returns the usage syntax for the echo command
     * @returns A string showing how to use the echo command
     */
    getUsage() {
        return 'echo [text]';
    }
}
//# sourceMappingURL=EchoCommand.js.map