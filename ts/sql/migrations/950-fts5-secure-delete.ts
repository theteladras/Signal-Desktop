// Copyright 2023 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import type { Database } from '@signalapp/better-sqlite3';

import type { LoggerType } from '../../types/Logging';

export const version = 950;

export function updateToSchemaVersion950(
  currentVersion: number,
  db: Database,
  logger: LoggerType
): void {
  if (currentVersion >= 950) {
    return;
  }

  db.transaction(() => {
    db.exec(`
      --- Enable 'secure-delete'
      INSERT INTO messages_fts
      (messages_fts, rank)
      VALUES
      ('secure-delete', 1);
    `);

    db.pragma('user_version = 950');
  })();

  logger.info('updateToSchemaVersion950: success!');
}
