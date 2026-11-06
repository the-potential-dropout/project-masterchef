import { useHashRoute } from './lib/store'
import { getRecipe } from './data'
import { Path } from './screens/Path'
import { RecipePage } from './screens/RecipePage'
import { CookMode } from './screens/CookMode'
import { Groceries } from './screens/Groceries'
import { Prices } from './screens/Prices'
import { Reference } from './screens/Reference'
import { Learn } from './screens/Learn'
import { LessonPlayer } from './screens/LessonPlayer'
import { Recipes } from './screens/Recipes'
import { Health } from './screens/Health'
import { Credits } from './screens/Credits'

const TABS = [
  { id: 'home', href: '#/', label: 'Home', icon: <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z" /> },
  { id: 'learn', href: '#/learn', label: 'Learn', icon: <><path d="M3 9l9-5 9 5-9 5-9-5Z" /><path d="M7 11.5V16c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5M21 9v6" /></> },
  { id: 'recipes', href: '#/recipes', label: 'Recipes', icon: <><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3V4Z" /><path d="M9 8h6M9 12h6" /></> },
  { id: 'groceries', href: '#/groceries', label: 'Groceries', icon: <><path d="M4 6h16l-2 12H6L4 6Z" /><path d="M9 6a3 3 0 0 1 6 0" /></> },
  { id: 'health', href: '#/health', label: 'Health', icon: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /> },
]

export default function App() {
  const [route, go] = useHashRoute()
  const [, section, id] = route.split('/')
  const rest = route.split('/').slice(2).filter(Boolean)

  if (section === 'cook' && id) {
    const r = getRecipe(id)
    if (r) return <CookMode recipe={r} go={go} />
  }
  if (section === 'lesson' && id) return <LessonPlayer id={id} go={go} />

  let screen
  let tab = 'home'
  const r = id ? getRecipe(id) : undefined
  if (section === 'recipe' && r) {
    screen = <RecipePage recipe={r} go={go} />
    tab = r.cuisine ? 'recipes' : 'home'
  } else if (section === 'learn') {
    screen = <Learn branchId={id} go={go} />
    tab = 'learn'
  } else if (section === 'recipes') {
    screen = <Recipes path={rest} go={go} />
    tab = 'recipes'
  } else if (section === 'groceries') {
    screen = <Groceries go={go} />
    tab = 'groceries'
  } else if (section === 'prices') {
    screen = <Prices />
    tab = 'groceries'
  } else if (section === 'health') {
    screen = <Health go={go} />
    tab = 'health'
  } else if (section === 'credits') {
    screen = <Credits />
    tab = 'learn'
  } else if (section === 'reference' || section === 'basics') {
    screen = <Reference />
    tab = 'learn'
  } else screen = <Path go={go} />

  return (
    <div className="shell">
      <main className="page">{screen}</main>
      <nav className="tabs" aria-label="Main">
        {TABS.map((t) => (
          <a key={t.id} href={t.href} className={tab === t.id ? 'on' : ''} aria-current={tab === t.id ? 'page' : undefined}>
            <svg viewBox="0 0 24 24" aria-hidden="true">{t.icon}</svg>
            {t.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
