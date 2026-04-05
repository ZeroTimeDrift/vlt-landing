---
title: "How Lending Markets Work (And Why They Pay Better Than Your Bank)"
date: "2026-03-15"
slug: "how-lending-markets-work"
heroImage: "/blog/how-lending-markets-work.svg"
excerpt: "Lending markets match capital providers with borrowers and let market forces set fee rates. Here's what that means for your savings."
description: "Lending markets match capital providers with borrowers, letting fees set by market forces flow back to savers. Here's how they work."
author: "Vault Team"
---

![How lending markets connect capital providers with borrowers to generate real earnings](/blog/how-lending-markets-work.svg)

## The basics of lending markets

A lending market is exactly what it sounds like: a marketplace where people or institutions who have money connect with people or institutions that need it.

When demand for loans is high, borrowers pay higher fees to secure capital. When supply of available capital is high, rates come down. It's a live market, which is why rates are variable rather than fixed.

Traditional banks participate in these markets. They pay you 1–2% on your savings and lend those same deposits out at 6–10%. The spread is profit.

## Who borrows on these markets?

The borrowers in the lending markets Vault deploys into are institutional — businesses, trading firms, and financial operations that need short-term access to dollar capital.

They're not taking out personal loans. They're borrowing working capital: funding trading operations, bridging short-term cash flow gaps, or accessing liquidity for structured financial products. These are well-collateralised, short-duration positions.

Because the borrowers are institutional and the positions are collateralised, the markets can function at scale without the kind of credit risk associated with consumer lending. The fee they pay for access to capital is the rate that flows to depositors.

## Why the rates are higher

Several structural reasons explain why lending markets pay more than savings accounts:

**No banking overhead.** Traditional banks carry enormous cost structures — branch networks, compliance teams, legacy systems. Digital-native lending markets don't.

**More direct.** When you participate in a lending market, there are fewer intermediaries taking a cut between you and the borrower paying fees.

**Market-rate pricing.** Rates reflect actual supply and demand, rather than a bank's decision about how much they need to pay to retain deposits. A bank offering 1.5% isn't limited by what the market can bear — they're limited by what their marketing team calculates is enough to retain your deposit.

## What makes a market "vetted"?

Not all lending markets are equal. At Vault, we evaluate markets on:

- **Audits**: Operational and technical audits by credible third parties
- **Track record**: Months or years of operation without security incidents
- **Liquidity**: Deep enough to support withdrawals within 24 hours
- **Borrower quality**: Institutional-grade counterparties with collateral requirements

Vault currently deploys through a single vetted market — the Sentora PYUSD institutional vault — which has been independently reviewed and operates with institutional borrowers on both sides. We don't publish every technical detail of the infrastructure, but the counterparty quality and audit history are central to why this market was selected.

## Variable rates: what to expect

The ~5.4% current rate reflects current market conditions. Rates change as borrowing demand and capital supply shift. In practice:

- Rates above 3% have been consistently achievable in institutional lending markets for the past several years
- We don't artificially subsidize rates — what you earn reflects what borrowers actually pay
- If market conditions deteriorate significantly, rates will fall and we'll communicate that clearly

This is meaningfully different from a bank's promotional rate that exists for a quarter and then quietly disappears. Lending market rates respond to economic conditions — not to a bank's deposit acquisition calendar.

## Withdrawal within 24 hours

One common concern: "If my money is deployed in a market, can I actually get it back quickly?"

Yes. Vault maintains liquidity buffers and works with markets that support rapid withdrawals. Our 24-hour target has been our operating standard since launch.

The reason this is possible: the lending market we use is highly liquid, with large volumes of short-duration positions constantly rolling. Withdrawals don't require unwinding a position — they draw from the liquid buffer Vault maintains at all times.

---

Join the waitlist at [vlt.money](https://vlt.money)

*Vault earnings are fees paid by borrowers for access to capital — not guaranteed returns. Rates vary with market conditions. Vault is in the process of obtaining ADGM regulatory approval.*
