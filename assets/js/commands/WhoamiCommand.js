// ==========================================
// Whoami Command
// ==========================================
import { BaseCommand } from './BaseCommand.js';
/**
 * Command that displays the current user identity
 * This command shows the current username in the terminal session.
 * In a real system, this would query the actual user information,
 * but here it displays a fixed username for the portfolio terminal.
 */
export class WhoamiCommand extends BaseCommand {
    /**
     * Executes the whoami command to display current user information
     * The command outputs the current username, simulating a Unix-like
     * whoami command. In this portfolio terminal, it shows a fixed
     * user identity for demonstration purposes.
     *
     * @param terminal - The terminal instance to output the username to
     * @param args - Command arguments (not used in this command)
     */
    execute(terminal, ...args) {
        this.logger.info('Executing whoami command');
        const username = ' - guest@m4gik';
        const admin = ' - admin@m4gik';
        this.safeEcho(terminal, username + '\n' + admin);
        this.logger.info(`Whoami command completed, displayed: ${username}`);
    }
    /**
     * Returns the description of the whoami command for help display
     * @returns A string describing what the whoami command does
     */
    getDescription() {
        return 'Show current user';
    }
    /**
     * Returns the usage syntax for the whoami command
     * @returns A string showing how to use the whoami command
     */
    getUsage() {
        return 'whoami';
    }
}
//# sourceMappingURL=WhoamiCommand.js.map