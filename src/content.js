import yaml from 'js-yaml'
import { marked } from 'marked'

const frontmatterRe = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

function parseFile(raw, sourcePath) {
  const match = frontmatterRe.exec(raw)
  if (!match) {
    return { meta: {}, body: raw, sourcePath }
  }
  let meta = {}
  try {
    meta = yaml.load(match[1]) || {}
  } catch (err) {
    console.warn(`[content] YAML frontmatter parse error in ${sourcePath}:`, err.message)
  }
  return { meta, body: match[2], sourcePath }
}

function renderBody(body) {
  return marked.parse(body, { gfm: true, breaks: false })
}

const eventModules = import.meta.glob('/content/events/**/*.md', { query: '?raw', import: 'default', eager: true })
const pageModules = import.meta.glob('/content/pages/*.md', { query: '?raw', import: 'default', eager: true })

function buildEvent(raw, sourcePath) {
  const { meta, body } = parseFile(raw, sourcePath)
  const category = sourcePath.split('/').slice(-2, -1)[0]
  const slug = meta.slug || sourcePath.split('/').pop().replace(/\.md$/, '')
  const tags = Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : [])
  const dateStr = meta.date ? toISO(meta.date) : null
  const endDateStr = meta.end_date ? toISO(meta.end_date) : null
  return {
    ...meta,
    slug,
    category,
    tags,
    date: dateStr,
    end_date: endDateStr,
    bodyMarkdown: body,
    html: renderBody(body),
  }
}

function buildPage(raw, sourcePath) {
  const { meta, body } = parseFile(raw, sourcePath)
  const name = sourcePath.split('/').pop().replace(/\.md$/, '')
  return {
    ...meta,
    name,
    bodyMarkdown: body,
    html: renderBody(body),
  }
}

function toISO(v) {
  if (v instanceof Date) {
    const y = v.getFullYear()
    const m = String(v.getMonth() + 1).padStart(2, '0')
    const d = String(v.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
  return String(v)
}

const events = Object.entries(eventModules)
  .map(([path, raw]) => buildEvent(raw, path))
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

const pages = Object.fromEntries(
  Object.entries(pageModules).map(([path, raw]) => {
    const page = buildPage(raw, path)
    return [page.name, page]
  })
)

export function getAllEvents() {
  return events
}

export function getEventsByTag(tag) {
  return events.filter(e => e.tags.includes(tag))
}

export function getEventsByCategory(category) {
  return events.filter(e => e.category === category)
}

export function getEvent(slug) {
  return events.find(e => e.slug === slug)
}

export function getPage(name) {
  return pages[name]
}

export function getUpcomingEvents(limit) {
  const today = new Date().toISOString().slice(0, 10)
  const upcoming = events
    .filter(e => (e.end_date || e.date) >= today)
    .sort((a, b) => (a.date || '').localeCompare(b.date || ''))
  return typeof limit === 'number' ? upcoming.slice(0, limit) : upcoming
}

export function isFutureEvent(event) {
  const today = new Date().toISOString().slice(0, 10)
  return (event.end_date || event.date) >= today
}
