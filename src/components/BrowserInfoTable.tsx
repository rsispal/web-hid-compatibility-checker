import type { BrowserInfo } from '../types'

interface BrowserInfoTableProps {
  browser: BrowserInfo
}

const ROWS: { label: string; key: keyof BrowserInfo }[] = [
  { label: 'Brand', key: 'brand' },
  { label: 'Operating System', key: 'os' },
  { label: 'Browser', key: 'browserName' },
  { label: 'Version', key: 'version' },
]

export function BrowserInfoTable({ browser }: BrowserInfoTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/80">
      <div className="border-b border-neutral-800 px-5 py-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
          Browser Information
        </h3>
      </div>
      <table className="w-full text-left text-sm">
        <tbody>
          {ROWS.map(({ label, key }, index) => (
            <tr
              key={key}
              className={index < ROWS.length - 1 ? 'border-b border-neutral-900' : ''}
            >
              <td className="px-5 py-3.5 font-medium text-neutral-500 whitespace-nowrap">
                {label}
              </td>
              <td className="px-5 py-3.5 font-semibold text-white">
                {String(browser[key])}
              </td>
            </tr>
          ))}
          <tr className="border-t border-neutral-900">
            <td className="px-5 py-3.5 font-medium text-neutral-500">Secure Context</td>
            <td className="px-5 py-3.5">
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                  browser.isSecureContext
                    ? 'border-neutral-600 bg-neutral-900 text-white'
                    : 'border-neutral-700 bg-neutral-950 text-neutral-400'
                }`}
              >
                {browser.isSecureContext ? 'HTTPS' : 'Not Secure'}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
