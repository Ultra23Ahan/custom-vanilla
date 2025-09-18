#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userAgent = process.env.npm_config_user_agent || '';
let pkgManager = 'npm';
if (userAgent.startsWith('pnpm')) pkgManager = 'pnpm';
if (userAgent.startsWith('yarn')) pkgManager = 'yarn';

const projectName = process.argv[2];

if (!projectName) {
  console.log('Please specify a project name:');
  console.log('  npm/pnpm create @ultra23ahan/custom-vanilla my-app');
  process.exit(1);
}

const targetDir = path.join(process.cwd(), projectName);

if (fs.existsSync(targetDir)) {
  console.error(`Folder "${projectName}" already exists.`);
  process.exit(1);
}

fs.mkdirSync(targetDir);

// Copy template files
const templateDir = path.join(__dirname, 'template');

function copyDir(src, dest) {
  fs.readdirSync(src).forEach((item) => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (fs.statSync(srcPath).isDirectory()) {
      fs.mkdirSync(destPath);
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

copyDir(templateDir, targetDir);

console.log(`Project "${projectName}" created successfully!`);
console.log(`Run: cd ${projectName} && ${pkgManager} install`);
