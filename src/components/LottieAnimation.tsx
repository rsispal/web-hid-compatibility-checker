import { Component, type ReactNode } from 'react'
import Lottie from 'lottie-react'

interface LottieAnimationProps {
  animationData: object
  loop?: boolean
  className?: string
}

interface ErrorBoundaryState {
  hasError: boolean
}

class LottieErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

export function LottieAnimation({
  animationData,
  loop = false,
  className,
}: LottieAnimationProps) {
  return (
    <LottieErrorBoundary
      fallback={<div className={`rounded-full bg-neutral-800 ${className ?? ''}`} />}
    >
      <Lottie animationData={animationData} loop={loop} className={className} />
    </LottieErrorBoundary>
  )
}
