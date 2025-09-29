// ==========================================
// Animation Manager (Singleton Pattern)
// ==========================================
import { Logger } from './utils/Logger.js';
import { AsyncUtils } from './utils/AsyncUtils.js';
export class AnimationManager {
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
        this.logger.info(`Starting text animation for ${content.length} characters`);
        await this.animateSlowly(target, content, finalConfig);
        if (finalConfig.scrollToBottom) {
            window.scrollTo(0, document.body.scrollHeight);
        }
        this.logger.info('Text animation completed');
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
        const finalConfig = Object.assign({ delay: 10, scrollToBottom: false }, config);
        if (!terminalInstance) {
            this.logger.error('Terminal instance not found for animation');
            return;
        }
        const lines = content.split('\n');
        for (const line of lines) {
            await this.animateLine(terminalInstance, line, finalConfig.delay);
        }
    }
    async animateLine(terminalInstance, line, delay) {
        return new Promise(async (resolve) => {
            let part = '';
            for (let i = 0; i < line.length; i++) {
                part += line[i];
                terminalInstance.update(-1, part);
                await AsyncUtils.delay(delay);
            }
            terminalInstance.echo(part);
            resolve();
        });
    }
}
