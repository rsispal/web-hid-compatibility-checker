import { expect, test } from '@playwright/test'

async function runFullTestFlow(page: import('@playwright/test').Page) {
  await page.goto('/')

  await expect(page.getByTestId('landing-screen')).toBeVisible()
  await expect(page.getByTestId('run-test-button')).toBeVisible()

  await page.getByTestId('run-test-button').click()

  await expect(page.getByTestId('loading-screen')).toBeVisible({ timeout: 5000 })
  await expect(page.getByText('Checking your browser')).toBeVisible()

  await expect(page.getByTestId('results-screen')).toBeVisible({ timeout: 15000 })
  await expect(page.getByText(/of 3 connections work/)).toBeVisible()
}

test.describe('Web API Compatibility Checker', () => {
  test('completes the full landing → loading → results flow', async ({ page }) => {
    await runFullTestFlow(page)

    await expect(page.getByTestId('api-result-web-usb')).toBeVisible()
    await expect(page.getByTestId('api-result-web-serial')).toBeVisible()
    await expect(page.getByTestId('api-result-web-bluetooth')).toBeVisible()
  })

  test('shows visible status icons for each API result', async ({ page }) => {
    await runFullTestFlow(page)

    for (const status of ['supported', 'unsupported', 'warning'] as const) {
      const icons = page.getByTestId(`status-icon-${status}`)
      const count = await icons.count()

      if (count === 0) continue

      for (let index = 0; index < count; index++) {
        const icon = icons.nth(index)
        await expect(icon).toBeVisible()

        const box = await icon.boundingBox()
        expect(box?.width).toBeGreaterThan(40)
        expect(box?.height).toBeGreaterThan(40)

        const svgPath = icon.locator('svg path').first()
        await expect(svgPath).toBeVisible()
      }
    }

    const allIcons = page.locator('[data-testid^="status-icon-"]')
    await expect(allIcons).toHaveCount(3)

    for (let index = 0; index < 3; index++) {
      await expect(allIcons.nth(index)).toBeVisible()
      await expect(allIcons.nth(index).locator('svg')).toBeVisible()
    }
  })

  test('displays browser information table', async ({ page }) => {
    await runFullTestFlow(page)

    await expect(page.getByText('Browser Information')).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Brand' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Operating System' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Browser' })).toBeVisible()
    await expect(page.getByRole('cell', { name: 'Version' })).toBeVisible()
  })

  test('copy report button is visible and clickable', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])
    await runFullTestFlow(page)

    const copyButton = page.getByTestId('copy-share-button')
    await expect(copyButton).toBeVisible()
    await copyButton.click()
    await expect(copyButton).toContainText(/copied!/i)
  })

  test('primary buttons include a visible shimmer sweep', async ({ page }) => {
    await page.goto('/')

    const landingButton = page.getByTestId('run-test-button')
    await expect(landingButton).toBeVisible()
    await expect(landingButton.locator('.btn-shimmer__beam')).toBeAttached()

    await landingButton.click()
    await expect(page.getByTestId('results-screen')).toBeVisible({ timeout: 15000 })

    const copyButton = page.getByTestId('copy-share-button')
    await expect(copyButton).toBeVisible()
    await expect(copyButton.locator('.btn-shimmer__beam')).toBeAttached()
  })

  test('run test again returns to landing screen', async ({ page }) => {
    await runFullTestFlow(page)

    await page.getByRole('button', { name: /check again/i }).click()
    await expect(page.getByTestId('landing-screen')).toBeVisible()
    await expect(page.getByTestId('run-test-button')).toBeVisible()
  })
})
