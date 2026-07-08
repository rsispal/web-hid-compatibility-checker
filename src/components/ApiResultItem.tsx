import type { ApiCheckResult } from '../types'
import { statusLabel } from '../utils/apiCheck'
import { StatusIcon } from './StatusIcon'

interface ApiResultItemProps {
  result: ApiCheckResult
  index: number
}

const STATUS_STYLES = {
  supported: 'text-white',
  warning: 'text-neutral-300',
  unsupported: 'text-neutral-500',
} as const

export function ApiResultItem({ result, index }: ApiResultItemProps) {
  return (
    <li
      data-testid={`api-result-${result.id}`}
      className="animate-fade-in-delayed flex items-start gap-4 rounded-xl border border-neutral-800 bg-neutral-950/60 p-5 backdrop-blur-sm"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <StatusIcon status={result.status} size={52} />
      <div className="min-w-0 flex-1 pt-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-lg font-bold tracking-tight text-white">
            {result.name}
          </h3>
          <span
            className={`text-xs font-semibold uppercase tracking-widest ${STATUS_STYLES[result.status]}`}
          >
            {statusLabel(result.status)}
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-400">
          {result.message}
        </p>
      </div>
    </li>
  )
}
