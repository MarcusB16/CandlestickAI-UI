# UI Design

The chosen design is **Mockup E**: a dark trading-workbench layout. The clickable reference is `mockup/ui-mockup-e.html` (shared assets: `mockup/common.css`, `mockup/common.js`, `mockup/logo.svg`). Mockups A–D in the same folder are rejected explorations kept for comparison.

## Principles

- The chart is the centerpiece; everything else supports reading it.
- Every control has a text label. No unlabeled icons.
- Code and AI roles are always visibly distinct: code detects and grades, the model only interprets.
- Live results and replay results are never visually confusable.

## Layout

```
┌───────────────────────────────────────────────────────────────┐
│ Logo  Analyze  Track Record  Replay  Settings   Learning mode │  top nav
├───────────────────────────────────────────────────────────────┤
│ AAPL  $price  +1.2%  LIVE  1D 1H 15m     [ticker] [⇪ screenshot]│  ticker bar
├──────────┬──────────────────────────────────┬─────────────────┤
│Watchlist │  Candlestick chart               │ Hypotheses      │
│          │  (trigger/target/invalidation    │ Reasoning       │
│ AAPL     │   lines for selected hypothesis) │ Track record    │
│ MSFT     ├──────────────────────────────────┤                 │
│ ...      │  Trend · S/R · ATR/Volume ·      │                 │
│ + Add    │  Earnings                        │                 │
└──────────┴──────────────────────────────────┴─────────────────┘
```

### Top nav

Text links: **Analyze**, **Track Record**, **Replay**, **Settings**. The Learning mode toggle sits at the right end.

### Ticker bar

Ticker, last price, daily change, a `LIVE` or `REPLAY` badge, timeframe pills (1D, 1H, 15m), ticker search, and a screenshot drop target that fills in the ticker.

### Watchlist (left)

Tickers of interest with company name and daily change; the selected row has an accent bar. "+ Add ticker" at the bottom. Collapsible: "« Hide" shrinks it to a thin vertical "Watchlist »" strip and the chart takes the freed width.

### Chart (center)

TradingView Lightweight Charts. Detected patterns are marked on the candles. The selected hypothesis draws three dashed horizontal lines with price labels: **Trigger** (blue), **Target** (green), **Invalidation** (red). Below the chart, a row of context stats: trend, support/resistance, ATR and volume, earnings proximity.

### Right panel (tabs)

- **Hypotheses**: one card per competing hypothesis. Each shows pattern name, direction badge with confidence, confidence bar, trigger, target, invalidation, horizon, and the pattern's past accuracy with sample size. Clicking a card redraws the chart lines. Footer shows model, prompt version, and latency.
- **Reasoning** (tucked away by default): numbered steps, each tagged `Code` or `AI` and showing the real data behind it.
  1. Pattern detected (Code): the matching candles and their values.
  2. Context gathered (Code): the facts the model is allowed to see.
  3. Model interpreted (AI): the model's own explanation of the competing hypotheses.
  4. Graded later (Code): a pending step showing bars elapsed until the grader scores it.
- **Track record**: calibration chart and summary numbers for the selected model. Full breakdown lives on the Track Record page.

## Other pages

- **Track Record**: Live and Replay tabs; summary numbers (graded count, hit rate, calibration error, never-triggered count); the calibration chart (stated confidence vs. actual win rate against a diagonal); a hit-rate table by pattern with low-sample flagging (n < 100).
- **Replay**: table of replay runs (model, prompt version, bars, hit rate, calibration error, status including in-progress runs). Scored separately from live.
- **Settings**: model, thinking mode, learning mode, and grader parameters (trigger window, target in ATR multiples, horizon in bars).

## Learning mode

A setting, not a separate layout. When on, jargon (trigger, invalidation, ATR, pattern names) gets a dotted underline and a plain-English tooltip on hover. There is no glossary page.

## Visual tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0d1117` | page background |
| `--panel` | `#151b23` | panels |
| `--panel2` | `#1b222c` | cards, hover and selected rows |
| `--border` | `#263040` | borders |
| `--text` | `#e6edf3` | primary text |
| `--muted` | `#8b98a9` | secondary text |
| `--accent` | `#4c8dff` | selection, links, trigger line |
| `--up` | `#26a69a` | bullish, target |
| `--down` | `#ef5350` | bearish, invalidation |
| `--warn` | `#e0a93b` | replay badge, pattern marker, flame |

Green and red are reserved for market direction. System font stack. Dark theme only for now.

## Logo

`mockup/logo.svg`: a flat green chart candlestick (rounded body, wick through it) with a small amber flame at the top of the wick. Two colors from the palette, no gradients. Wordmark: "Candlestick" in `--text`, "AI" in `--accent`.

## Implementation notes

- React + TypeScript + Vite, in the separate frontend repo; move this document there when it exists.
- Planned: Tailwind and shadcn/ui for cards, tabs, and tooltips (not yet confirmed).
- The mockup draws its chart on a canvas with fake data; the real app uses Lightweight Charts and the API's hypotheses.
- Ticker clicks in the watchlist load that ticker's chart and analysis.
