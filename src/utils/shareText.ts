import type { TestResults } from '../types'
import { statusLabel } from './apiCheck'

export function formatShareText(results: TestResults): string {
  const { browser, apis, testedAt } = results

  const lines = [
    'Web API Compatibility Report',
    '============================',
    '',
    `Tested: ${testedAt}`,
    '',
    'Browser Information',
    '-------------------',
    `Brand:         ${browser.brand}`,
    `OS:            ${browser.os}`,
    `Browser:       ${browser.browserName}`,
    `Version:       ${browser.version}`,
    `Platform:      ${browser.platform}`,
    `Secure Context: ${browser.isSecureContext ? 'Yes' : 'No'}`,
    '',
    'API Results',
    '-----------',
    ...apis.map(
      (api) => `${api.name}: ${statusLabel(api.status)} — ${api.message}`,
    ),
    '',
    'User Agent',
    '----------',
    browser.userAgent,
  ]

  return lines.join('\n')
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const success = document.execCommand('copy')
    document.body.removeChild(textarea)
    return success
  }
}
