import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const URL = 'http://127.0.0.1:4173/'
const OUT = '/opt/cursor/artifacts/screenshots'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 390, height: 844 } })

await page.goto(URL)
await page.getByTestId('run-test-button').click()
await page.getByTestId('results-screen').waitFor({ timeout: 15000 })
await page.waitForTimeout(1000)

await page.screenshot({ path: `${OUT}/mobile-results-with-icons.png`, fullPage: true })

const icons = page.locator('[data-testid^="status-icon-"]')
for (let index = 0; index < 3; index++) {
  const icon = icons.nth(index)
  await icon.screenshot({ path: `${OUT}/status-icon-${index + 1}.png` })
}

await browser.close()
console.log('Screenshots saved with visible status icons')
