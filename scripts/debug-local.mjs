import { chromium } from 'playwright'

const URL = 'http://127.0.0.1:5173/'

const browser = await chromium.launch()
const page = await browser.newPage()

page.on('console', (msg) => console.log('CONSOLE:', msg.type(), msg.text()))
page.on('pageerror', (err) => console.log('PAGEERROR:', err.message))

await page.goto(URL)
await page.getByRole('button', { name: /run compatibility test/i }).click()
await page.waitForTimeout(5000)

console.log('BODY:', (await page.locator('body').innerText()).slice(0, 500))
await browser.close()
