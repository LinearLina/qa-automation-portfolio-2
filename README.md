# QA Automation Framework — SauceDemo

End-to-end test automation framework built with Playwright and TypeScript, 
testing the SauceDemo e-commerce demo site.

## Why Playwright over Selenium
Chose Playwright for auto-waiting (no manual sleep/wait calls), built-in 
parallel execution, native TypeScript support, and trace viewer for debugging 
failures without reproducing them locally.

## Tech Stack
- TypeScript
- Playwright Test
- GitHub Actions (CI/CD)
- Page Object Model architecture

## What's Covered
- Login flow (valid, invalid, locked-out user)
- Cart functionality
- Product sorting (data-driven tests)
- Visual regression testing

## How to Run
\`\`\`
npm install
npx playwright test
npx playwright show-report
\`\`\`

## Project Structure
\`\`\`
tests/      - test specs
pages/      - Page Object Model classes
\`\`\`

## What I'd Add With More Time
- API-layer tests using Playwright's request context
- Accessibility checks with axe-core
- Load testing with k6

## Notes on Testing Philosophy
This project includes a small read-only smoke suite against a live production 
site (cloudflare.com) - homepage load, accessibility scan, visual regression, 
and link checking - plus API-layer tests against a public networking API 
(ipify). Both were chosen to reflect infrastructure/networking-focused testing, 
since reliability failures in that space are often invisible until they 
become expensive.