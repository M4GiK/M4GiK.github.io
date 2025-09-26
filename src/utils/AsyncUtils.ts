// ==========================================
// Async Utilities
// ==========================================

export class AsyncUtils {
    static delay(ms: number = 0): Promise<void> {
        return new Promise<void>((resolve) => setTimeout(resolve, ms));
    }
}
