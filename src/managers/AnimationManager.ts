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

export class AnimationManager {
    private static instance: AnimationManager;
    private logger = Logger.getInstance();

    private constructor() {}

    static getInstance(): AnimationManager {
        if (!AnimationManager.instance) {
            AnimationManager.instance = new AnimationManager();
        }
        return AnimationManager.instance;
    }

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

        console.log(`🎬 Starting logo animation (<= ${maxDurationMs}ms), characters: ${contentArray.length}`);
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

    async animateTerminalText(
        terminalInstance: any,
        content: string,
        config: Partial<IAnimationConfig> = {}
    ): Promise<void> {
        const finalConfig: IAnimationConfig = {
            delay: 10,
            scrollToBottom: false,
            elementId: '',
            ...config
        };

        if (!terminalInstance) {
            this.logger.error('Terminal instance not found for animation');
            return;
        }

        const lines = content.split('\n');
        this.logger.info(`Starting terminal animation for ${lines.length} lines`);

        for (const line of lines) {
            if (line.trim()) {
                const chars = line.split('');
                let currentText = '';

                for (const char of chars) {
                    await AsyncUtils.delay(finalConfig.delay);
                    currentText += char;
                }

                terminalInstance.echo(currentText);
            } else {
                terminalInstance.echo('');
            }
        }

        this.logger.info('Terminal animation completed');
    }
}
