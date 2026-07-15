#!/usr/bin/env node
const [major, minor] = process.versions.node.split('.').map(Number);
const isSupported =
  major > 18 || (major === 18 && minor >= 18) || major === 20 || major === 22 || major >= 24;

if (!isSupported) {
  console.error(`Node ${process.versions.node} is not supported.`);
  console.error('Use Node 18.18+ or 20+. Run: nvm use 20');
  process.exit(1);
}
