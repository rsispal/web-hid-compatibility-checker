import type { ApiStatus } from '../types'

interface StatusIconProps {
  status: ApiStatus
  size?: number
}

const ICON_CONFIG: Record<
  ApiStatus,
  { label: string; ring: string; icon: string; iconClass: string }
> = {
  supported: {
    label: 'Supported',
    ring: 'border-white/30 bg-white/5',
    icon: 'text-white',
    iconClass: 'status-pop',
  },
  warning: {
    label: 'Partial support',
    ring: 'border-neutral-500/40 bg-neutral-500/10',
    icon: 'text-neutral-200',
    iconClass: 'status-pop',
  },
  unsupported: {
    label: 'Not supported',
    ring: 'border-neutral-700 bg-neutral-900',
    icon: 'text-neutral-500',
    iconClass: 'status-pop',
  },
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path
        d="M6 12.5L10 16.5L18 8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="status-draw"
      />
    </svg>
  )
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path
        d="M8 8L16 16M16 8L8 16"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="status-draw"
      />
    </svg>
  )
}

function WarningIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
      <path
        d="M12 4L20 19H4L12 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        className="status-draw"
      />
      <path
        d="M12 10V14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="status-pop"
      />
      <circle cx="12" cy="17" r="1" fill="currentColor" className="status-pop" />
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
      className={`relative flex shrink-0 items-center justify-center rounded-full border-2 ${config.ring}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={config.label}
    >
      <span className={`${config.icon} ${config.iconClass}`}>
        <Icon />
      </span>
      {status === 'supported' && (
        <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-white/20 status-ring" />
      )}
    </div>
  )
}
