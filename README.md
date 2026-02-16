# Superteam Academy — Learning Management System dApp

A Solana-powered Learning Management System for Superteam Brazil, enabling decentralized education with on-chain credentials and token-gated access.

## Features

- 🎓 **Course Management** — Create, organize, and publish courses with modules and lessons
- 📜 **On-Chain Certificates** — NFT-based completion certificates (compressed NFTs via Metaplex Bubblegum)
- 🔐 **Token-Gated Access** — Gate courses by SPL token holdings or NFT ownership
- 📊 **Progress Tracking** — Track learner progress with on-chain checkpoints
- 👥 **Roles** — Admin, Instructor, Student with Solana wallet auth
- 🏆 **Leaderboard** — Points and rankings for community engagement
- 🌐 **Multilingual** — Portuguese (BR) + English

## Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **@solana/wallet-adapter** for wallet connection
- **React Query** for data fetching

### Backend
- **Next.js API Routes** (serverless)
- **PostgreSQL** (Supabase) for off-chain data
- **Prisma ORM**
- **Anchor** programs for on-chain logic

### Blockchain
- **Solana** (devnet → mainnet)
- **Anchor Framework** for smart contracts
- **Metaplex Bubblegum** for compressed NFT certificates
- **SPL Tokens** for rewards/gating

## Architecture

```
┌─────────────────────────────────────────────┐
│              Next.js Frontend                │
│  (Courses, Dashboard, Certificates, Admin)  │
└──────────────────┬──────────────────────────┘
                   │
         ┌─────────┴─────────┐
         │   API Routes       │
         │  (REST + tRPC)     │
         └────┬──────────┬────┘
              │          │
    ┌─────────┘          └──────────┐
    │  Supabase/PostgreSQL          │  Solana RPC
    │  (courses, users,             │  (certificates,
    │   progress, content)          │   token gates,
    │                               │   checkpoints)
    └───────────────────────────────┘
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages (connect wallet)
│   ├── (dashboard)/       # Student dashboard
│   ├── (admin)/           # Admin/instructor pages
│   ├── courses/           # Course catalog & viewer
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── course/           # Course-specific components
│   ├── wallet/           # Wallet connection
│   └── layout/           # Layout components
├── lib/                   # Utilities
│   ├── solana/           # Solana client helpers
│   ├── db/               # Prisma client
│   └── auth/             # Auth helpers
├── programs/              # Anchor smart contracts
│   └── superteam-academy/
└── prisma/               # Database schema
```

## Smart Contract

The Anchor program handles:
- Certificate minting (compressed NFTs)
- Course registration checkpoints
- Token-gated access verification
- Instructor authorization

## License

MIT
