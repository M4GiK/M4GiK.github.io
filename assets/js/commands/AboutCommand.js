// ==========================================
// About Command
// ==========================================
import { BaseCommand } from './BaseCommand.js';
/**
 * Command that displays information about M4GiK
 * This command provides a brief introduction and overview of the developer's background,
 * skills, and current focus areas in software development.
 */
export class AboutCommand extends BaseCommand {
    /**
     * Executes the about command, displaying personal and professional information
     * @param terminal - The terminal instance to output information to
     * @param args - Command arguments (not used in this command)
     */
    execute(terminal, ...args) {
        this.safeEcho(terminal, 'M4GiK - Software Developer & Tech Enthusiast');
        this.safeEcho(terminal, '==========================================');
        this.safeEcho(terminal, 'Passionate about creating innovative solutions');
        this.safeEcho(terminal, 'Specializing in web development and software engineering');
        this.safeEcho(terminal, 'Always learning new technologies and sharing knowledge');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, 'Current focus: Full-stack development, Java, DevOps, AI/ML');
    }
    /**
     * Returns the description of the command for help display
     * @returns A string describing what the command does
     */
    getDescription() {
        return 'About M4GiK';
    }
    /**
     * Returns the usage syntax for the command
     * @returns A string showing how to use the command
     */
    getUsage() {
        return 'about';
    }
}
//# sourceMappingURL=AboutCommand.js.map