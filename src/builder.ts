import fs from 'fs';
import { execSync } from 'child_process';
import { Audiobook, Chapter } from './types';

function getDuration(file: string): number {
  try {
    const output = execSync(
      `ffprobe -v error -select_streams a:0 -show_entries stream=duration -of csv=p=0 "${file}"`,
    )
      .toString()
      .trim();

    return Math.floor(parseFloat(output) * 1000);
  } catch (err) {
    throw new Error(`Failed to read duration for ${file}`);
  }
}

export function buildAudiobook(book: Audiobook) {
  console.log('Building audiobook...');

  // 1. Generate concat file
  const concatContent = book.chapters.map((ch: Chapter) => `file '${ch.file}'`).join('\n');

  fs.writeFileSync('inputs.txt', concatContent);

  // 2. Generate metadata
  let current = 0;
  let metadata = `;FFMETADATA1\n`;
  metadata += `title=${book.title}\n`;
  metadata += `artist=${book.author}\n\n`;

  for (const ch of book.chapters) {
    const duration = getDuration(ch.file);

    metadata += `[CHAPTER]\nTIMEBASE=1/1000\nSTART=${current}\nEND=${current + duration}\n`;
    metadata += `title=${ch.title}\n\n`;

    current += duration;
  }

  fs.writeFileSync('metadata.txt', metadata);

  // 3. Merge audio
  execSync(
    `ffmpeg -y -f concat -safe 0 -i inputs.txt -i metadata.txt -map 0:a -map_metadata 1 -c:a copy temp.m4b`,
    { stdio: 'inherit' },
  );

  // 4. Add cover
  execSync(
    `ffmpeg -y -i temp.m4b -i ${book.cover} -map 0:a -map 1:v -map_metadata 0 -c copy -disposition:v attached_pic output.m4b`,
    { stdio: 'inherit' },
  );

  console.log('Done → output.m4b');
}
