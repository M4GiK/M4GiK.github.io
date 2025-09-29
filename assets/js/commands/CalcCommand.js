// ==========================================
// Calc Command
// ==========================================
import { BaseCommand } from './BaseCommand.js';
/**
 * Command that provides a simple calculator functionality
 * This command evaluates mathematical expressions and displays the results.
 * It supports basic arithmetic operations and uses JavaScript's eval() function
 * with input sanitization for security. The calculator is designed for simple
 * calculations and includes error handling for invalid expressions.
 */
export class CalcCommand extends BaseCommand {
    /**
     * Executes the calc command to evaluate mathematical expressions
     * The command expects a single argument containing a mathematical expression.
     * It sanitizes the input to prevent code injection, then evaluates the
     * expression using eval(). Results are displayed in a readable format.
     *
     * Supported operations include basic arithmetic (+, -, *, /) and can
     * handle parentheses for order of operations.
     *
     * @param terminal - The terminal instance to output calculation results or errors to
     * @param args - Command arguments, expects one mathematical expression
     */
    execute(terminal, ...args) {
        const expression = args.join(' ').trim();
        this.logger.info(`Executing calc command with expression: "${expression}"`);
        if (!expression) {
            this.safeError(terminal, 'calc: missing expression');
            this.safeEcho(terminal, 'Usage: calc <expression>');
            this.safeEcho(terminal, 'Example: calc 2 + 2 * 3');
            this.logger.warn('Calc command executed without expression');
            return;
        }
        try {
            // Sanitize input to prevent code injection
            // Only allow numbers, basic operators, and parentheses
            const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
            if (sanitized !== expression) {
                this.safeError(terminal, 'calc: invalid characters in expression');
                this.safeEcho(terminal, 'Only numbers, +, -, *, /, (, ), and . are allowed');
                this.logger.warn(`Unsafe characters detected in expression: "${expression}"`);
                return;
            }
            // Evaluate the expression
            const result = eval(sanitized);
            // Check if result is a valid number
            if (typeof result !== 'number' || isNaN(result)) {
                throw new Error('Invalid result');
            }
            this.safeEcho(terminal, `${expression} = ${result}`);
            this.logger.info(`Calculation successful: ${expression} = ${result}`);
        }
        catch (error) {
            this.logger.error(`Calculator error for expression "${expression}": ${error}`);
            this.safeError(terminal, 'Invalid expression. Use basic math operations only.');
            this.safeEcho(terminal, 'Examples:');
            this.safeEcho(terminal, '  calc 2 + 2');
            this.safeEcho(terminal, '  calc (5 + 3) * 2');
            this.safeEcho(terminal, '  calc 10 / 3');
        }
    }
    /**
     * Returns the description of the calc command for help display
     * @returns A string describing what the calc command does
     */
    getDescription() {
        return 'Simple calculator';
    }
    /**
     * Returns the usage syntax for the calc command
     * @returns A string showing how to use the calc command
     */
    getUsage() {
        return 'calc [expression]';
    }
}
//# sourceMappingURL=CalcCommand.js.map