# Web API Compatibility Checker

A sleek, dark-mode Vite app that tests whether your browser supports **Web USB**, **Web Serial**, and **Web Bluetooth**.

## Features

- Landing screen with a single action to run the test
- Animated loading phase while APIs are probed on `window.navigator`
- Results with Lottie status icons (success, warning, error)
- Browser information table (brand, OS, browser, version)
- One-click **Copy report to share** for emailing results

## Stack

- [Vite](https://vitejs.dev/) + React + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4
- [Lottie](https://lottiefiles.com/) animations via `lottie-react`
- [ua-parser-js](https://github.com/faisalman/ua-parser-js) for browser detection

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

This project is configured for zero-config Vercel deployment. Connect the repository and Vercel will detect Vite automatically.
