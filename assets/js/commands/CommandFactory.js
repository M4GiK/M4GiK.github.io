// ==========================================
// Command Factory (Factory Pattern)
// ==========================================
import { HelpCommand } from './HelpCommand.js';
import { AboutCommand } from './AboutCommand.js';
import { SkillsCommand } from './SkillsCommand.js';
import { ProjectsCommand } from './ProjectsCommand.js';
import { ContactCommand } from './ContactCommand.js';
import { SocialCommand } from './SocialCommand.js';
import { ResumeCommand } from './ResumeCommand.js';
import { BlogCommand } from './BlogCommand.js';
import { StatusCommand } from './StatusCommand.js';
import { UptimeCommand } from './UptimeCommand.js';
import { LsCommand } from './LsCommand.js';
import { PwdCommand } from './PwdCommand.js';
import { CatCommand } from './CatCommand.js';
import { CdCommand } from './CdCommand.js';
import { EchoCommand } from './EchoCommand.js';
import { CalcCommand } from './CalcCommand.js';
import { JokeCommand } from './JokeCommand.js';
import { DateCommand } from './DateCommand.js';
import { WhoamiCommand } from './WhoamiCommand.js';
import { ClearCommand } from './ClearCommand.js';
/**
 * Factory class for creating terminal command instances
 * This class implements the Factory Pattern to centralize command creation
 * and management. It provides a single point for instantiating all available
 * commands and maintains a registry of command mappings.
 *
 * The Factory Pattern allows for:
 * - Centralized command instantiation
 * - Easy addition of new commands
 * - Consistent command creation interface
 * - Dependency injection capabilities
 */
export class CommandFactory {
    /**
     * Private constructor to enforce singleton pattern
     * Initializes the command registry with all available commands.
     */
    constructor() {
        /** Map of command names to their constructor functions */
        this.commandConstructors = new Map();
        this.registerCommands();
    }
    /**
     * Gets the singleton instance of CommandFactory
     * @returns The single CommandFactory instance
     */
    static getInstance() {
        if (!CommandFactory.instance) {
            CommandFactory.instance = new CommandFactory();
        }
        return CommandFactory.instance;
    }
    /**
     * Registers all available commands in the factory
     * This method maps command names to their respective constructor functions.
     * New commands should be added here when they are implemented.
     */
    registerCommands() {
        // Register all command constructors
        this.commandConstructors.set('help', HelpCommand);
        this.commandConstructors.set('about', AboutCommand);
        this.commandConstructors.set('skills', SkillsCommand);
        this.commandConstructors.set('projects', ProjectsCommand);
        this.commandConstructors.set('contact', ContactCommand);
        this.commandConstructors.set('social', SocialCommand);
        this.commandConstructors.set('resume', ResumeCommand);
        this.commandConstructors.set('blog', BlogCommand);
        this.commandConstructors.set('status', StatusCommand);
        this.commandConstructors.set('uptime', UptimeCommand);
        this.commandConstructors.set('ls', LsCommand);
        this.commandConstructors.set('pwd', PwdCommand);
        this.commandConstructors.set('cat', CatCommand);
        this.commandConstructors.set('cd', CdCommand);
        this.commandConstructors.set('echo', EchoCommand);
        this.commandConstructors.set('calc', CalcCommand);
        this.commandConstructors.set('joke', JokeCommand);
        this.commandConstructors.set('date', DateCommand);
        this.commandConstructors.set('whoami', WhoamiCommand);
        this.commandConstructors.set('clear', ClearCommand);
        console.log(`CommandFactory: Registered ${this.commandConstructors.size} commands`);
    }
    /**
     * Creates a command instance by name
     * This method instantiates the appropriate command class based on the
     * provided command name. It handles special cases like commands that
     * require additional parameters (e.g., HelpCommand needs the commands map).
     *
     * @param commandName - The name of the command to create
     * @param commandsMap - Map of all commands (required for HelpCommand)
     * @returns A new instance of the requested command, or null if not found
     */
    createCommand(commandName, commandsMap) {
        const CommandConstructor = this.commandConstructors.get(commandName.toLowerCase());
        if (!CommandConstructor) {
            console.warn(`CommandFactory: Unknown command '${commandName}'`);
            return null;
        }
        try {
            // Handle special case for HelpCommand which requires commands map
            if (commandName.toLowerCase() === 'help') {
                if (!commandsMap) {
                    console.error('CommandFactory: HelpCommand requires commands map parameter');
                    return null;
                }
                return new CommandConstructor(commandsMap);
            }
            // Create regular command instances
            return new CommandConstructor();
        }
        catch (error) {
            console.error(`CommandFactory: Failed to create command '${commandName}':`, error);
            return null;
        }
    }
    /**
     * Gets a list of all available command names
     * This method returns an array of all registered command names,
     * useful for help systems, autocompletion, and command validation.
     *
     * @returns Array of all available command names
     */
    getAvailableCommands() {
        return Array.from(this.commandConstructors.keys());
    }
    /**
     * Checks if a command is available
     * @param commandName - The name of the command to check
     * @returns True if the command is registered, false otherwise
     */
    isCommandAvailable(commandName) {
        return this.commandConstructors.has(commandName.toLowerCase());
    }
    /**
     * Creates all available commands and returns them in a map
     * This method instantiates all registered commands and returns them
     * in a Map structure, which is useful for terminal initialization.
     *
     * @returns Map of command names to command instances
     */
    createAllCommands() {
        const commands = new Map();
        // First pass: create regular commands
        for (const [name, Constructor] of this.commandConstructors) {
            if (name !== 'help') { // Skip help for now
                try {
                    commands.set(name, new Constructor());
                }
                catch (error) {
                    console.error(`Failed to create command '${name}':`, error);
                }
            }
        }
        // Second pass: create HelpCommand with the commands map
        try {
            commands.set('help', new HelpCommand(commands));
        }
        catch (error) {
            console.error('Failed to create HelpCommand:', error);
        }
        console.log(`CommandFactory: Created ${commands.size} command instances`);
        return commands;
    }
}
