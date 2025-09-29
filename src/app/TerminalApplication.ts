// ==========================================
// Terminal Application (Facade Pattern)
// ==========================================

// jQuery is loaded globally via script tag in _layouts/default.html
declare const $: any;
import { Logger } from '../utils/Logger.js';
import { AnimationManager } from '../managers/AnimationManager.js';
import { AsyncUtils } from '../utils/AsyncUtils.js';
import { FileSystem } from '../utils/FileSystem.js';
import {
    ITerminalCommand,
    CommandFactory
} from '../commands/index.js';

export interface ITerminalConfig {
    greetings: string;
    name: string;
    height: number;
    prompt: string;
    history: boolean;
    historySize: number;
    scrollOnEcho: boolean;
    exit: boolean;
    clear: boolean;
    wordAutocomplete: boolean;
    caseSensitiveAutocomplete: boolean;
    checkArity: boolean;
    completion?: (command: string, callback: (candidates: string[]) => void) => void;
}

/**
 * Main terminal application class implementing the Facade pattern.
 * This class serves as the central coordinator for terminal functionality,
 * managing command execution, terminal initialization, dynamic height calculation,
 * and intelligent command completion. It provides a unified interface for
 * interacting with the underlying terminal system and animation components.
 *
 * Key responsibilities:
 * - Terminal initialization and configuration
 * - Command management and execution
 * - Dynamic UI updates (height, animations)
 * - Intelligent autocompletion for commands and file paths
 * - ASCII art animation orchestration
 */
export class TerminalApplication {
    /** Map of available terminal commands by name */
    private commands: Map<string, ITerminalCommand> = new Map();
    /** Logger instance for terminal-related operations */
    private logger = Logger.getInstance();
    /** Animation manager singleton for handling text animations */
    private animationManager = AnimationManager.getInstance();
    /** Reference to the jQuery Terminal instance */
    private terminalInstance: any = null;

    /**
     * Initializes the TerminalApplication instance.
     * Creates and registers all available terminal commands through the CommandFactory.
     */
    constructor() {
        this.initializeCommands();
    }

    /**
     * Initializes all terminal commands by creating them through the CommandFactory.
     * This method populates the internal commands map with all available command instances,
     * making them ready for execution when requested by the terminal interface.
     *
     * @private
     */
    private initializeCommands(): void {
        const commandFactory = CommandFactory.getInstance();
        this.commands = commandFactory.createAllCommands();
        this.logger.info(`Initialized ${this.commands.size} terminal commands`);
    }

    /**
     * Generates the configuration object for the jQuery Terminal instance.
     * This method returns a comprehensive configuration that controls terminal behavior,
     * including prompt appearance, history settings, autocompletion, and UI features.
     *
     * @returns ITerminalConfig object with terminal initialization settings
     * @private
     */
    private getTerminalConfig(): ITerminalConfig {
        const fileSystem = FileSystem.getInstance();
        const currentDir = fileSystem.getCurrentDirectory();
        const shortDir = currentDir.replace('/portfolio', '~') || '/';

        return {
            greetings: '',
            name: 'm4gik_terminal',
            height: 400,
            prompt: `guest@m4gik:${shortDir}$ `,
            history: true,
            historySize: 100,
            scrollOnEcho: true,
            exit: false,
            clear: true,
            wordAutocomplete: true,
            caseSensitiveAutocomplete: false,
            checkArity: false
        };
    }

    /**
     * Creates command functions bound to the terminal instance for jQuery Terminal.
     * This method generates wrapper functions for each command that handle execution
     * and error catching. When a command is invoked through the terminal interface,
     * it checks for a command description file first, displays it, then calls the
     * corresponding ITerminalCommand's execute method.
     *
     * @returns Object mapping command names to executable functions for jQuery Terminal
     * @private
     */
    private createTerminalCommands(): { [key: string]: Function } {
        const terminalCommands: { [key: string]: Function } = {};

        this.commands.forEach((command, name) => {
            terminalCommands[name] = function() {
                const args = Array.from(arguments);
                try {
                    // Check for command description file and display it
                    const descriptionPath = `/commands/${name}.md`;
                    const fileSystem = FileSystem.getInstance();
                    const description = fileSystem.readFile(descriptionPath);

                    if (description) {
                        // Display the command description
                        this.echo(description);
                        this.echo(''); // Add empty line for readability
                    }

                    // Execute the command
                    command.execute(this, ...args);
                } catch (error) {
                    console.error(`Command execution error: ${error}`);
                    this.error(`Error executing command '${name}': ${error}`);
                }
            };
        });

        return terminalCommands;
    }

