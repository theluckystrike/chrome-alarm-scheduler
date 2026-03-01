# chrome-alarm-scheduler — Advanced Alarms for Chrome Extensions

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Built by [Zovo](https://zovo.one)**

**Chrome Alarms wrapper** — named alarms, recurring tasks, alarm groups, daily/hourly presets.

## 🚀 Quick Start
```typescript
import { AlarmScheduler, AlarmGroup } from 'chrome-alarm-scheduler';
const scheduler = new AlarmScheduler();
scheduler.daily('cleanup', () => cleanOldData());
scheduler.hourly('sync', () => syncData());
scheduler.once('remind', 30, () => showReminder());
```

## 📄 License
MIT — [Zovo](https://zovo.one)
