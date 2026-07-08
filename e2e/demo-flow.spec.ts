import { expect, test } from '@playwright/test'

/**
 * Slow, deliberate walkthrough recorded as video proof of the full UI flow.
 * Playwright saves video to test-results/ on completion.
 */
test('record full compatibility check demo', async ({ page }) => {
  test.slow()

  await page.goto('/')
  await page.waitForTimeout(1200)

  await expect(page.getByTestId('landing-screen')).toBeVisible()
  await expect(page.getByTestId('run-test-button')).toBeVisible()
  await page.waitForTimeout(1500)

  await page.getByTestId('run-test-button').click()
  await expect(page.getByTestId('loading-screen')).toBeVisible({ timeout: 5000 })
  await page.waitForTimeout(2000)

  await expect(page.getByTestId('results-screen')).toBeVisible({ timeout: 15000 })
  await page.waitForTimeout(1000)

  const icons = page.locator('[data-testid^="status-icon-"]')
  await expect(icons).toHaveCount(3)

  for (let index = 0; index < 3; index++) {
    const icon = icons.nth(index)
    await icon.scrollIntoViewIfNeeded()
    await expect(icon).toBeVisible()
    await expect(icon.locator('svg path').first()).toBeVisible()
    await page.waitForTimeout(800)
  }

  await page.getByText('Browser Information').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1000)

  const copyButton = page.getByTestId('copy-share-button')
  await copyButton.scrollIntoViewIfNeeded()
  await expect(copyButton).toBeVisible()
  await page.waitForTimeout(1500)
})