    /**
     * Calculates the optimal terminal height based on viewport dimensions.
     * This method dynamically computes the terminal height by accounting for
     * various UI elements (header, footer, margins) and applying reasonable
     * min/max constraints to ensure good UX across different screen sizes.
     *
     * @returns Calculated height in pixels for the terminal
     */
    calculateDynamicHeight(): number {
        const viewportHeight = window.innerHeight;
        const headerHeight = 50;  // Reduced for larger terminal
        const footerHeight = 20;  // Reduced for larger terminal
        const margins = 20;       // Reduced margins

        const availableHeight = viewportHeight - headerHeight - footerHeight - margins;
        const minHeight = 400;    // Increased min height
        const maxHeight = viewportHeight - 100;  // Use almost full height minus small reserves

        const calculatedHeight = Math.max(minHeight, Math.min(availableHeight, maxHeight));

        this.logger.info(`Calculated terminal height: ${calculatedHeight}px`);
        return calculatedHeight;
    }

    /**
     * Updates the terminal element's height based on current viewport calculations.
     * This method finds the terminal DOM element and applies the dynamically
     * calculated height to ensure optimal display across different screen sizes.
     *
     * Called during initialization and when window is resized.
     */
    updateTerminalHeight(): void {
        const terminalElement = document.getElementById('terminal');
        if (terminalElement) {
            const height = this.calculateDynamicHeight();
            terminalElement.style.height = `${height}px`;
        }
    }

    /**
     * Initializes the jQuery Terminal instance with all configured settings.
     * This method sets up the terminal DOM element, attaches event listeners for
     * dynamic resizing, creates the command bindings, and configures autocompletion.
     *
     * @throws Error if the terminal DOM element is not found
     */
    initializeTerminal(): void {
        const terminalElement = $('#terminal');

        if (terminalElement.length === 0) {
            this.logger.error('Terminal element not found');
            throw new Error('Terminal element not found');
        }
        
        this.updateTerminalHeight();
        window.addEventListener('resize', () => this.updateTerminalHeight());

        const commands = this.createTerminalCommands();

        this.terminalInstance = terminalElement.terminal(commands, {
            ...this.getTerminalConfig(),
            completion: (command: string, callback: (candidates: string[]) => void) => {
                const completions = this.getAdvancedCompletions(command);
                callback(completions);
            },
            onCommandNotFound: (command: string) => {
                this.error(`Command not found: ${command}`);
                this.echo('Type "help" to see available commands or press Tab for completion');
            }
        });

        this.logger.info('Terminal initialized successfully');
    }

    /**
     * Initializes and runs the ASCII art animation for the logo text.
     * This method finds the ASCII text element, extracts its content, and uses
     * the AnimationManager to animate the text writing effect during application startup.
     */
    async initializeAnimation(): Promise<void> {
        const asciiText = document.getElementById('asciiText');

        if (!asciiText) {
            this.logger.warn('ASCII text element not found');
            return;
        }

        const asciiArt = asciiText.textContent || '';
        asciiText.textContent = '';

        // Start immediately
        await this.animationManager.animateTextWriting(asciiText, asciiArt, {
            delay: 50,
            scrollToBottom: false,
            elementId: 'asciiText',
            maxDurationMs: 2000
        });

        this.logger.info('ASCII animation completed');
    }

    async initializeTerminalWithAnimation(): Promise<void> {
        // First initialize the terminal
        this.initializeTerminal();

        // Wait a bit for terminal to be ready
        await AsyncUtils.delay(300);

        // Now animate the terminal greeting
        const greeting = 'Welcome to M4GiK\'s Terminal\nType "help" for available commands or press Tab for completion';

        await this.animationManager.animateTerminalText(this.terminalInstance, greeting, {
            delay: 30,
            scrollToBottom: false
        });


        await AsyncUtils.delay(100);
        await this.animationManager.animateTerminalText(this.terminalInstance, '💡 Tip: Use ↑/↓ arrows to navigate command history', {
            delay: 20
        });

        this.logger.info('Terminal animation completed');
    }

