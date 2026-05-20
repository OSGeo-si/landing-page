import yaml from 'js-yaml'
import { marked } from 'marked'
import { withUtm } from '@/utils/utm.js'

const frontmatterRe = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/

function tagExternalLinks(html) {
  return html.replace(/<a\b([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/gi, (match, pre, href, post) => {
    const tagged = withUtm(href, 'content')
    if (tagged === href) return match
    const attrs = pre + post
    const hasTarget = /\btarget=/i.test(attrs)
    const extra = hasTarget ? '' : ' target="_blank" rel="noopener"'
    return `<a${pre}href="${tagged}"${post}${extra}>`
  })
}

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
  return tagExternalLinks(marked.parse(body, { gfm: true, breaks: false }))
}

const eventModules = import.meta.glob('/content/events/**/*.md', { query: '?raw', import: 'default', eager: true })
const pageModules = import.meta.glob('/content/pages/*.md', { query: '?raw', import: 'default', eager: true })
const newsModules = import.meta.glob('/content/news/*.md', { query: '?raw', import: 'default', eager: true })
const eventImages = import.meta.glob(
  '/content/events/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { query: '?url', import: 'default', eager: true }
)
const newsImages = import.meta.glob(
  '/content/news/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { query: '?url', import: 'default', eager: true }
)

function filenameToAlt(filename) {
  return filename
    .replace(/\.[a-z]+$/i, '')
    .replace(/^\d+[-_\s]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
}

function imagesUnder(modules, prefix) {
  return Object.entries(modules)
    .filter(([path]) => path.startsWith(prefix))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, url]) => {
      const filename = path.slice(prefix.length)
      return { url, filename, alt: filenameToAlt(filename) }
    })
}

function pickCover(images, metaCover) {
  if (metaCover) {
    return images.find(img => img.filename === metaCover) || null
  }
  return images.find(img => /^cover\.(jpg|jpeg|png|webp)$/i.test(img.filename)) || null
}

function buildEvent(raw, sourcePath) {
  const { meta, body } = parseFile(raw, sourcePath)
  const category = sourcePath.split('/').slice(-2, -1)[0]
  const slug = meta.slug || sourcePath.split('/').pop().replace(/\.md$/, '')
  const tags = Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : [])
  const dateStr = meta.date ? toISO(meta.date) : null
  const endDateStr = meta.end_date ? toISO(meta.end_date) : null
  const lat = meta.lat != null ? Number(meta.lat) : null
  const lng = meta.lng != null ? Number(meta.lng) : null
  const gallery = imagesUnder(eventImages, `/content/events/${category}/${slug}/`)
  return {
    ...meta,
    slug,
    category,
    tags,
    date: dateStr,
    end_date: endDateStr,
    lat: Number.isFinite(lat) ? lat : null,
    lng: Number.isFinite(lng) ? lng : null,
    gallery,
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

function buildNews(raw, sourcePath) {
  const { meta, body } = parseFile(raw, sourcePath)
  const baseName = sourcePath.split('/').pop().replace(/\.md$/, '')
  // derive slug from filename, stripping leading YYYY-MM[-DD]- date prefix if present
  const derivedSlug = baseName.replace(/^\d{4}-\d{2}(-\d{2})?-/, '')
  const slug = meta.slug || derivedSlug
  const dateStr = meta.date ? toISO(meta.date) : null
  const tags = Array.isArray(meta.tags) ? meta.tags : (meta.tags ? [meta.tags] : [])
  const allImages = imagesUnder(newsImages, `/content/news/${baseName}/`)
  const cover = pickCover(allImages, meta.cover)
  const gallery = cover ? allImages.filter(img => img !== cover) : allImages
  return {
    ...meta,
    slug,
    tags,
    date: dateStr,
    cover,
    gallery,
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

const news = Object.entries(newsModules)
  .map(([path, raw]) => buildNews(raw, path))
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''))

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

export function getAllNews() {
  return news
}

export function getNews(slug) {
  return news.find(n => n.slug === slug)
}
