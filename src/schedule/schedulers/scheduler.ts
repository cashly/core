/**
 * Determines when something will happen
 */
export interface Scheduler {
    /**
     * Gets the next occurrence from the current date
     * @param currentDate The current date
     * @returns The next occurrence
     */
    getNextDate: (currentDate: Date) => Date;
}