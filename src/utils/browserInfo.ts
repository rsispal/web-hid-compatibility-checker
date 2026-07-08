import { UAParser } from 'ua-parser-js'
import type { BrowserInfo } from '../types'

export function getBrowserInfo(): BrowserInfo {
  const parser = new UAParser()
  const result = parser.getResult()

  const browserName = result.browser.name ?? 'Unknown'
  const version = result.browser.version ?? 'Unknown'
  const os = [result.os.name, result.os.version].filter(Boolean).join(' ') || 'Unknown'

  const nav = navigator as Navigator & {
    userAgentData?: { brands?: { brand: string }[] }
  }

  const brand =
    result.device.vendor ??
    result.engine.name ??
    (nav.userAgentData?.brands?.[0]?.brand ?? browserName)

  return {
    brand,
    os,
    browserName,
    version,
    userAgent: navigator.userAgent,
    platform: navigator.platform || 'Unknown',
    isSecureContext: window.isSecureContext,
  }
}
