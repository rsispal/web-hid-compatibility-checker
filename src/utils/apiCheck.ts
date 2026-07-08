import type { ApiCheckResult, ApiStatus } from '../types'

interface ApiDefinition {
  id: string
  name: string
  navigatorKey: string
}

const API_DEFINITIONS: ApiDefinition[] = [
  { id: 'web-usb', name: 'USB devices', navigatorKey: 'usb' },
  { id: 'web-serial', name: 'Serial connections', navigatorKey: 'serial' },
  { id: 'web-bluetooth', name: 'Bluetooth devices', navigatorKey: 'bluetooth' },
]

function resolveStatus(hasApi: boolean, isSecureContext: boolean): ApiStatus {
  if (!hasApi) return 'unsupported'
  if (!isSecureContext) return 'warning'
  return 'supported'
}

function buildMessage(name: string, status: ApiStatus): string {
  switch (status) {
    case 'supported':
      return `Your browser can connect to ${name.toLowerCase()}.`
    case 'warning':
      return `Supported here, but only on secure (HTTPS) pages.`
    case 'unsupported':
      return `Not supported in this browser yet.`
  }
}

function checkApi(definition: ApiDefinition): ApiCheckResult {
  const hasApi = definition.navigatorKey in navigator
  const isSecureContext = window.isSecureContext
  const status = resolveStatus(hasApi, isSecureContext)

  return {
    id: definition.id,
    name: definition.name,
    status,
    message: buildMessage(definition.name, status),
  }
}

export function checkAllApis(): ApiCheckResult[] {
  return API_DEFINITIONS.map(checkApi)
}

export async function runApiChecksWithDelay(
  onProgress?: (api: ApiCheckResult, index: number) => void,
): Promise<ApiCheckResult[]> {
  const results: ApiCheckResult[] = []

  for (let index = 0; index < API_DEFINITIONS.length; index++) {
    await new Promise((resolve) => setTimeout(resolve, 650))
    const result = checkApi(API_DEFINITIONS[index])
    results.push(result)
    onProgress?.(result, index)
  }

  return results
}

export function statusLabel(status: ApiStatus): string {
  switch (status) {
    case 'supported':
      return 'Works'
    case 'warning':
      return 'Limited'
    case 'unsupported':
      return 'Unavailable'
  }
}
