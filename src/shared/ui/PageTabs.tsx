interface PageTabsProps<TabId extends string> {
  tabs: { id: TabId; label: string }[]
  activeTabId: TabId
  onSelect: (tabId: TabId) => void
}

export function PageTabs<TabId extends string>({ tabs, activeTabId, onSelect }: PageTabsProps<TabId>) {
  return (
    <div role="tablist" className="flex border-b border-border">
      {tabs.map((tab) => {
        const tone = tab.id === activeTabId ? 'border-accent text-text' : 'border-transparent text-muted hover:text-text'
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === activeTabId}
            onClick={() => onSelect(tab.id)}
            className={`flex-1 cursor-pointer border-b-2 py-3 text-center ${tone}`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
