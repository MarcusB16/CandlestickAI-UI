# CandlestickAI-UI

Web front end for CandlestickAI, a personal stock-analysis tool where code detects candlestick patterns, a language model interprets them as competing hypotheses, and a grader scores those hypotheses against what the market actually did.

The UI is a dark trading workbench built around the chart. Every control has a text label, code and AI roles are always visibly distinct (code detects and grades, the model only interprets), and live results are never visually confusable with replay results.

## Pages

- **Analyze**: ticker bar with last price, daily change, LIVE/REPLAY badge, timeframe pills and ticker search; a collapsible watchlist; a candlestick chart with the selected hypothesis drawn as Trigger, Target and Invalidation lines; a row of context stats (trend, support/resistance, ATR and volume, earnings proximity); and a right panel with Hypotheses, Reasoning and Track record tabs.
- **Track Record**: Live and Replay tabs, summary numbers, a calibration chart (stated confidence vs. actual win rate), and a hit-rate table by pattern that flags low sample sizes.
- **Replay**: table of replay runs per model and prompt version, scored separately from live results.
- **Settings**: model, thinking mode, learning mode and grader parameters.

Learning mode is a setting rather than a separate layout: when on, jargon gets a dotted underline and a plain-English tooltip.

## Architecture

React, TypeScript and Vite single-page app with client-side routing, Tailwind CSS for styling and TradingView Lightweight Charts for the candlestick chart. Code is grouped by feature (`analyze`, `track-record`, `replay`, `settings`) with shared layout and UI pieces alongside.

The UI talks to the [CandlestickAI](https://github.com/MarcusB16/CandlestickAI) ASP.NET backend, which owns pattern detection, model calls, grading and storage. The front end only renders what the API returns: candles, hypotheses, context, track-record rows and replay runs. All of those shapes are typed interfaces, so the data source sits behind one seam.

Design reference: [docs/ui-design.md](docs/ui-design.md).
