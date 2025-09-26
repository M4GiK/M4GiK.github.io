// ==========================================
// Joke Command
// ==========================================

import { BaseCommand } from './BaseCommand.js';

/**
 * Command that displays random programming-related jokes
 * This command maintains a collection of developer humor and tech jokes,
 * randomly selecting and displaying one each time it's executed.
 * The jokes are light-hearted and focused on programming culture,
 * development practices, and technology in general.
 */
export class JokeCommand extends BaseCommand {
    /** Array of programming jokes available for random selection */
    private jokes: string[] = [
        "Why do programmers prefer dark mode? Because light attracts bugs!",
        "Why did the developer go broke? Because he used up all his cache!",
        "What's a programmer's favorite hangout spot? Foo Bar!",
        "Why did the JavaScript developer wear glasses? Because he couldn't C#!",
        "How do you comfort a JavaScript bug? You console it!",
        "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings!",
        "What's the difference between a tire and 365 used tires? One is a Goodyear, the other's a good year!",
        "Why did the programmer quit his job? Because he didn't get arrays!",
        "Why do programmers hate nature? It has too many bugs!",
        "What's a programmer's favorite type of music? Algo-rhythms!",
        "Why did the computer go to therapy? It had too many bytes of emotional baggage!",
        "What's the difference between a programmer and a non-programmer? The programmer thinks 'Hello World' is a great achievement!",
        "Why did the developer install a knock sensor on their door? To handle async events!",
        "What's a skeleton's favorite programming language? Bone-script!",
        "Why did the function go to therapy? It had too many parameters to deal with!"
    ];

    /**
     * Executes the joke command to display a random programming joke
     * The command randomly selects one joke from the internal collection
     * and displays it to the terminal. Each execution shows a different
     * joke, providing variety and entertainment for users.
     *
     * @param terminal - The terminal instance to output the joke to
     * @param args - Command arguments (not used in this command)
     */
    execute(terminal: any, ...args: string[]): void {
        this.logger.info('Executing joke command');

        const randomJoke = this.jokes[Math.floor(Math.random() * this.jokes.length)];

        this.safeEcho(terminal, randomJoke);

        this.logger.info(`Joke displayed: "${randomJoke.substring(0, 50)}..."`);
    }

    /**
     * Returns the description of the joke command for help display
     * @returns A string describing what the joke command does
     */
    getDescription(): string {
        return 'Random programming joke';
    }

    /**
     * Returns the usage syntax for the joke command
     * @returns A string showing how to use the joke command
     */
    getUsage(): string {
        return 'joke';
    }
}
