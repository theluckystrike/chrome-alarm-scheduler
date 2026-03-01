/**
 * Alarm Group — Manage groups of related alarms
 */
export class AlarmGroup {
    private prefix: string;
    constructor(prefix: string) { this.prefix = prefix; }

    /** Create named alarm in group */
    create(name: string, periodMinutes: number): void {
        chrome.alarms.create(`${this.prefix}:${name}`, { periodInMinutes: periodMinutes });
    }

    /** Get all alarms in group */
    async getAll(): Promise<chrome.alarms.Alarm[]> {
        const all = await chrome.alarms.getAll();
        return all.filter((a) => a.name.startsWith(this.prefix + ':'));
    }

    /** Cancel all in group */
    async cancelAll(): Promise<void> {
        const alarms = await this.getAll();
        for (const a of alarms) await chrome.alarms.clear(a.name);
    }

    /** Cancel one */
    async cancel(name: string): Promise<void> { await chrome.alarms.clear(`${this.prefix}:${name}`); }
}
