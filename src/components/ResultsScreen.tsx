import type { TestResults } from '../types'
import { ApiResultItem } from './ApiResultItem'
import { BrowserInfoTable } from './BrowserInfoTable'
import { CopyShareButton } from './CopyShareButton'

interface ResultsScreenProps {
  results: TestResults
  onRetest: () => void
}

export function ResultsScreen({ results, onRetest }: ResultsScreenProps) {
  const supportedCount = results.apis.filter((a) => a.status === 'supported').length

  return (
    <div className="animate-fade-in mx-auto w-full max-w-2xl px-6 py-16">
      <header className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
          Diagnostics complete
        </p>
        <h2 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
          {supportedCount} of {results.apis.length} APIs ready
        </h2>
        <p className="mt-3 text-neutral-400">
          Your browser compatibility results are below.
        </p>
      </header>

      <section className="mb-8">
        <ul className="flex flex-col gap-3">
          {results.apis.map((api, index) => (
            <ApiResultItem key={api.id} result={api} index={index} />
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <BrowserInfoTable browser={results.browser} />
      </section>

      <section className="flex flex-col gap-4">
        <CopyShareButton results={results} />
        <button
          type="button"
          onClick={onRetest}
          className="w-full rounded-xl border border-neutral-800 py-3.5 text-sm font-semibold text-neutral-400 transition-colors hover:border-neutral-600 hover:text-white"
        >
          Run test again
        </button>
      </section>
    </div>
  )
}
