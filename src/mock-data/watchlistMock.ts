import type { WatchlistEntry } from '../data-contracts/models'

export const mockWatchlist: WatchlistEntry[] = [
  { ticker: 'AAPL', companyName: 'Apple', dailyChangePercent: 1.2 },
  { ticker: 'MSFT', companyName: 'Microsoft', dailyChangePercent: -0.4 },
  { ticker: 'NVDA', companyName: 'Nvidia', dailyChangePercent: 2.8 },
  { ticker: 'JPM', companyName: 'JPMorgan', dailyChangePercent: -1.1 },
  { ticker: 'XOM', companyName: 'Exxon', dailyChangePercent: 0.3 },
  { ticker: 'KO', companyName: 'Coca-Cola', dailyChangePercent: -0.2 },
  { ticker: 'HD', companyName: 'Home Depot', dailyChangePercent: 0.9 },
]
