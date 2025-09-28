// ==========================================
// Animation Manager (Singleton Pattern)
// ==========================================

import { Logger } from '../utils/Logger.js';
import { AsyncUtils } from '../utils/AsyncUtils.js';

export interface IAnimationConfig {
    delay: number;
    scrollToBottom: boolean;
    elementId: string;
    maxDurationMs?: number;
}

/**
 * Singleton animation manager for handling text and terminal animations.
 * This class provides centralized control over various animation effects used
 * throughout the application, including ASCII art text writing, terminal text
 * animation, and performance-optimized rendering techniques.
 *
 * Features:
 * - Text writing animations with configurable delays
 * - Optimized terminal text animation with batching
 * - Performance considerations with duration caps
 * - Scroll management during animations
 */
export class AnimationManager {
    /** Singleton instance of the AnimationManager */
    private static instance: AnimationManager;
    /** Logger instance for animation-related operations */
    private logger = Logger.getInstance();

    /**
     * Private constructor to enforce singleton pattern.
     * Prevents direct instantiation of the class.
     */
    private constructor() {}

    /**
     * Gets the singleton instance of AnimationManager.
     * Creates a new instance if one doesn't exist, otherwise returns the existing instance.
     *
     * @returns The single AnimationManager instance
     */
    static getInstance(): AnimationManager {
        if (!AnimationManager.instance) {
            AnimationManager.instance = new AnimationManager();
        }
        return AnimationManager.instance;
    }

    /**
     * Animates text writing character by character on a target HTML element.
     * Uses requestAnimationFrame for smooth animation with configurable delays
     * and duration caps for performance. Handles scrolling behavior and cleanup.
     *
     * @param target - The HTML element to animate text into
     * @param content - The text content to animate
     * @param config - Animation configuration options
     * @returns Promise that resolves when animation completes
     */
    async animateTextWriting(
        target: HTMLElement,
        content: string,
        config: Partial<IAnimationConfig> = {}
    ): Promise<void> {
        const finalConfig: IAnimationConfig = {
            delay: 5,
            scrollToBottom: true,
            elementId: '',
            ...config
        };

        if (!target) {
            this.logger.error('Target element not found for text animation');
            return;
        }

        const contentArray = content.split('');
        target.innerHTML = '';
        target.style.display = 'block';

        const defaultCap = 3000; // default cap 3s
        const maxDurationMs = typeof finalConfig.maxDurationMs === 'number' ? Math.max(0, finalConfig.maxDurationMs) : defaultCap;
        const estimatedDuration = contentArray.length * finalConfig.delay;
        const totalDurationMs = Math.min(maxDurationMs, Math.max(0, estimatedDuration));

        this.logger.info(`Starting text animation for ${contentArray.length} characters`);

        if (maxDurationMs === 0 || totalDurationMs <= 50 || contentArray.length === 0) {
            // Instant insert with a very fast fade-in to avoid layout thrash
            // Use a single text node for performance
            const textNode = document.createTextNode('');
            target.appendChild(textNode);
            textNode.appendData(content);
            return;
        }

        const startTime = performance && performance.now ? performance.now() : Date.now();
        const raf = window.requestAnimationFrame || function (cb: FrameRequestCallback) { return window.setTimeout(() => cb((performance && performance.now ? performance.now() : Date.now()) as any), 16) as unknown as number; };
        const caf = window.cancelAnimationFrame || function (id: number) { clearTimeout(id); };

        return new Promise<void>((resolve) => {
            let handle = 0;
            let lastScrollTs = 0;
            let lastIndex = 0;
            const textNode = document.createTextNode('');
            target.appendChild(textNode);

            const tick = () => {
                const now = performance && performance.now ? performance.now() : Date.now();
                const elapsed = now - startTime;
                const progress = Math.min(1, elapsed / totalDurationMs);
                const charsToShow = Math.ceil(progress * contentArray.length);

                if (charsToShow > lastIndex) {
                    const chunk = content.slice(lastIndex, charsToShow);
                    textNode.appendData(chunk);
                    lastIndex = charsToShow;
                }

                if (finalConfig.scrollToBottom) {
                    if (now - lastScrollTs > 50) {
                        window.scrollTo(0, document.body.scrollHeight);
                        lastScrollTs = now;
                    }
                }

                if (charsToShow >= contentArray.length) {
                    this.logger.info('Text animation completed');
                    resolve();
                } else {
                    handle = raf(tick as any);
                }
            };
            handle = raf(tick as any);
        });
    }

    /**
     * Animates text display in a jQuery Terminal instance using optimized batching.
     * This method provides smooth terminal text animation by processing characters
     * in batches and using setTimeout for consistent timing, rather than requestAnimationFrame
     * which can be too fast for terminal text rendering.
     *
     * The algorithm handles newlines by creating separate terminal lines and updates
     * existing lines incrementally for performance.
     *
     * @param terminalInstance - The jQuery Terminal instance to animate text into
     * @param content - The text content to animate (can include newlines)
     * @param config - Animation configuration options
     * @returns Promise that resolves when animation completes
     */
    async animateTerminalText(
        terminalInstance: any,
        content: string,
        config: Partial<IAnimationConfig> = {}
    ): Promise<void> {
        const finalConfig: IAnimationConfig = {
            delay: 10, // Even faster for smoother effect
            scrollToBottom: false,
            elementId: '',
            ...config
        };

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
                    } else {
                        terminalInstance.echo('');
                    }
                } else {
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
