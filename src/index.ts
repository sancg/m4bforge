import fs from 'fs';
import path from 'path';
import { buildAudiobook } from './builder';

const args = process.argv.slice(2);

console.log(args);
if (args[0] !== 'build' || !args[1]) {
  console.log('Usage: npm run dev build <config.json>');
  process.exit(1);
}

const configPath = path.resolve(args[1]);
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

buildAudiobook(config);
