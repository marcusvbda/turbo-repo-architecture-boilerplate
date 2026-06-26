# Project Overview

<!-- orientations here -->

# Architecture

<!-- orientations here -->

# Development Workflow

## Commands

<!-- commands here -->

## Running a single app

<!-- commands here -->

# Coding Conventions

## Library and Implementation Preferences

- **Always prefer existing, established implementations over writing from scratch** — reuse framework built-ins, community packages, and already-componentized solutions to reduce code surface and bugs
- **External libraries must be consolidated and widely trusted** — no experimental, unmaintained, or niche packages; prefer the official/canonical library for each concern (e.g. `@nestjs/swagger` not a random swagger lib)
- **Framework and language defaults come first** — always use the pattern the framework recommends before reaching for a third-party alternative
- **Never add a library for something the language already handles natively:**
  - HTTP requests → `fetch` (never `axios`, `got`, `ky`, etc.)
  - UUID → `crypto.randomUUID()` (never `uuid` package)
  - Date formatting → `Intl.DateTimeFormat` (never `moment`, prefer `date-fns` only if complexity warrants)
  - Deep clone → `structuredClone()` (never `lodash.cloneDeep` for this alone)
  - Environment variables → `process.env` directly (never `dotenv` unless the runtime requires it)

# Key Decisions / Constraints

- All text in docs, variable names, file names, database table/column names, and CSS classes must be in English — no Portuguese

# Environment Setup

<!-- orientations here -->

# What NOT to Do

- **NEVER commit anything without being explicitly asked by the user** — not during automated workflows, not at the end of tasks, never
- **NEVER create git branches** without being explicitly asked
- Do not run `git commit`, `git push`, or `git checkout -b` on your own initiative

