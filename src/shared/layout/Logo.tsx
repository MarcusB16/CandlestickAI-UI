export function Logo() {
  return (
    <div className="flex items-center gap-2 font-bold tracking-[0.3px]">
      <img src="/logo.svg" alt="" width={30} height={30} />
      <span>
        Candlestick<span className="text-accent">AI</span>
      </span>
    </div>
  )
}
