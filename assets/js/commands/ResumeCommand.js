// ==========================================
// Resume Command
// ==========================================
import { BaseCommand } from './BaseCommand.js';
/**
 * Command that provides access to the developer's resume/CV
 * This command displays download links and online viewing options
 * for the professional resume, allowing visitors to access detailed
 * career information, skills, and experience.
 */
export class ResumeCommand extends BaseCommand {
    /**
     * Executes the resume command, displaying resume access information
     * The command provides multiple ways to access the resume including
     * direct download links and online viewing platforms.
     * It includes information about what the resume contains.
     *
     * @param terminal - The terminal instance to output resume information to
     * @param args - Command arguments (not used in this command)
     */
    execute(terminal, ...args) {
        this.logger.info('Executing resume command');
        this.safeEcho(terminal, 'Resume Download:');
        this.safeEcho(terminal, '================');
        this.safeEcho(terminal, 'Download my latest resume:');
        this.safeEcho(terminal, 'https://drive.google.com/file/d/resume-m4gik.pdf');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, 'The resume includes:');
        this.safeEcho(terminal, '  • Professional experience and career progression');
        this.safeEcho(terminal, '  • Technical skills and competencies');
        this.safeEcho(terminal, '  • Education and certifications');
        this.safeEcho(terminal, '  • Notable projects and achievements');
        this.safeEcho(terminal, '  • Professional development and training');
        this.safeEcho(terminal, '');
        this.safeEcho(terminal, 'Or view it online: https://resume.m4gik.dev');
        this.safeEcho(terminal, '  • Interactive web version with clickable links');
        this.safeEcho(terminal, '  • Optimized for all devices and screen sizes');
        this.logger.info('Resume command execution completed');
    }
    /**
     * Returns the description of the resume command for help display
     * @returns A string describing what the resume command does
     */
    getDescription() {
        return 'Download resume';
    }
    /**
     * Returns the usage syntax for the resume command
     * @returns A string showing how to use the resume command
     */
    getUsage() {
        return 'resume';
    }
}
