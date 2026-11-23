/**
 * The Masterchef textbook: an animated book (slides, textbook and map views) generated into
 * public/textbook/index.html by `npm run textbook`. This screen shows it full-screen.
 */
export function Textbook() {
  return (
    <div className="tb-frame">
      <a className="back tb-back" href="#/learn">← Back to the app</a>
      <iframe src="./textbook/index.html" title="Masterchef, the textbook" allow="autoplay; screen-wake-lock" />
    </div>
  )
}
