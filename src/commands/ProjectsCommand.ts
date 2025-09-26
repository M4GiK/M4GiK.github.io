// ==========================================
// Projects Command
// ==========================================

import { BaseCommand } from './BaseCommand.js';

/**
 * Command that displays information about the developer's projects and portfolio
 * This command showcases various software development projects, including
 * commercial work, open source contributions, and personal projects.
 * It provides links to GitHub repositories and project descriptions.
 */
export class ProjectsCommand extends BaseCommand {
    /**
     * Executes the projects command, displaying a curated list of projects
     * The command shows projects in different categories including portfolio
     * websites, commercial projects, automation tools, and DevOps work.
     * Each project includes a brief description and relevant links.
     *
     * @param terminal - The terminal instance to output project information to
     * @param args - Command arguments (not used in this command)
     */
    execute(terminal: any, ...args: string[]): void {
        this.logger.info('Executing projects command');

        this.safeEcho(terminal, 'Recent Projects:');
        this.safeEcho(terminal, '===============');
        this.safeEcho(terminal, '  • Portfolio Website (Jekyll + TypeScript + jQuery Terminal)');
        this.safeEcho(terminal, '    - Interactive terminal-based portfolio with custom commands');
        this.safeEcho(terminal, '    - Built with modern web technologies and design patterns');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, '  • SynAI (commercial project)');
        this.safeEcho(terminal, '    - AI-powered automation platform');
        this.safeEcho(terminal, '    - Machine learning integration with business workflows');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, '  • E-commerce Platform (PHP, MySQL)');
        this.safeEcho(terminal, '    - Full-stack e-commerce solution with payment integration');
        this.safeEcho(terminal, '    - User management, inventory, and order processing');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, '  • AI Chatbot (n8n)');
        this.safeEcho(terminal, '    - Conversational AI assistant built with n8n workflow automation');
        this.safeEcho(terminal, '    - Natural language processing and API integrations');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, '  • Useful automation for Kams (Java, Python, MSSQL, MySQL)');
        this.safeEcho(terminal, '    - Enterprise automation scripts and data processing tools');
        this.safeEcho(terminal, '    - Database integration and reporting systems');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, '  • DevOps Automation (Docker + Jenkins, CircleCI, TeamCity)');
        this.safeEcho(terminal, '    - CI/CD pipeline implementation and container orchestration');
        this.safeEcho(terminal, '    - Infrastructure as Code and automated deployments');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, '  • Open source contributions on GitHub');
        this.safeEcho(terminal, '    - Various contributions to open source projects');
        this.safeEcho(terminal, '    - Bug fixes, feature implementations, and documentation');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, 'View more at: https://github.com/M4GiK');

        this.logger.info('Projects command execution completed');
    }

    /**
     * Returns the description of the projects command for help display
     * @returns A string describing what the projects command does
     */
    getDescription(): string {
        return 'View projects';
    }

    /**
     * Returns the usage syntax for the projects command
     * @returns A string showing how to use the projects command
     */
    getUsage(): string {
        return 'projects';
    }
}
