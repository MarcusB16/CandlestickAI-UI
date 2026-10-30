import type { ReactNode } from 'react'

interface SettingsFieldProps {
  label: ReactNode
  htmlFor: string
  children: ReactNode
}

export function SettingsField({ label, htmlFor, children }: SettingsFieldProps) {
  return (
    <div className="flex items-center justify-between border-b border-border py-3 last:border-b-0">
      <label htmlFor={htmlFor}>{label}</label>
      {children}
    </div>
  )
}
