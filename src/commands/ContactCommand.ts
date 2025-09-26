// ==========================================
// Contact Command
// ==========================================

import { BaseCommand } from './BaseCommand.js';

/**
 * Command that displays contact information and communication channels
 * This command provides various ways to get in touch with the developer,
 * including email, social media profiles, and professional networking platforms.
 * It serves as a central point for contact information within the terminal interface.
 */
export class ContactCommand extends BaseCommand {
    /**
     * Executes the contact command, displaying comprehensive contact information
     * The command shows multiple communication channels including email,
     * professional networking sites, and social media profiles.
     * Each contact method includes relevant links and context.
     *
     * @param terminal - The terminal instance to output contact information to
     * @param args - Command arguments (not used in this command)
     */
    execute(terminal: any, ...args: string[]): void {
        this.logger.info('Executing contact command');

        this.safeEcho(terminal, 'Contact Information:');
        this.safeEcho(terminal, '===================');
        this.safeEcho(terminal, '  • Email: michal.szczygiel@wp.pl');
        this.safeEcho(terminal, '    - Primary communication channel for professional inquiries');
        this.safeEcho(terminal, '    - Response time: Usually within 24 hours');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, '  • GitHub: https://github.com/M4GiK');
        this.safeEcho(terminal, '    - View my open source projects and contributions');
        this.safeEcho(terminal, '    - Code samples, repositories, and technical writing');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, '  • LinkedIn: https://www.linkedin.com/in/michal-szczygiel');
        this.safeEcho(terminal, '    - Professional network and career updates');
        this.safeEcho(terminal, '    - Connect for business opportunities and collaborations');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, 'Feel free to reach out for:');
        this.safeEcho(terminal, '  - Project collaborations and partnerships');
        this.safeEcho(terminal, '  - Technical consulting and advice');
        this.safeEcho(terminal, '  - Speaking engagements and workshops');
        this.safeEcho(terminal, '  - Open source contributions and discussions');

        this.logger.info('Contact command execution completed');
    }

    /**
     * Returns the description of the contact command for help display
     * @returns A string describing what the contact command does
     */
    getDescription(): string {
        return 'Contact information';
    }

    /**
     * Returns the usage syntax for the contact command
     * @returns A string showing how to use the contact command
     */
    getUsage(): string {
        return 'contact';
    }
}
