#!/usr/bin/env node
import { execSync } from 'child_process';
import os from 'os';

// Detect package manager
const userAgent = process.env.npm_config_user_agent || '';
let pkgManager = 'npm';
if (userAgent.startsWith('pnpm')) pkgManager = 'pnpm';
if (userAgent.startsWith('yarn')) pkgManager = 'yarn';

// Detect OS
const isWindows = os.platform() === 'win32';

// Scripts to run
const commands = isWindows
  ? ['clean:win', 'lint:css', 'build:css:win', 'build:js:win', 'build:html:win']
  : [
      'clean:mac',
      'lint:css',
      'build:css:mac',
      'build:js:mac',
      'build:html:mac',
    ];

// Run commands
for (const cmd of commands) {
  execSync(`${pkgManager} run ${cmd}`, { stdio: 'inherit' });
}
