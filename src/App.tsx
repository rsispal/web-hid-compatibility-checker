import { useCallback, useState } from 'react'
import type { AppPhase, TestResults } from './types'
import { LandingScreen } from './components/LandingScreen'
import { LoadingAnimation } from './components/LoadingAnimation'
import { ResultsScreen } from './components/ResultsScreen'
import { runApiChecksWithDelay } from './utils/apiCheck'
import { getBrowserInfo } from './utils/browserInfo'

export default function App() {
  const [phase, setPhase] = useState<AppPhase>('landing')
  const [isExiting, setIsExiting] = useState(false)
  const [results, setResults] = useState<TestResults | null>(null)

  const runTest = useCallback(async () => {
    setIsExiting(true)

    await new Promise((resolve) => setTimeout(resolve, 500))
    setPhase('loading')

    const apis = await runApiChecksWithDelay()
    const browser = getBrowserInfo()

    setResults({
      apis,
      browser,
      testedAt: new Date().toISOString(),
    })

    await new Promise((resolve) => setTimeout(resolve, 400))
    setPhase('results')
    setIsExiting(false)
  }, [])

  const handleRetest = useCallback(() => {
    setResults(null)
    setPhase('landing')
    setIsExiting(false)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-3xl" />

      <main className="relative z-10 min-h-screen">
        {phase === 'landing' && (
          <LandingScreen onStart={runTest} isExiting={isExiting} />
        )}

        {phase === 'loading' && (
          <div className="flex min-h-screen items-center justify-center animate-fade-in" data-testid="loading-screen">
            <LoadingAnimation />
          </div>
        )}

        {phase === 'results' && results && (
          <ResultsScreen results={results} onRetest={handleRetest} />
        )}
      </main>

      <footer className="relative z-10 border-t border-neutral-900 py-4 text-center text-xs text-neutral-600">
        Device Compatibility Checker
      </footer>
    </div>
  )
}
