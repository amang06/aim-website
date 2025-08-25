import * as migration_20250822_095145_add_events_news_only from './20250822_095145_add_events_news_only';

export const migrations = [
  {
    up: migration_20250822_095145_add_events_news_only.up,
    down: migration_20250822_095145_add_events_news_only.down,
    name: '20250822_095145_add_events_news_only'
  },
];
