// ==========================================
// Skills Command
// ==========================================

import { BaseCommand } from './BaseCommand.js';

/**
 * Command that displays technical skills and expertise areas
 * This command provides a comprehensive overview of programming languages,
 * technologies, tools, and other technical competencies.
 */
export class SkillsCommand extends BaseCommand {
    /**
     * Executes the skills command, displaying categorized technical skills
     * @param terminal - The terminal instance to output skills information to
     * @param args - Command arguments (not used in this command)
     */
    execute(terminal: any, ...args: string[]): void {
        this.safeEcho(terminal, 'Technical Skills:');
        this.safeEcho(terminal, '================');
        this.safeEcho(terminal, '  • Programming Languages: TypeScript, JavaScript, Python, Java, C++');
        this.safeEcho(terminal, '  • Web Technologies: HTML, CSS, React, Node.js, Express, GraphQL');
        this.safeEcho(terminal, '  • Backend: PostgreSQL, MongoDB, Redis, Docker, Kubernetes');
        this.safeEcho(terminal, '  • Tools: Git, AWS, Linux, CI/CD, Jest, Webpack');
        this.safeEcho(terminal, '  • Other: Machine Learning, Data Science, Cybersecurity');
    }

    /**
     * Returns the description of the command for help display
     * @returns A string describing what the command does
     */
    getDescription(): string {
        return 'List technical skills';
    }

    /**
     * Returns the usage syntax for the command
     * @returns A string showing how to use the command
     */
    getUsage(): string {
        return 'skills';
    }
}
