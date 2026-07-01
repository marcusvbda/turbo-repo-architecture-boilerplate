# Project Overview

Turborepo monorepo boilerplate with a Next.js 16 frontend (`apps/web`) and a NestJS 11 backend (`apps/api`), sharing TypeScript configs and ESLint rules via packages. pnpm workspaces, Node ≥ 20, pnpm 9.15.0.

# Architecture

```text
turbo-repo-architecture-boilerplate/
├── apps/
│   ├── web/          # Next.js 16, React 19, Tailwind CSS 4, App Router
│   └── api/          # NestJS 11, TypeORM, PostgreSQL, JWT auth, Swagger
├── packages/
│   ├── types/        # Shared TypeScript types (import from @repo/types)
│   ├── tsconfig/     # base.json | nextjs.json | nestjs.json
│   └── eslint-config/# Shared ESLint + Prettier rules (@repo/eslint-config)
```

**Web** (`apps/web/src/`):

- `app/` — Next.js App Router pages and layouts
- `features/<name>/actions.ts` — server actions per feature (SDD pattern)
- `components/ui/` — reusable UI components
- `libs/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `proxy.ts` — Next.js middleware for auth / session refresh

**API** (`apps/api/src/`):

- Feature modules: `auth/`, `users/`
- Each module: `*.module.ts`, `*.controller.ts`, `*.service.ts`, `dto/`, `*.entity.ts`
- Swagger docs at `/docs`
- Auth: JWT + PostgreSQL tokenVersion for logout invalidation; password hashing via native `crypto.scrypt`

**Shared types**: add domain models and API response types to `packages/types/src/index.ts` and import as `@repo/types`.

# Development Workflow

## Commands

```bash
pnpm dev          # run all apps in parallel
pnpm build        # build all apps (respects dependency order)
pnpm lint         # lint all apps
pnpm typecheck    # type-check all apps
```

## Running a single app

```bash
pnpm --filter @repo/web dev        # Next.js → localhost:3000
pnpm --filter @repo/api dev        # NestJS  → localhost:3001, Swagger at /docs

pnpm --filter @repo/web build
pnpm --filter @repo/api build

pnpm --filter @repo/api test       # Jest (rootDir: src)
```

## Environment setup

Copy `.env.example` to `.env` and fill in:

```bash
# Web
API_URL=http://localhost:3001
SESSION_KEY=session_key_name

# API
PORT=3001
DATABASE_URL=postgresql://postgres:PASSWORD@127.0.0.1:5432/postgres
JWT_SECRET=change-me-in-production
JWT_EXPIRES_IN=7d
```

# Coding Conventions

## Shared (applies to both apps)

- **Always prefer existing, established implementations over writing from scratch**
- **External libraries must be consolidated and widely trusted** — no experimental, unmaintained, or niche packages
- **Framework and language defaults come first** — use what the framework recommends before reaching for a third-party alternative
- **Never add a library for something the language already handles natively:**
  - HTTP requests → `fetch` (never `axios`, `got`, `ky`, etc.)
  - UUID → `crypto.randomUUID()` (never `uuid` package)
  - Date formatting → `Intl.DateTimeFormat` (never `moment`, prefer `date-fns` only if complexity warrants)
  - Deep clone → `structuredClone()` (never `lodash.cloneDeep` for this alone)
  - Environment variables → `process.env` directly (never `dotenv` unless the runtime requires it)

## Web (`apps/web`)

### Data Fetching — React Query

- All fetches must go through React Query (`useQuery`). Never use `useEffect` + `useState` to fetch data.
- All mutations (POST, PUT, PATCH, DELETE) must use `useMutation`. Never call fetch directly inside event handlers without a mutation.
- Loading state priority order — use the first that covers the case:
  1. `isPending` from `useMutation` — covers the request itself
  2. `useTransition()` — covers router navigation / async transitions after the mutation
  3. `useState` — only if neither above applies (rare, document why)

```tsx
// request loading
const { mutate, isPending } = useMutation({ mutationFn: createUser })

// request + navigation loading
const [isRedirecting, startTransition] = useTransition()
const { mutate, isPending } = useMutation({
  mutationFn: login,
  onSuccess: () => startTransition(() => router.push('/')),
})
const isLoading = isPending || isRedirecting

