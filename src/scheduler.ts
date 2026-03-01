/**
 * Alarm Scheduler — Named alarms with handlers
 */
export interface ScheduledTask { name: string; handler: () => void | Promise<void>; }

export class AlarmScheduler {
    private tasks = new Map<string, () => void | Promise<void>>();

    constructor() { chrome.alarms.onAlarm.addListener((alarm) => { const handler = this.tasks.get(alarm.name); if (handler) handler(); }); }

    /** Schedule a one-time alarm */
    once(name: string, delayMinutes: number, handler: () => void | Promise<void>): void {
        this.tasks.set(name, handler);
        chrome.alarms.create(name, { delayInMinutes: delayMinutes });
    }

    /** Schedule a recurring alarm */
    every(name: string, periodMinutes: number, handler: () => void | Promise<void>): void {
        this.tasks.set(name, handler);
        chrome.alarms.create(name, { periodInMinutes: periodMinutes });
    }

    /** Schedule for specific time */
    at(name: string, when: Date, handler: () => void | Promise<void>): void {
        this.tasks.set(name, handler);
        chrome.alarms.create(name, { when: when.getTime() });
    }

    /** Cancel an alarm */
    async cancel(name: string): Promise<void> { await chrome.alarms.clear(name); this.tasks.delete(name); }

    /** Cancel all alarms */
    async cancelAll(): Promise<void> { await chrome.alarms.clearAll(); this.tasks.clear(); }

    /** Get all scheduled alarms */
    async getAll(): Promise<chrome.alarms.Alarm[]> { return chrome.alarms.getAll(); }

    /** Check if alarm exists */
    async exists(name: string): Promise<boolean> { const alarm = await chrome.alarms.get(name); return !!alarm; }

    /** Common: daily alarm (runs every 24h) */
    daily(name: string, handler: () => void | Promise<void>): void { this.every(name, 1440, handler); }

    /** Common: hourly alarm */
    hourly(name: string, handler: () => void | Promise<void>): void { this.every(name, 60, handler); }
}
