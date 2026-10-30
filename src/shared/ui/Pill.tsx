interface PillProps {
  label: string
  isOn: boolean
  onClick?: () => void
}

export function Pill({ label, isOn, onClick }: PillProps) {
  const tone = isOn ? 'border-accent bg-accent text-white' : 'border-border bg-panel text-muted hover:text-text'
  return (
    <button type="button" aria-pressed={isOn} onClick={onClick} className={`cursor-pointer rounded-full border px-3 py-1 text-xs ${tone}`}>
      {label}
    </button>
  )
}
