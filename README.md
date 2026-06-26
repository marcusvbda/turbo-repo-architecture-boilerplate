# Turbo Repo Boilerplate

Monorepo with [Turborepo](https://turbo.build), [Next.js](https://nextjs.org) and [NestJS](https://nestjs.com).

## Apps

| App | Description |
|-----|-------------|
| `apps/web` | Next.js frontend |
| `apps/api` | NestJS API |

## Requirements

- Node.js >= 20
- pnpm >= 9

## Setup

```bash
pnpm install
```

Copy the environment file and fill in the values:

```bash
cp .env.example .env
```

## Running

```bash
# All apps in parallel
pnpm dev

# Single app
pnpm --filter @repo/web dev
pnpm --filter @repo/api dev
```

## Other commands

```bash
pnpm build       # build all apps
pnpm lint        # lint all apps
pnpm typecheck   # type-check all apps
```
