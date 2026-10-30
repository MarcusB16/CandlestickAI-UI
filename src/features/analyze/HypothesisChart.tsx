import { useEffect, useRef } from 'react'
import {
  CandlestickSeries,
  ColorType,
  LineStyle,
  createChart,
  createSeriesMarkers,
  type Time,
} from 'lightweight-charts'
import type { Candle, Hypothesis } from '../../data-contracts/models'
import { Panel } from '../../shared/ui/Panel'
import { chartColors } from '../../shared/theme'
import { HypothesisLegend } from './HypothesisLegend'

interface HypothesisChartProps {
  candles: Candle[]
  hypothesis: Hypothesis
}

export function HypothesisChart({ candles, hypothesis }: HypothesisChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chart = createChart(container, {
      autoSize: true,
      layout: { background: { type: ColorType.Solid, color: chartColors.panel }, textColor: chartColors.muted },
      grid: { vertLines: { visible: false }, horzLines: { color: chartColors.border } },
      rightPriceScale: { borderColor: chartColors.border },
      timeScale: { borderColor: chartColors.border, rightOffset: 8 },
    })

    const series = chart.addSeries(CandlestickSeries, {
      upColor: chartColors.up,
      downColor: chartColors.down,
      wickUpColor: chartColors.up,
      wickDownColor: chartColors.down,
      borderVisible: false,
      priceLineVisible: false,
      autoscaleInfoProvider: (getOriginalRange: () => { priceRange: { minValue: number; maxValue: number } | null } | null) => {
        const original = getOriginalRange()
        if (!original?.priceRange) return original
        const levels = [hypothesis.trigger, hypothesis.target, hypothesis.invalidation]
        return {
          ...original,
          priceRange: {
            minValue: Math.min(original.priceRange.minValue, ...levels) - 1,
            maxValue: Math.max(original.priceRange.maxValue, ...levels) + 1,
          },
        }
      },
    })
    series.setData(candles)

    const priceLines = [
      { price: hypothesis.trigger, color: chartColors.accent, title: 'Trigger' },
      { price: hypothesis.target, color: chartColors.up, title: 'Target' },
      { price: hypothesis.invalidation, color: chartColors.down, title: 'Invalidation' },
    ]
    priceLines.forEach((line) => series.createPriceLine({ ...line, lineWidth: 2, lineStyle: LineStyle.Dashed, axisLabelVisible: true }))

    const lastCandle = candles[candles.length - 1]
    createSeriesMarkers(series, [
      { time: lastCandle.time as Time, position: 'belowBar', shape: 'arrowUp', color: chartColors.warn, text: hypothesis.pattern },
    ])

    chart.timeScale().fitContent()
    return () => chart.remove()
  }, [candles, hypothesis])

  return (
    <Panel className="relative min-h-[260px] overflow-hidden">
      <div className="absolute left-3.5 top-2.5 z-[2]">
        <HypothesisLegend />
      </div>
      <div ref={containerRef} className="h-full w-full" />
    </Panel>
  )
}
