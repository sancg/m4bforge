# m4bforge

A simple CLI tool to build `.m4b` audiobooks from multiple audio files with chapters and cover art.

## Features

- Merge multiple `.m4a` files into a single `.m4b`
- Automatic chapter generation
- Metadata support (title, author)
- Cover art embedding
- Compatible with Apple Books and iPod Classic

---

## Requirements

- Node.js (>= 18 recommended)
- ffmpeg (must include ffprobe)

Install ffmpeg on macOS:

```bash
brew install ffmpeg
```

## Installation

Clone the repository:

```bash
git clone https://github.com/sancg/m4bforge.git
cd m4bforge
npm install
```

## Usage

Run the CLI:

```bash
npm run dev build <config.json>
```

Example:

```bash
npm run dev build examples/book.json
```

### Configuration File

Example book.json:

```json
{
  "title": "My Audiobook",
  "author": "Your Name",
  "cover": "./cover.jpg",
  "chapters": [
    { "title": "Chapter 1", "file": "./ch1.m4a" },
    { "title": "Chapter 2", "file": "./ch2.m4a" }
  ]
}
```

## How It Works

1. Reads chapter files
2. Extracts durations using ffprobe
3. Generates chapter metadata
4. Merges audio into .m4b
5. Embeds cover art
