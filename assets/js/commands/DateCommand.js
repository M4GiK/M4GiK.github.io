// ==========================================
// Date Command
// ==========================================
import { BaseCommand } from './BaseCommand.js';
/**
 * Command that displays the current date and time
 * This command shows the current system date and time in a human-readable
 * format. It provides users with temporal context and can be useful for
 * logging, timestamping, or simply checking the current time.
 */
export class DateCommand extends BaseCommand {
    /**
     * Executes the date command to display current date and time
     * The command retrieves the current date and time using JavaScript's
     * Date object and displays it in a standard format. The output includes
     * both date and time information in a readable string format.
     *
     * @param terminal - The terminal instance to output the current date/time to
     * @param args - Command arguments (not used in this command)
     */
    execute(terminal, ...args) {
        this.logger.info('Executing date command');
        const currentDate = new Date().toString();
        this.safeEcho(terminal, currentDate);
        this.logger.info(`Date command completed, displayed: ${currentDate}`);
    }
    /**
     * Returns the description of the date command for help display
     * @returns A string describing what the date command does
     */
    getDescription() {
        return 'Show current date';
    }
    /**
     * Returns the usage syntax for the date command
     * @returns A string showing how to use the date command
     */
    getUsage() {
        return 'date';
    }
}
