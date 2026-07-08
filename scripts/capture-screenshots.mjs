import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const URL = process.argv[2] ?? 'http://127.0.0.1:4173/'
const OUT = '/opt/cursor/artifacts/screenshots'

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
]

await mkdir(OUT, { recursive: true })

const browser = await chromium.launch()

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: viewport.name === 'mobile',
    hasTouch: viewport.name !== 'desktop',
    userAgent:
      viewport.name === 'mobile'
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        : undefined,
  })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', (err) => errors.push(err.message))

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 })
  await page.screenshot({ path: `${OUT}/${viewport.name}-01-landing.png`, fullPage: true })

  await page.getByRole('button', { name: /run compatibility test/i }).click()
  await page.waitForTimeout(1500)
  await page.screenshot({ path: `${OUT}/${viewport.name}-02-loading.png`, fullPage: true })

  await page.waitForTimeout(3500)
  await page.screenshot({ path: `${OUT}/${viewport.name}-03-results.png`, fullPage: true })

  const bodyText = await page.locator('body').innerText()
  console.log(
    JSON.stringify({
      viewport: viewport.name,
      errors,
      hasResults: bodyText.includes('APIs ready'),
      hasCopyButton: bodyText.includes('Copy report'),
    }),
  )

  await context.close()
}

await browser.close()
