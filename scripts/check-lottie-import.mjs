import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('http://127.0.0.1:5173/')
const lottieType = await page.evaluate(async () => {
  const mod = await import('/node_modules/lottie-react/build/index.es.js')
  return {
    keys: Object.keys(mod),
    defaultType: typeof mod.default,
    defaultKeys: mod.default && typeof mod.default === 'object' ? Object.keys(mod.default) : null,
  }
})
console.log(lottieType)
await browser.close()
