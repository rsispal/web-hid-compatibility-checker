import { useState } from 'react'
import type { TestResults } from '../types'
import { copyToClipboard, formatShareText } from '../utils/shareText'

interface CopyShareButtonProps {
  results: TestResults
}

export function CopyShareButton({ results }: CopyShareButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const text = formatShareText(results)
    const success = await copyToClipboard(text)

    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group relative w-full overflow-hidden rounded-2xl border border-neutral-700 bg-white px-8 py-5 text-lg font-bold tracking-tight text-black transition-all duration-300 hover:border-white hover:shadow-[0_0_40px_rgba(255,255,255,0.12)] active:scale-[0.99]"
    >
      <span className="relative z-10 flex items-center justify-center gap-3">
        {copied ? (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Copied to clipboard
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            Copy report to share
          </>
        )}
      </span>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-neutral-200/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
    </button>
  )
}
