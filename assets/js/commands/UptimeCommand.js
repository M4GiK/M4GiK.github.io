// ==========================================
// Uptime Command
// ==========================================
import { BaseCommand } from './BaseCommand.js';
/**
 * Command that displays system uptime information
 * This command simulates system uptime by generating a random but
 * realistic uptime value. In a real system, this would query the
 * actual system uptime, but here it provides a fun, dynamic response
 * that gives the impression of a running system.
 */
export class UptimeCommand extends BaseCommand {
    /**
     * Executes the uptime command, displaying simulated system uptime
     * The command generates a random uptime value between 0 and 24 hours,
     * then formats it into a human-readable hours:minutes:seconds format.
     * This creates the illusion of a system that has been running for
     * a variable amount of time.
     *
     * @param terminal - The terminal instance to output uptime information to
     * @param args - Command arguments (not used in this command)
     */
    execute(terminal, ...args) {
        this.logger.info('Executing uptime command');
        // Generate a random uptime between 0 and 24 hours (in seconds)
        const maxUptimeSeconds = 24 * 60 * 60; // 24 hours
        const uptime = Math.floor(Math.random() * maxUptimeSeconds);
        // Convert to hours, minutes, seconds
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;
        // Format the output similar to Unix uptime command
        const formattedUptime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.safeEcho(terminal, `System uptime: ${formattedUptime}`);
        this.safeEcho(terminal, '(This is a simulated value for demonstration purposes)');
        this.logger.info(`Uptime command completed with simulated uptime: ${formattedUptime}`);
    }
    /**
     * Returns the description of the uptime command for help display
     * @returns A string describing what the uptime command does
     */
    getDescription() {
        return 'System uptime';
    }
    /**
     * Returns the usage syntax for the uptime command
     * @returns A string showing how to use the uptime command
     */
    getUsage() {
        return 'uptime';
    }
}
