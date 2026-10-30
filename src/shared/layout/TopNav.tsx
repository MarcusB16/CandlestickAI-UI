import { NavLink } from 'react-router-dom'
import { useLearningMode } from '../learning/useLearningMode'
import { Pill } from '../ui/Pill'
import { Logo } from './Logo'

const navItems = [
  { path: '/', label: 'Analyze' },
  { path: '/track-record', label: 'Track Record' },
  { path: '/replay', label: 'Replay' },
  { path: '/settings', label: 'Settings' },
]

export function TopNav() {
  const { isLearningMode, setLearningMode } = useLearningMode()
  return (
    <nav className="flex items-center gap-7 border-b border-border bg-panel px-[18px]">
      <Logo />
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end
          className={({ isActive }) =>
            `border-b-2 py-3 no-underline ${isActive ? 'border-accent text-text' : 'border-transparent text-muted hover:text-text'}`
          }
        >
          {item.label}
        </NavLink>
      ))}
      <div className="ml-auto">
        <Pill label={isLearningMode ? 'Learning mode: On' : 'Learning mode: Off'} isOn={isLearningMode} onClick={() => setLearningMode(!isLearningMode)} />
      </div>
    </nav>
  )
}
