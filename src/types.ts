export type ApiStatus = 'supported' | 'unsupported' | 'warning'

export interface ApiCheckResult {
  id: string
  name: string
  status: ApiStatus
  message: string
}

export interface BrowserInfo {
  brand: string
  os: string
  browserName: string
  version: string
  userAgent: string
  platform: string
  isSecureContext: boolean
}

export interface TestResults {
  apis: ApiCheckResult[]
  browser: BrowserInfo
  testedAt: string
}

export type AppPhase = 'landing' | 'loading' | 'results'
