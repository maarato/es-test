import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const isLinuxX64 = process.platform === 'linux' && process.arch === 'x64';
const nativePkgPath = 'node_modules/@rollup/rollup-linux-x64-gnu/package.json';

if (!isLinuxX64) {
  process.exit(0);
}

if (existsSync(nativePkgPath)) {
  process.exit(0);
}

const result = spawnSync(
  process.platform === 'win32' ? 'npm.cmd' : 'npm',
  ['install', '--no-save', '--no-audit', '--include=optional', '@rollup/rollup-linux-x64-gnu@4.60.1'],
  { stdio: 'inherit' }
);

if (result.status !== 0) {
  process.exit(result.status || 1);
}