    private getAdvancedCompletions(command: string): string[] {
        // jQuery Terminal passes only the current word being typed, not the full command
        // We need to get the full command from the terminal instance
        const fullCommand = this.getCurrentCommand();

        const words = fullCommand.split(' ');
        const currentWord = command; // This is the word being completed

        // If it's just a command (no arguments yet), complete commands
        if (words.length === 1) {
            const availableCommands = Array.from(this.commands.keys());
            const result = availableCommands.filter(cmd => cmd.startsWith(currentWord));
            return result;
        }

        // If it's a command with arguments, check if it's a file system command
        const commandName = words[0];

        if (['cd', 'ls', 'cat', 'tree'].indexOf(commandName) !== -1) {
            const result = this.getFileSystemCompletions(commandName, currentWord);
            return result;
        }

        return [];
    }

    private getCurrentCommand(): string {
        if (!this.terminalInstance) {
            return '';
        }

        // Try to get the current command from terminal instance
        try {
            // jQuery Terminal stores the current command in different ways
            if (this.terminalInstance.get_command) {
                const result = this.terminalInstance.get_command();
                return result;
            }
            // Alternative: get from the input element
            const input = this.terminalInstance.find('input');
            if (input && input.length > 0) {
                const result = input.val() || '';
                return result;
            }

            // Fallback: return empty string
            return '';
        } catch (error) {
            console.warn('Could not get current command from terminal:', error);
            return '';
        }
    }

    private getFileSystemCompletions(commandName: string, currentWord: string): string[] {
        const fileSystem = FileSystem.getInstance();
        const completions: string[] = [];

        // Handle special path completions first
        if (currentWord === '' || currentWord === '.') {
            completions.push('./', '../');
        }

        if (currentWord === '' || currentWord.startsWith('/')) {
            completions.push('/portfolio/', '/documents/', '/projects/', '/tools/', '/commands/');
        }

        if (currentWord === '' || currentWord.startsWith('~')) {
            completions.push('~/');
        }

        // Handle relative paths and directory navigation
        if (currentWord.includes('/')) {
            // Handle partial paths like "doc/" or "proj/"
            const pathParts = currentWord.split('/');
            const basePath = pathParts.slice(0, -1).join('/');
            const searchTerm = pathParts[pathParts.length - 1];
            
            const targetPath = basePath === '' ? '.' : basePath;
            const dirContents = fileSystem.getDirectoryContents(targetPath);
            
            if (dirContents) {
                dirContents.forEach(item => {
                    const fullPath = fileSystem.resolvePath(targetPath + '/' + item);
                    const fileInfo = fileSystem.getFileInfo(fullPath);
                    
                    // For empty searchTerm, show all items; otherwise filter by startsWith
                    if (fileInfo && (searchTerm === '' || item.startsWith(searchTerm))) {
                        if (fileInfo.type === 'directory') {
                            completions.push(basePath + (basePath ? '/' : '') + item + '/');
                        } else {
                            // For files, filter based on command
                            if (commandName === 'cat') {
                                // For cat, only show files with readable content
                                if (fileSystem.readFile(fullPath) !== null) {
                                    completions.push(basePath + (basePath ? '/' : '') + item);
                                }
                            } else if (commandName !== 'cd') {
                                // For other commands, show all files
                                completions.push(basePath + (basePath ? '/' : '') + item);
                            }
                        }
                    }
                });
            }
        } else {
            // Handle simple file/directory names in current directory
            const currentDirContents = fileSystem.getDirectoryContents('.');
            if (currentDirContents) {
                currentDirContents.forEach(item => {
                    const fullPath = fileSystem.resolvePath(item);
                    const fileInfo = fileSystem.getFileInfo(fullPath);

                    // For empty currentWord, show all items; otherwise filter by startsWith
                    if (fileInfo && (currentWord === '' || item.startsWith(currentWord))) {
                        if (fileInfo.type === 'directory') {
                            completions.push(item + '/');
                        } else {
                            // For files, filter based on command
                            if (commandName === 'cat') {
                                // For cat, only show files with readable content
                                if (fileSystem.readFile(fullPath) !== null) {
                                    completions.push(item);
                                }
                            } else if (commandName !== 'cd') {
                                // For other commands, show all files
                                completions.push(item);
                            }
                        }
                    }
                });
            }
        }

        return [...new Set(completions)]; // Remove duplicates
    }

    // Terminal method delegation
    echo(message: string): void {
        if (this.terminalInstance) {
            this.terminalInstance.echo(message);
        } else {
            console.log(message);
        }
    }

    error(message: string): void {
        if (this.terminalInstance) {
            this.terminalInstance.error(message);
        } else {
            console.error(message);
        }
    }

    clear(): void {
        if (this.terminalInstance) {
            this.terminalInstance.clear();
        }
    }
}
