# BENKO

### The Pump.fun trading research agent on Solana

BENKO is a lightweight, runnable foundation for a Pump.fun trading agent: market-snapshot analysis, risk filtering, readable decisions and non-executable trade previews.

**Current release: deterministic research + dry-run. Not a connected trading bot.** No wallet was supplied, no tokens were bought, no profits are claimed, and real submission is explicitly blocked.

## Quick start

Node.js 20 or newer. No npm install required.

```sh
npm test
npm run demo
npm run trade:preview
npm run analyze -- ./data/market.example.json
```

The demo and preview use explicitly fictional data and pin the evaluation clock to its observation time. Analyze uses the real clock, so the bundled old fixture will be rejected as stale. Generated records are saved under outputs/ with unique IDs.

`npm run live` deliberately exits with an error. An environment variable cannot enable it.

## What BENKO checks

- Snapshot freshness and explicit provenance/sample fields.
- SOL quote and known Pump/PumpSwap venue labels.
- Minimum liquidity and maximum holder concentration.
- Buy/sell activity ratio and minimum trade count.
- Requested order and total exposure limits.
- Invalid, negative or non-finite values and invalid configuration.

These inputs are a research schema, not a verified representation of an onchain pool. `liquiditySol` must eventually be defined by a chain-aware adapter, not guessed from virtual reserves. The buy ratio is an observation, not a prediction or calibrated confidence score.

## Decisions

**WATCH**: valid fictional research input, with a momentum explanation; never executable.
**REJECT**: malformed, stale, risky, unsupported or unverified external input.

External snapshots currently fail closed because their provenance cannot be authenticated. Both decision types remain `executable: false` and `submitted: false`.

## Structure

- config/default.json — research limits and unconfigured wallet
- data/market.example.json — labeled fictional fixture
- src/policy.mjs — validation and risk rules
- src/decision.mjs — decision and preview models
- src/adapters/pumpfun.mjs — explicitly disabled live boundary
- src/storage.mjs — unique local JSON records
- src/index.mjs — CLI
- tests/ — boundary tests
- docs/ — integration, risk and output guidance

## Road to execution

Use the official Pump documentation and current verified IDLs/SDKs. Support both curve and migrated-pool routing; verify quote mint, program owner, fees, slippage, token units and migration state. Add a secure local signer only after transaction inspection, spend limits, explicit authorization and confirmation/reconciliation tests exist. See docs/INTEGRATION.md.

No private key, seed, RPC token or wallet from another project is included. `.env.example` lists a future RPC variable only; this release does not load it or contact a provider.

This scaffold does not include token discovery, live market streaming, real transaction construction, sell-position management, AI inference or backtested strategy performance. Memecoins can lose all value; this is software, not investment advice.
