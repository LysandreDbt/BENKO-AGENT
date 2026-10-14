# Pump.fun integration boundary

Official source inspected: https://github.com/pump-fun/pump-public-docs
Raw overview: https://raw.githubusercontent.com/pump-fun/pump-public-docs/main/README.md

The upstream overview describes evolving curve and PumpSwap interfaces, multiple quote-asset paths, fees and migration behavior. BENKO does not hardcode an API contract from those announcements and does not assume every token is SOL-paired. This release intentionally restricts its research schema to SOL and performs no RPC request.

Before live integration:
1. Pin and inspect the official IDL/SDK version and deployed program identities.
2. Decode actual token, curve/pool and quote accounts; verify owners and decimals.
3. Distinguish virtual pricing reserves from available liquidity, and account for fees using the relevant instruction version.
4. Resolve curve completion/migration before choosing a venue. A missing account is not proof that a token is tradable elsewhere.
5. Build exact integer-unit transactions, check destination accounts and enforce minimum output, expiry and maximum spend including rent/tips/fees.
6. Keep signing local and secrets outside records or source control.
7. Require explicit live authorization, per-wallet serialization and intent IDs.
8. After submission reconcile signatures, failure and confirmation; a timeout is uncertain, not permission to resend blindly.
9. Add SELL inventory, decimals, partial-fill and stale-balance tests before offering exits.

No adapter methods in this release silently contact an unofficial transaction service. Reserved environment variables do not imply connected infrastructure.
