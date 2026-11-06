import { allLessons } from '../src/data/index'
let n = 0, problems = 0
for (const { lesson, branch } of allLessons) {
  for (let k = 0; k < 20; k++) {
    const qs = typeof lesson.qs === 'function' ? lesson.qs() : lesson.qs
    for (const q of qs) {
      n++
      if (q.t === 'mc') {
        const set = new Set(q.options)
        if (q.options.length < 2 || set.size !== q.options.length || q.options.some((o) => !o)) { problems++; console.log('BAD MC', branch.id, lesson.id, q.q, q.options) }
      }
      if (q.t === 'order' && q.items.length < 3) { problems++; console.log('SHORT ORDER', lesson.id) }
      if (q.t === 'match' && new Set(q.pairs.map((p) => p[1])).size !== q.pairs.length) { problems++; console.log('DUP MATCH', lesson.id, q.pairs) }
    }
    if (typeof lesson.qs !== 'function') break
  }
}
console.log(allLessons.length, 'lessons', n, 'questions checked', problems, 'problems')
