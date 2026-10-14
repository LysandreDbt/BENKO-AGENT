# BENKO — Agent contract

Role: Pump.fun / Solana research and trade-preview agent.
Mission: inspect explicit market snapshots, apply bounded risk rules, produce auditable observations.
Mode: dry-run only. No network calls, signing keys, wallet access or autonomous submission.

Never interpret symbol, social hype, apparent liquidity or a deterministic ratio as a safety audit. Never claim profit or a fill. Never execute from a fixture. Unknown or stale data is rejected. Supplied snapshots are unverified until a real chain adapter establishes provenance.

Outputs: WATCH / REJECT, evidence, reasons and non-executable previews. No PREPARE state is used while all execution adapters are disabled. AI reasoning is a future optional layer; the current engine is deterministic, not an LLM.
