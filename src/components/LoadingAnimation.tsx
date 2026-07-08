import { useEffect, useState } from 'react'
import { LottieAnimation } from './LottieAnimation'

export function LoadingAnimation() {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    fetch('/lottie/loading.json')
      .then((res) => res.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null))
  }, [])

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="h-24 w-24">
        {animationData ? (
          <LottieAnimation animationData={animationData} loop />
        ) : (
          <div className="h-full w-full animate-spin rounded-full border-2 border-neutral-700 border-t-white" />
        )}
      </div>
      <div className="text-center">
        <p className="text-xl font-bold tracking-tight text-white">
          Checking your browser…
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          Looking at USB, serial, and Bluetooth support
        </p>
      </div>
    </div>
  )
}
