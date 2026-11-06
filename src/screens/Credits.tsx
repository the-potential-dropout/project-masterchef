import { allRecipes } from '../data'
import { photoPage, photos } from '../data/photos'
import { Mascot } from '../components/Mascot'

export function Credits() {
  return (
    <>
      <a className="back" href="#/reference">← Cheat sheets</a>
      <h1 className="page-title">Photo credits</h1>
      <Mascot size={70} mood="happy" className="health-mascot" />
      <p className="lede">
        Dish photos come from Wikimedia Commons, shared by their photographers under free licences (mostly Creative Commons). Each link opens the photo’s page with its author and licence. Thank you, photographers.
      </p>
      <p className="muted small">Some photos show a restaurant or regional version of a dish, so yours may look a little different. The mascot and drawings are original to this app.</p>
      <ul className="credits">
        {allRecipes.filter((r) => photos[r.id]).map((r) => (
          <li key={r.id}>
            <strong>{r.title}</strong>
            <a href={photoPage(r.id)} target="_blank" rel="noreferrer">{photos[r.id]}</a>
          </li>
        ))}
      </ul>
    </>
  )
}
