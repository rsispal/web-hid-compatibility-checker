import type { ApiStatus } from '../types'

interface StatusIconProps {
  status: ApiStatus
  size?: number
}

const ICON_CONFIG: Record<
  ApiStatus,
  { label: string; ring: string; icon: string }
> = {
  supported: {
    label: 'Works',
    ring: 'border-white/40 bg-white/10',
    icon: 'text-white',
  },
  warning: {
    label: 'Limited support',
    ring: 'border-neutral-400/50 bg-neutral-500/15',
    icon: 'text-neutral-100',
  },
  unsupported: {
    label: 'Unavailable',
    ring: 'border-neutral-600 bg-neutral-900',
    icon: 'text-neutral-400',
  },
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
      <path
        d="M6 12.5L10 16.5L18 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
      <path
        d="M8 8L16 16M16 8L8 16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
      <path
        d="M12 4L20 19H4L12 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 10V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="17" r="1.25" fill="currentColor" />
    </svg>
  )
}

const ICONS = {
  supported: CheckIcon,
  unsupported: CrossIcon,
  warning: WarningIcon,
} as const

export function StatusIcon({ status, size = 52 }: StatusIconProps) {
  const config = ICON_CONFIG[status]
  const Icon = ICONS[status]

  return (
    <div
      data-testid={`status-icon-${status}`}
      className={`status-icon relative flex shrink-0 items-center justify-center rounded-full border-2 ${config.ring}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={config.label}
    >
      <span className={config.icon}>
        <Icon />
      </span>
    </div>
  )
}
