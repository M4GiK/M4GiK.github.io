// ==========================================
// Social Command
// ==========================================

import { BaseCommand } from './BaseCommand.js';

/**
 * Command that displays social media links and online presence
 * This command provides quick access to various social media platforms
 * and professional online communities where the developer is active.
 * It helps visitors connect on different platforms for different purposes.
 */
export class SocialCommand extends BaseCommand {
    /**
     * Executes the social command, displaying social media and online platform links
     * The command organizes links by platform type and includes brief descriptions
     * of what content or interactions can be expected on each platform.
     *
     * @param terminal - The terminal instance to output social media links to
     * @param args - Command arguments (not used in this command)
     */
    execute(terminal: any, ...args: string[]): void {
        this.logger.info('Executing social command');

        this.safeEcho(terminal, 'Social Media Links:');
        this.safeEcho(terminal, '==================');
        this.safeEcho(terminal, '  • GitHub: https://github.com/M4GiK');
        this.safeEcho(terminal, '    - Code repositories, open source projects, and technical contributions');
        this.safeEcho(terminal, '    - Follow for updates on software development projects');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, '  • LinkedIn: https://linkedin.com/in/m4gik');
        this.safeEcho(terminal, '    - Professional network, career updates, and industry insights');
        this.safeEcho(terminal, '    - Connect for business opportunities and networking');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, '  • Twitter: https://twitter.com/m4gik_dev');
        this.safeEcho(terminal, '    - Tech news, development tips, and real-time updates');
        this.safeEcho(terminal, '    - Follow for quick insights and tech discussions');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, '  • Dev.to: https://dev.to/m4gik');
        this.safeEcho(terminal, '    - Technical blog posts, tutorials, and development articles');
        this.safeEcho(terminal, '    - Community-driven content and developer discussions');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, '  • Stack Overflow: https://stackoverflow.com/users/m4gik');
        this.safeEcho(terminal, '    - Q&A contributions and programming expertise');
        this.safeEcho(terminal, '    - Help other developers and share knowledge');

        this.logger.info('Social command execution completed');
    }

    /**
     * Returns the description of the social command for help display
     * @returns A string describing what the social command does
     */
    getDescription(): string {
        return 'Social media links';
    }

    /**
     * Returns the usage syntax for the social command
     * @returns A string showing how to use the social command
     */
    getUsage(): string {
        return 'social';
    }
}
