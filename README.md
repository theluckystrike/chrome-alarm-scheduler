# chrome-alarm-scheduler — Alarm Scheduler

> **Built by [Zovo](https://zovo.one)** | `npm i chrome-alarm-scheduler`

Advanced Chrome Alarms API wrapper — cron-like scheduling, named alarms, recurring tasks, alarm groups, and persistence for Manifest V3.

## Features

- **Cron-like Scheduling**: Familiar cron syntax
- **Named Alarms**: Organize with names
- **Recurring Tasks**: Run periodically
- **Alarm Groups**: Group related alarms
- **Persistence**: Alarms survive browser restart

## Installation

```bash
npm install chrome-alarm-scheduler
```

## Quick Start

```typescript
import { AlarmScheduler } from 'chrome-alarm-scheduler';

const scheduler = new AlarmScheduler();

// Schedule a daily task
scheduler.schedule('daily-cleanup', '0 0 * * *', async () => {
  await cleanupOldData();
});

// Schedule once in 30 minutes
scheduler.scheduleOnce('reminder', 30 * 60 * 1000, () => {
  showReminder();
});
```

## API Reference

### Methods

```typescript
scheduler.schedule(name: string, cron: string, callback: Function): void;
scheduler.scheduleOnce(name: string, delayMs: number, callback: Function): void;
scheduler.cancel(name: string): void;
scheduler.getAlarm(name: string): Promise<Alarm | null>;
scheduler.getAlarms(): Promise<Alarm[]>;
```

## Cron Syntax

```typescript
// Every day at midnight
'* * * * *'  // Every minute
'0 0 * * *'  // Every day at midnight
'0 * * * *'  // Every hour
'0 0 * * 0' // Every week
```

## License

MIT License — see [LICENSE](./LICENSE) for details.
