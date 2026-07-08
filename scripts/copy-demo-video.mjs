import { copyFileSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const TEST_RESULTS = 'test-results'
const OUT_DIR = '/opt/cursor/artifacts'

function findVideos(dir, matches = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      findVideos(fullPath, matches)
      continue
    }
    if (entry.name.endsWith('.webm') || entry.name.endsWith('.mp4')) {
      matches.push(fullPath)
    }
  }
  return matches
}

function pickVideo(videos, preferredName) {
  const preferred = videos.find((video) => video.includes(preferredName))
  if (preferred) return preferred

  let latest = null
  for (const video of videos) {
    const mtime = statSync(video).mtimeMs
    if (!latest || mtime > latest.mtime) latest = { path: video, mtime }
  }
  return latest?.path ?? null
}

mkdirSync(OUT_DIR, { recursive: true })

const videos = findVideos(TEST_RESULTS)
const source = pickVideo(videos, 'demo-flow')

if (!source) {
  console.error('No Playwright video found in test-results/')
  process.exit(1)
}

const destination = join(OUT_DIR, 'demo-flow.webm')
copyFileSync(source, destination)
console.log(`Demo video copied to ${destination}`)
