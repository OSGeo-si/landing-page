// Turns a rendered conference program into session cards. Every `### ...` heading
// plus the content below it (until the next heading) becomes one <article>. The
// leading time ("8:40 - Naslov") or trailing workshop slot ("Ime - 8:30-11:30")
// moves into its own column, "(v angleščini)" becomes a badge and the first
// paragraph under the heading is styled as the speaker line. Days (##) and
// sessions get ids and are returned as `toc` for the "Na tej strani" navigation.
const headingTimeRe = /^\s*(\d{1,2}:\d{2})\s*[—–-]\s*/
const speakerTimeRe = /\s*[—–-]\s*(\d{1,2}:\d{2}\s*[–-]\s*\d{1,2}:\d{2})\s*$/
const englishRe = /\(v angleščini\)/i

function stripFromText(el, re, fromEnd) {
  const walker = el.ownerDocument.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) nodes.push(walker.currentNode)
  const node = fromEnd ? nodes.at(-1) : nodes[0]
  const match = node && re.exec(node.data)
  if (!match) return null
  node.data = node.data.replace(re, '')
  return match[1]
}

export function programLayout(html) {
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html')
  const root = doc.body.firstElementChild
  const sessions = new Map()

  for (const h3 of [...root.querySelectorAll(':scope > h3')]) {
    const card = doc.createElement('article')
    card.className = 'session'
    card.id = `sekcija-${sessions.size + 1}`
    const body = doc.createElement('div')
    body.className = 'session-body'
    h3.before(card)

    let node = h3
    while (node) {
      const next = node.nextElementSibling
      body.append(node)
      // "Moderator ..." lines belong to the program, not the session above them.
      if (!next || /^H[1-3]$|^HR$/.test(next.tagName) || /^Moderator/.test(next.textContent)) break
      node = next
    }

    const speaker = h3.nextElementSibling?.tagName === 'P' ? h3.nextElementSibling : null
    if (speaker) speaker.classList.add('session-speaker')

    const time = stripFromText(h3, headingTimeRe, false) ?? (speaker && stripFromText(speaker, speakerTimeRe, true))
    const timeEl = doc.createElement('div')
    timeEl.className = 'session-time'
    timeEl.textContent = time || ''

    const label = h3.textContent.replace(englishRe, '').trim()
    for (const em of h3.querySelectorAll('em')) {
      if (englishRe.test(em.textContent)) {
        const badge = doc.createElement('span')
        badge.className = 'session-badge'
        badge.textContent = 'EN'
        badge.title = 'V angleščini'
        em.replaceWith(badge)
      }
    }

    const short = !body.querySelector(':scope > :not(h3)')
    if (short) card.classList.add('session-short')
    card.append(timeEl, body)
    // Only the start time fits in the navigation ("8:30-11:30" -> "8:30").
    const startTime = time?.split(/\s*[–-]\s*/)[0]
    sessions.set(card, { id: card.id, level: 3, label, time: startTime, short })
  }

  const toc = []
  for (const el of root.children) {
    if (el.tagName === 'H2') {
      el.id = `dan-${toc.filter(t => t.level === 2).length + 1}`
      const [label, sub] = el.textContent.split(/\s[—–-]\s/)
      toc.push({ id: el.id, level: 2, label: label.trim(), sub: sub?.trim() })
    } else if (sessions.has(el)) {
      toc.push(sessions.get(el))
    } else if (el.tagName === 'P' && /^Moderator/.test(el.textContent)) {
      el.classList.add('program-moderator')
    }
  }

  return { html: root.innerHTML, toc }
}
