import { Outlet } from 'react-router-dom'
import { TopNav } from './TopNav'

export function AppShell() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] overflow-hidden">
      <TopNav />
      <main className="min-h-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
