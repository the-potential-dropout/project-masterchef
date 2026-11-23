# The animated textbook

`public/textbook/index.html` is generated. Don't edit it by hand.

- `book_core.py`: the hand-written chapters (survival, foundations, the six-dish path, mother techniques), with their animated diagrams.
- The world atlas is generated from `src/data/textbook.ts` / `textbookWorld.ts`.
- `book_end.py`: Becoming a Masterchef, sources, and the glossary of linked terms.
- `tts.py`: adds the read-aloud player (browser speech synthesis) to the built page.
- `engine.html`: the viewer (slides, textbook and map views, outline, bookmark, term drawer, diagrams).

Rebuild after changing any of them, or the recipes:

```bash
npm run textbook
```
