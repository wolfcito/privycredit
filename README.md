# PrivyCredit

PrivyCredit is a zero-knowledge credit proof experience that lets people demonstrate lending readiness without exposing raw financial data. The app guides users through wallet connection, proof generation, improvement tips, and lender-facing verification, anchoring attestations on Scroll while persisting metadata in Supabase.

## Core Features
- **Privacy-preserving proofs**: Wallet analysis outputs banded credit signals (A/B/C) that can be shared without leaking PII.
- **Verifier Gate**: Lenders validate proofs via on-chain contract reads plus Supabase share tokens.
- **Improvement checklist**: Actionable recommendations keep users engaged even when they fall short.
- **Scroll anchoring**: Proof IDs, commitments, and factor bands are stored in `submitProof` for immutability.

## Architecture Overview
| Layer | Tech |
| --- | --- |
| UI | React 18 + TypeScript + Vite, Tailwind CSS, Lucide icons |
| State/Web3 | React Context, custom wallet + viem clients |
| Data | Supabase Postgres (proofs, improvements, reminders) |
| Chain | Scroll Sepolia smart contract (`0x99E36C7D…8A7`) |

Project layout highlights:
- `src/main.tsx` bootstraps the SPA.
- `src/App.tsx` controls routing between Connect, Generate, Result, Share, Verifier, Simulator, and Reminders screens.
- `src/components/` houses composable UI blocks; `src/context/` includes `useApp`/wallet providers; `src/lib/` centralizes viem helpers; `src/types/` stores shared contracts.
- `supabase/migrations/` tracks schema evolution; root docs (`PRD.md`, `BLOCKCHAIN_INTEGRATION.md`, `DESIGN_SYSTEM.md`, `AGENTS.md`) describe product, chain, UI, and contributor guidance.

## Getting Started
1. **Prereqs**: Node 20+, npm 10+, Git, and a Scroll-compatible wallet (MetaMask recommended).
2. **Install**:
   ```bash
   npm install
   cp .env.example .env.local   # create if it does not exist
   ```
3. **Configure** `.env.local` (all keys must start with `VITE_`):
   ```
   VITE_RPC_URL=https://sepolia-rpc.scroll.io
   VITE_CONTRACT_ADDRESS=0x99E36C7D9a01d10E9bb7A40870b7580a2A88E8A7
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   ```
4. **Run locally**: `npm run dev` (http://localhost:5173).

## Build, Test, and Quality Checks
- `npm run dev` – Vite dev server with HMR.
- `npm run build` – Production bundle (drops to `dist/`).
- `npm run preview` – Serves the build locally.
- `npm run lint` – ESLint (React, hooks, TypeScript rules).
- `npm run typecheck` – `tsc --noEmit` via `tsconfig.app.json`.

Automated tests are not yet committed; prefer Vitest + React Testing Library for new flows. When adding specs, mirror `ComponentName.test.tsx` colocated with components or under `src/__tests__/`. Regardless of test coverage, run lint + typecheck before committing to ensure the CI baseline remains green.

## Supabase & Blockchain Integration
- Run migrations with the Supabase CLI or dashboard (`supabase db push`) before booting the frontend. Schema tables include `proofs`, `improvements`, and `reminders` with RLS enabled.
- Keep `BLOCKCHAIN_INTEGRATION.md` updated whenever contract addresses or RPC endpoints change.
- The frontend interacts with Scroll using viem’s `publicClient` and `walletClient`; ensure wallets connect to the Scroll Sepolia chain ID `534351/534352` depending on the environment noted in the blockchain doc.
- Sensitive material (Supabase service keys, wallet mnemonics) must stay outside source control; rely on `.env.local` and secrets managers.

## Troubleshooting
- **Wallet fails to connect**: Confirm the wallet network matches Scroll and that `VITE_RPC_URL` points to a reachable RPC.
- **Proof submission stuck**: Inspect browser devtools; the contract call should emit `submitProof`. Re-run with `npm run dev -- --host` if accessing from LAN devices.
- **Supabase errors**: Verify RLS policies permit the logged-in wallet or service role; reapply migrations if tables are missing.

## Contributing
- Follow the short, imperative commit style visible in `git log` (e.g., `Update Landing`, `Add PRD.md`). Prefix with scope (`ui:`, `supabase:`) when helpful.
- Every PR should describe user-impacting changes, list commands executed (dev/lint/typecheck/tests), attach UI screenshots for visual changes, and reference Supabase migration IDs or tickets.
- See `AGENTS.md` for deeper contributor guidance on style, testing philosophy, and security expectations.
