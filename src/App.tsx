import { useHashRoute } from './lib/store'
import { recipeById } from './data/recipes'
import { Path } from './screens/Path'
import { RecipePage } from './screens/RecipePage'
import { CookMode } from './screens/CookMode'
import { Groceries } from './screens/Groceries'
import { Basics } from './screens/Basics'

export default function App() {
  const [route, go] = useHashRoute()
  const [, section, id] = route.split('/')

  if (section === 'cook' && id) {
    const r = recipeById(id)
    if (r) return <CookMode recipe={r} go={go} />
  }

  let screen
  let tab = 'path'
  if (section === 'recipe' && id && recipeById(id)) screen = <RecipePage recipe={recipeById(id)!} go={go} />
  else if (section === 'groceries') {
    screen = <Groceries go={go} />
    tab = 'groceries'
  } else if (section === 'basics') {
    screen = <Basics />
    tab = 'basics'
  } else screen = <Path go={go} />

  return (
    <div className="shell">
      <main className="page">{screen}</main>
      <nav className="tabs" aria-label="Main">
        <a href="#/" className={tab === 'path' ? 'on' : ''} aria-current={tab === 'path' ? 'page' : undefined}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 20c0-6 14-4 14-10a5 5 0 0 0-10 0" /><circle cx="5" cy="20" r="1.6" /><circle cx="9" cy="10" r="1.6" /></svg>
          Path
        </a>
        <a href="#/groceries" className={tab === 'groceries' ? 'on' : ''} aria-current={tab === 'groceries' ? 'page' : undefined}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16l-2 12H6L4 6Z" /><path d="M9 6a3 3 0 0 1 6 0" /></svg>
          Groceries
        </a>
        <a href="#/basics" className={tab === 'basics' ? 'on' : ''} aria-current={tab === 'basics' ? 'page' : undefined}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 15h18M5 15a7 7 0 0 1 14 0M12 8V5M10 5h4" /><path d="M4 19h16" /></svg>
          Basics
        </a>
      </nav>
    </div>
  )
}
