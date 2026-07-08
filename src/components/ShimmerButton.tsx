import type { ReactNode } from 'react'

interface ShimmerButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
  testId?: string
}

export function ShimmerButton({
  children,
  onClick,
  type = 'button',
  className = '',
  testId,
}: ShimmerButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      data-testid={testId}
      className={`btn-shimmer group relative overflow-hidden ${className}`}
    >
      <span className="btn-shimmer__track" aria-hidden>
        <span className="btn-shimmer__beam" />
      </span>
      <span className="relative z-10">{children}</span>
    </button>
  )
}
