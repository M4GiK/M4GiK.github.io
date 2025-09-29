// ==========================================
// Professional TypeScript Implementation
// Using Design Patterns and Best Practices
// ==========================================
// jQuery and jQuery Terminal are loaded globally via script tags
// Dynamic import for commands to avoid module issues
let CommandFactory;
// ==========================================
// Utility Classes
// ==========================================
class AsyncUtils {
    static delay(ms = 0) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
class Logger {
    constructor() {
        this.isDevelopment = false; // Browser environment - no process object
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    info(message) {
        if (this.isDevelopment) {
            console.info(`[INFO] ${message}`);
        }
    }
    error(message) {
        console.error(`[ERROR] ${message}`);
    }
    warn(message) {
        console.warn(`[WARN] ${message}`);
    }
}
// ==========================================
// Animation Manager (Singleton Pattern)
// ==========================================
class AnimationManager {
    constructor() {
        this.logger = Logger.getInstance();
    }
    static getInstance() {
        if (!AnimationManager.instance) {
            AnimationManager.instance = new AnimationManager();
        }
        return AnimationManager.instance;
    }
    async animateTextWriting(target, content, config = {}) {
        const finalConfig = Object.assign({ delay: 5, scrollToBottom: true, elementId: '' }, config);
        if (!target) {
            this.logger.error('Target element not found for text animation');
            return;
        }
        this.logger.info(`Starting optimized text animation for ${content.length} characters`);
        // Use slower animation for compatibility
        await this.animateSlowly(target, content, finalConfig);
        // Cleanup will-change for better performance after animation
        target.style.willChange = '';
        if (finalConfig.scrollToBottom) {
            window.scrollTo(0, document.body.scrollHeight);
        }
        this.logger.info('Optimized text animation completed');
    }
    async animateSlowly(target, content, config) {
        return new Promise((resolve) => {
            let currentIndex = 0;
            const chars = content.split('');
            const animateChar = () => {
                if (currentIndex < chars.length) {
                    target.innerHTML += chars[currentIndex];
                    currentIndex++;
                    setTimeout(animateChar, config.delay);
                }
                else {
                    resolve();
                }
            };
            animateChar();
        });
    }
    async animateTerminalText(terminalInstance, content, config = {}) {
        const finalConfig = Object.assign({ delay: 10, scrollToBottom: false, elementId: '' }, config);
        if (!terminalInstance) {
            this.logger.error('Terminal instance not found for animation');
            return;
        }
        const chars = content.split('');
        this.logger.info(`Starting optimized terminal animation for ${chars.length} characters`);
        // Start with empty echo to create the line
        const lineIndex = terminalInstance.echo('');
        // Optimized: Batch characters and use setTimeout-based approach for terminal
        // (requestAnimationFrame would be too fast for terminal text)
        const batchSize = Math.max(1, Math.floor(60 / (1000 / finalConfig.delay)));
        let currentIndex = 0;
        const animateBatch = async () => {
            const batchEnd = Math.min(currentIndex + batchSize, chars.length);
            let batchText = '';
            // Build batch text
            for (let i = currentIndex; i < batchEnd; i++) {
                const char = chars[i];
                if (char === '\n') {
                    // Handle newline separately
                    if (batchText.length > 0) {
                        const currentContent = terminalInstance.get_output().split('\n');
                        currentContent[currentContent.length - 1] += batchText;
                        terminalInstance.update(currentContent.length - 1, currentContent[currentContent.length - 1]);
                        terminalInstance.echo(''); // Add new line
                        batchText = '';
                    }
                    else {
                        terminalInstance.echo('');
                    }
                }
                else {
                    batchText += char;
                }
            }
            // Update with remaining batch text
            if (batchText.length > 0) {
                const currentContent = terminalInstance.get_output().split('\n');
                currentContent[currentContent.length - 1] += batchText;
                terminalInstance.update(currentContent.length - 1, currentContent[currentContent.length - 1]);
            }
            currentIndex = batchEnd;
            if (currentIndex < chars.length) {
                await AsyncUtils.delay(finalConfig.delay);
                await animateBatch();
            }
        };
        await animateBatch();
        this.logger.info('Optimized terminal animation completed');
    }
}
class CommandCompletionStrategy {
    getCompletions(command, availableCommands) {
        const words = command.split(' ');
        const currentWord = words[words.length - 1];
        if (words.length === 1) {
            return availableCommands.filter(cmd => cmd.startsWith(currentWord));
        }
        return [];
    }
}
class ArgumentCompletionStrategy {
    constructor() {
        this.argumentSuggestions = new Map([
            ['echo', ['hello', 'world', 'M4GiK', 'terminal']],
            ['calc', ['2+2', '10*5', '(5+3)*2', 'sqrt(16)']],
            ['social', ['github', 'linkedin', 'twitter', 'devto']]
        ]);
    }
    getCompletions(command, availableCommands) {
        const words = command.split(' ');
        const currentWord = words[words.length - 1];
        if (words.length > 1) {
            const commandName = words[0];
            const suggestions = this.argumentSuggestions.get(commandName) || [];
            if (currentWord.startsWith('/')) {
                return ['/home', '/usr', '/bin', '/etc'];
            }
            else if (currentWord.startsWith('.')) {
                return ['./', '../', '.bashrc', '.profile'];
            }
            else {
                return suggestions.filter(item => item.startsWith(currentWord));
            }
        }
        return [];
    }
}
class CompletionManager {
    constructor() {
        this.strategies = [
            new CommandCompletionStrategy(),
            new ArgumentCompletionStrategy()
        ];
    }
    getCompletions(command, availableCommands) {
        for (const strategy of this.strategies) {
            const completions = strategy.getCompletions(command, availableCommands);
            if (completions.length > 0) {
                return completions;
            }
        }
        return [];
    }
}
// ==========================================
// Terminal Application (Facade Pattern)
// ==========================================
class TerminalApplication {
    constructor() {
        this.commands = new Map();
        this.logger = Logger.getInstance();
        this.animationManager = AnimationManager.getInstance();
        this.completionManager = new CompletionManager();
        this.terminalInstance = null;
        // Initialize commands asynchronously
        this.initializeCommandsAsync();
    }
    async initializeCommandsAsync() {
        try {
            // Dynamic import of CommandFactory
            const { CommandFactory: ImportedCommandFactory } = await import('./commands/index.js');
            CommandFactory = ImportedCommandFactory;
            const commandFactory = CommandFactory.getInstance();
            this.commands = commandFactory.createAllCommands();
            this.logger.info(`Initialized ${this.commands.size} terminal commands using CommandFactory`);
        }
        catch (error) {
            this.logger.error(`Failed to load CommandFactory: ${error}`);
            // Fallback: create empty commands map
            this.commands = new Map();
        }
    }
    getTerminalConfig() {
        return {
            greetings: '', // Remove default greeting to avoid duplication
            name: 'm4gik_terminal',
            height: this.calculateDynamicHeight(), // Use dynamic height instead of fixed
            prompt: '', // Hide prompt initially during animation
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
            terminalCommands[name] = function (...args) {
                try {
                    command.execute(this, ...args);
                }
                catch (error) {
                    console.error(`Command execution error: ${error}`);
                    this.error(`Error executing command '${name}': ${error}`);
                }
            }.bind(this);
        });
        return terminalCommands;
    }
    calculateDynamicHeight() {
        const viewportHeight = window.innerHeight;
        const headerHeight = 100; // Approximate logo height
        const footerHeight = 80; // Footer height including padding
        const bodyPadding = 50; // body padding-bottom
        // Calculate margins based on screen size (matching CSS media queries)
        let margins = 60; // Default desktop margins (30px top + 30px bottom)
        if (viewportHeight < 769) {
            margins = 30; // Tablet margins (15px top + 15px bottom)
        }
        if (viewportHeight < 481) {
            margins = 20; // Mobile margins (10px top + 10px bottom)
        }
        const availableHeight = viewportHeight - headerHeight - footerHeight - margins - bodyPadding;
        const minHeight = 300;
        const maxHeight = viewportHeight * 0.8;
        const calculatedHeight = Math.max(minHeight, Math.min(availableHeight, maxHeight));
        this.logger.info(`Calculated terminal height: ${calculatedHeight}px (viewport: ${viewportHeight}, margins: ${margins})`);
        return calculatedHeight;
    }
    initializeTerminal() {
        const terminalElement = $('#terminal');
        if (terminalElement.length === 0) {
            this.logger.error('Terminal element not found');
            throw new Error('Terminal element not found');
        }
        const config = this.getTerminalConfig();
        const commands = this.createTerminalCommands();
        const availableCommands = Array.from(this.commands.keys());
        this.terminalInstance = terminalElement.terminal(commands, Object.assign(Object.assign({}, config), { completion: (command, callback) => {
                const completions = this.completionManager.getCompletions(command, availableCommands);
                callback(completions);
            }, onCommandNotFound: (command) => {
                this.error(`Command not found: ${command}`);
                this.echo('Type "help" to see available commands or press Tab for completion');
            }, onInit: () => {
                // Tips are now animated separately to avoid duplication
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
        // Read custom delay from data attribute if provided (in milliseconds)
        const delayAttr = asciiText.getAttribute('data-delay');
        const customDelay = delayAttr ? Math.max(0, parseInt(delayAttr, 10) || 0) : 5;
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
        await AsyncUtils.delay(50);
        // Now animate only the welcome message
        const greeting = 'Welcome to M4GiK\'s Terminal\nType "help" for available commands or press Tab for completion';
        await this.animationManager.animateTerminalText(this.terminalInstance, greeting, {
            delay: 10,
            scrollToBottom: false
        });
        // Wait a bit after animation
        await AsyncUtils.delay(300);
        // Now show the prompt by setting it properly
        this.terminalInstance.set_prompt('guest@m4gik:~$ ');
        this.logger.info('Terminal animation completed');
    }
    // Delegate terminal methods
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
}
// ==========================================
// Application Bootstrap
// ==========================================
class Application {
    constructor() {
        this.logger = Logger.getInstance();
        this.terminalApp = new TerminalApplication();
    }
    async start() {
        try {
            this.logger.info('Application starting...');
            // Initialize ASCII animation
            await this.terminalApp.initializeAnimation();
            // Initialize terminal with animated content immediately after logo
            await this.terminalApp.initializeTerminalWithAnimation();
            this.logger.info('Application started successfully');
        }
        catch (error) {
            this.logger.error(`Application startup error: ${error}`);
            throw error;
        }
    }
}
// ==========================================
// Entry Point
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const app = new Application();
        await app.start();
    }
    catch (error) {
        console.error('Failed to start application:', error);
    }
});
