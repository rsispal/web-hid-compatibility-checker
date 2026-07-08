import { useState } from 'react'
import type { TestResults } from '../types'
import { copyToClipboard, formatShareText } from '../utils/shareText'
import { ShimmerButton } from './ShimmerButton'

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
    <div className="flex flex-col items-center gap-3">
      <p className="text-center text-sm font-medium text-neutral-400">
        Send us your results so we can help
      </p>
      <ShimmerButton
        onClick={handleCopy}
        testId="copy-share-button"
        className="copy-cta w-full rounded-2xl border-2 border-white bg-white px-8 py-6 text-black transition-transform duration-300 active:scale-[0.99]"
      >
        <span className="flex flex-col items-center gap-1.5">
          {copied ? (
            <>
              <span className="flex items-center gap-2 text-xl font-black tracking-tight">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </span>
              <span className="text-sm font-semibold text-neutral-600">
                Now paste into your email and send
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-2 text-xl font-black tracking-tight">
                Copy results &amp; email us
                <svg
                  className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
              <span className="text-sm font-semibold text-neutral-600">
                Tap here → paste into your message
              </span>
            </>
          )}
        </span>
      </ShimmerButton>
    </div>
  )
}
