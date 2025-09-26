// ==========================================
// Terminal Application (Facade Pattern)
// ==========================================
import $ from 'jquery';
import { Logger } from '../utils/Logger.js';
import { AnimationManager } from '../managers/AnimationManager.js';
import { AsyncUtils } from '../utils/AsyncUtils.js';
import { FileSystem } from '../utils/FileSystem.js';
import { HelpCommand, AboutCommand, SkillsCommand, CatCommand, CdCommand } from '../commands/index.js';
export class TerminalApplication {
    constructor() {
        this.commands = new Map();
        this.logger = Logger.getInstance();
        this.animationManager = AnimationManager.getInstance();
        this.terminalInstance = null;
        this.initializeCommands();
    }
    initializeCommands() {
        const commandInstances = [
            new HelpCommand(this.commands),
            new AboutCommand(),
            new SkillsCommand(),
            new CatCommand(),
            new CdCommand()
            // Add more commands here as they are implemented
        ];
        commandInstances.forEach(command => {
            this.commands.set(command.constructor.name.toLowerCase().replace('command', ''), command);
        });
        this.logger.info(`Initialized ${this.commands.size} terminal commands`);
    }
    getTerminalConfig() {
        return {
            greetings: 'Welcome to M4GiK\'s Terminal\nType "help" for available commands or press Tab for completion\n',
            name: 'm4gik_terminal',
            height: 400,
            prompt: 'guest@m4gik:~$ ',
            history: true,
            historySize: 100,
            scrollOnEcho: true,
            exit: false,
            clear: false,
            wordAutocomplete: true,
            caseSensitiveAutocomplete: false,
            checkArity: false
        };
    }
    createTerminalCommands() {
        const terminalCommands = {};
        this.commands.forEach((command, name) => {
            terminalCommands[name] = function () {
                const args = Array.from(arguments);
                try {
                    command.execute(this, ...args);
                }
                catch (error) {
                    console.error(`Command execution error: ${error}`);
                    this.error(`Error executing command '${name}': ${error}`);
                }
            };
        });
        return terminalCommands;
    }
    calculateDynamicHeight() {
        const viewportHeight = window.innerHeight;
        const headerHeight = 100;
        const footerHeight = 50;
        const margins = 40;
        const availableHeight = viewportHeight - headerHeight - footerHeight - margins;
        const minHeight = 300;
        const maxHeight = viewportHeight * 0.8;
        const calculatedHeight = Math.max(minHeight, Math.min(availableHeight, maxHeight));
        this.logger.info(`Calculated terminal height: ${calculatedHeight}px`);
        return calculatedHeight;
    }
    updateTerminalHeight() {
        const terminalElement = document.getElementById('terminal');
        if (terminalElement) {
            const height = this.calculateDynamicHeight();
            terminalElement.style.height = `${height}px`;
        }
    }
    initializeTerminal() {
        const terminalElement = $('#terminal');
        if (terminalElement.length === 0) {
            this.logger.error('Terminal element not found');
            throw new Error('Terminal element not found');
        }
        this.updateTerminalHeight();
        window.addEventListener('resize', () => this.updateTerminalHeight());
        const config = this.getTerminalConfig();
        const commands = this.createTerminalCommands();
        this.terminalInstance = terminalElement.terminal(commands, Object.assign(Object.assign({}, config), { completion: (command, callback) => {
                const completions = this.getAdvancedCompletions(command);
                callback(completions);
            }, onCommandNotFound: (command) => {
                this.error(`Command not found: ${command}`);
                this.echo('Type "help" to see available commands or press Tab for completion');
            }, onInit: () => {
                this.echo('💡 Tip: Use Tab for intelligent command completion');
                this.echo('💡 Tip: Use ↑/↓ arrows to navigate command history');
            } }));
        this.logger.info('Terminal initialized successfully');
    }
    async initializeAnimation() {
        const asciiText = document.getElementById('asciiText');
        if (!asciiText) {
            this.logger.warn('ASCII text element not found');
            return;
        }
        const asciiArt = asciiText.textContent || '';
        asciiText.textContent = '';
        // Allow overriding typing delay via data-delay attribute (milliseconds)
        const delayAttr = asciiText.getAttribute('data-delay');
        const customDelay = delayAttr ? Math.max(0, parseInt(delayAttr, 10) || 0) : 10;
        // Optional total duration override via data-duration (in ms)
        const durationAttr = asciiText.getAttribute('data-duration');
        const customDuration = durationAttr ? Math.max(0, parseInt(durationAttr, 10) || 0) : undefined;
        // Start immediately
        await this.animationManager.animateTextWriting(asciiText, asciiArt, {
            delay: customDelay,
            scrollToBottom: false,
            elementId: 'asciiText',
            maxDurationMs: customDuration
        });
        this.logger.info('ASCII animation completed');
    }
    async initializeTerminalWithAnimation() {
        // First initialize the terminal
        this.initializeTerminal();
        // Wait a bit for terminal to be ready
        await AsyncUtils.delay(500);
        // Now animate the terminal greeting
        const greeting = 'Welcome to M4GiK\'s Terminal\nType "help" for available commands or press Tab for completion';
        await this.animationManager.animateTerminalText(this.terminalInstance, greeting, {
            delay: 30,
            scrollToBottom: false
        });
        // Add the tips with animation
        await AsyncUtils.delay(200);
        await this.animationManager.animateTerminalText(this.terminalInstance, '💡 Tip: Use Tab for intelligent command completion', {
            delay: 20
        });
        await AsyncUtils.delay(100);
        await this.animationManager.animateTerminalText(this.terminalInstance, '💡 Tip: Use ↑/↓ arrows to navigate command history', {
            delay: 20
        });
        this.logger.info('Terminal animation completed');
    }
    getAdvancedCompletions(command) {
        const words = command.split(' ');
        const currentWord = words[words.length - 1];
        // If it's just a command (no arguments yet), complete commands
        if (words.length === 1) {
            const availableCommands = Array.from(this.commands.keys());
            return availableCommands.filter(cmd => cmd.startsWith(currentWord));
        }
        // If it's a command with arguments, check if it's a file system command
        const commandName = words[0];
        if (['cd', 'ls', 'cat'].indexOf(commandName) !== -1) {
            return this.getFileSystemCompletions(commandName, currentWord);
        }
        return [];
    }
    getFileSystemCompletions(commandName, currentWord) {
        const fileSystem = FileSystem.getInstance();
        const completions = [];
        // Get current directory contents
        const currentDirContents = fileSystem.getDirectoryContents('.');
        if (!currentDirContents)
            return [];
        // Add directories and files based on current word
        currentDirContents.forEach(item => {
            const fullPath = fileSystem.resolvePath(item);
            const fileInfo = fileSystem.getFileInfo(fullPath);
            if (fileInfo) {
                if (fileInfo.type === 'directory') {
                    // For directories, add with trailing slash
                    if (item.startsWith(currentWord)) {
                        completions.push(item + '/');
                    }
                }
                else {
                    // For files, add as-is
                    if (item.startsWith(currentWord)) {
                        completions.push(item);
                    }
                }
            }
        });
        // Add special path completions
        if (currentWord === '' || currentWord === '.') {
            completions.unshift('./', '../');
        }
        if (currentWord === '' || currentWord.startsWith('/')) {
            completions.unshift('/home/', '/usr/', '/bin/', '/etc/');
        }
        if (currentWord === '' || currentWord.startsWith('~')) {
            completions.unshift('~/');
        }
        return [...new Set(completions)]; // Remove duplicates
    }
    // Terminal method delegation
    echo(message) {
        if (this.terminalInstance) {
            this.terminalInstance.echo(message);
        }
        else {
            console.log(message);
        }
    }
    error(message) {
        if (this.terminalInstance) {
            this.terminalInstance.error(message);
        }
        else {
            console.error(message);
        }
    }
    clear() {
        if (this.terminalInstance) {
            this.terminalInstance.clear();
        }
    }
}
