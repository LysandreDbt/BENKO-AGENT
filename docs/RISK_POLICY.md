# Risk policy

Defaults are editable research limits, not a safety guarantee. Inspect config/default.json for exact values. Dry-run mode is mandatory. Both fictional data and unauthenticated external snapshots cannot produce an executable trade.

Holder concentration and liquidity alone cannot detect all risks. Future checks must include token program/extensions, authorities, pool authenticity, sellability, fee behavior, quote freshness, position accounting and provider trust. Real amounts need integer base units rather than JavaScript floating-point SOL values used in this preview model.

Stop conditions: invalid config, unknown venue/quote, invalid time, stale observation, missing fields, over-limit amount/exposure or insufficient liquidity. Missing live capabilities always block submission. Never disable these checks to make a demo look successful.
