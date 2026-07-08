interface LandingScreenProps {
  onStart: () => void
  isExiting: boolean
}

export function LandingScreen({ onStart, isExiting }: LandingScreenProps) {
  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center px-6 transition-all duration-700 ${
        isExiting ? 'pointer-events-none scale-[0.98] opacity-0' : 'opacity-100'
      }`}
    >
      <div className="mx-auto w-full max-w-xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            Browser API Scanner
          </span>
        </div>

        <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl">
          Can your browser
          <span className="block text-neutral-500">talk to hardware?</span>
        </h1>

        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-neutral-400 sm:text-lg">
          Instantly check whether your browser supports Web USB, Web Serial, and
          Web Bluetooth — the APIs that connect the web to real-world devices.
        </p>

        <button
          type="button"
          onClick={onStart}
          className="pulse-glow mt-10 w-full max-w-sm rounded-2xl border border-neutral-700 bg-white px-10 py-5 text-lg font-bold tracking-tight text-black transition-all duration-300 hover:border-white hover:shadow-[0_0_48px_rgba(255,255,255,0.15)] active:scale-[0.98] sm:w-auto"
        >
          Run compatibility test
        </button>

        <p className="mt-6 text-xs text-neutral-600">
          No permissions requested · Results stay on your device
        </p>
      </div>
    </div>
  )
}
