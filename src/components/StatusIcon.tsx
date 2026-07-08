import { useEffect, useState } from 'react'
import type { ApiStatus } from '../types'
import { LottieAnimation } from './LottieAnimation'

const ANIMATION_MAP: Record<ApiStatus, string> = {
  supported: '/lottie/success.json',
  unsupported: '/lottie/error.json',
  warning: '/lottie/warning.json',
}

interface StatusIconProps {
  status: ApiStatus
  size?: number
}

export function StatusIcon({ status, size = 48 }: StatusIconProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch(ANIMATION_MAP[status])
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAnimationData(data)
      })
      .catch(() => {
        if (!cancelled) setAnimationData(null)
      })

    return () => {
      cancelled = true
    }
  }, [status])

  if (!animationData) {
    return (
      <div
        className="shrink-0 rounded-full bg-neutral-800"
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <div className="shrink-0" style={{ width: size, height: size }}>
      <LottieAnimation animationData={animationData} loop={false} />
    </div>
  )
}