// wrong
const [isLoading, setIsLoading] = useState(false)
```

### Form Validation — Zod

- Validate all forms with Zod. Define the schema first, infer the type from it.
- Use `react-hook-form` + `@hookform/resolvers/zod` for form state.

```tsx
const schema = z.object({ email: z.string().email(), password: z.string().min(8) })
type FormData = z.infer<typeof schema>
```

### Memoization — useMemo / useCallback

- Do **not** add `useMemo` or `useCallback` by default. The React compiler handles this automatically.
- Only use them when there is a measured performance problem or a specific referential-equality requirement (e.g. a stable callback passed to a third-party lib that uses `===` comparison).

### Styling

- Tailwind CSS v4 with `@theme` syntax
- Compose classes with the `cn()` helper from `@/libs/utils`
- Variant-based props over runtime style objects

### React types

- Import React types explicitly: `import { ReactNode } from 'react'`. Never reference them via the `React.` namespace (no `React.ReactNode`, `React.FC`, etc.)

## API (`apps/api`)

### Module structure

- One module per feature: `feature.module.ts`, `feature.controller.ts`, `feature.service.ts`
- DTOs in `dto/` with `@ApiProperty` decorators
- Entities in `feature.entity.ts` with TypeORM decorators
- Guards via `@UseGuards(JwtAuthGuard)` — never inline auth logic in controllers

### Validation

- Validate request bodies with class-validator DTOs, not manual checks in controllers or services

# Architecture Patterns

## Server-Driven Design (SDD)

- **Feature folder:** all server-side logic lives in `features/<feature>/actions.ts` with `'use server'`
- **No Next.js API routes** for internal operations — use server actions instead
- Server actions call the NestJS backend directly using the private `API_URL` env var
- Client components import actions and call them via `useMutation` — never `fetch` the backend directly from the browser
- `NEXT_PUBLIC_*` env vars must never hold secrets or tokens

## Security

- **JWT never reaches the browser:** access tokens are stored only in httpOnly cookies (set by server actions or middleware) and read only in server-side code
- **No credentials in source code:** every secret (JWT secret, DB URL, API keys) lives in `.env` which is gitignored
- **Always maintain `.env.example`** with realistic but mocked/placeholder values for every key in `.env` — this is the contract for new developers
- Never log, print, or return tokens/passwords in responses

# Key Decisions / Constraints

- All text in docs, variable names, file names, database table/column names, and CSS classes must be in English — no Portuguese
- Password hashing uses native `crypto.scrypt` — do not replace with bcrypt or argon2
- JWT logout is implemented via `tokenVersion` on the user entity — incrementing it invalidates all existing tokens

# Agentic Workflow

## Subagent preference

- When executing multi-step implementation plans, always prefer **subagent-driven development**: dispatch a fresh implementer subagent per task, review between tasks, final whole-branch review at the end
- Use the `superpowers:subagent-driven-development` skill

## Cleanup after plan execution

After all tasks in a plan are complete, delete the temporary files that were created during execution:

- `.superpowers/sdd/task-N-brief.md` and `.superpowers/sdd/task-N-report.md` for each task N
- `.superpowers/sdd/progress.md`
- `docs/superpowers/plans/<plan-file>.md`

This keeps the repo clean — plan and task files are ephemeral scaffolding, not permanent documentation.

# What NOT to Do

- **NEVER commit anything without being explicitly asked by the user** — not during automated workflows, not at the end of tasks, never
- **NEVER create git branches** without being explicitly asked
- Do not run `git commit`, `git push`, or `git checkout -b` on your own initiative
- Do not use `useState` for loading/error state that React Query already tracks
- Do not add `useMemo`/`useCallback` preemptively — measure first
- Do not bypass the Zod schema to cast types manually (no `as FormData`)
- Do not inline auth logic in controllers — always use guards
- Do not put secrets or tokens in source code — always `.env` + `.env.example`
- Do not expose JWT tokens to client-side JavaScript — httpOnly cookies only
- Do not use `React.ReactNode` or other `React.*` type references — import the type directly from `react` instead
