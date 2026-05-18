/**
 * Generate an ICS (RFC 5545) string from an event object.
 *
 * Times are anchored to Europe/Ljubljana via TZID — works in Google Calendar,
 * Apple Calendar, Outlook 365 (web) without a full VTIMEZONE block.
 */

const pad = (n) => String(n).padStart(2, '0')

function escapeICS(s) {
  return String(s)
    .replace(/[\\;,]/g, '\\$&')
    .replace(/\r?\n/g, '\\n')
}

function formatDateTime(dateStr, timeStr) {
  // dateStr: '2026-05-26' (ISO date)
  // timeStr: '18:00' or null
  const [y, m, d] = dateStr.split('-').map(Number)
  if (timeStr) {
    const [h, min] = timeStr.split(':').map(Number)
    return `${y}${pad(m)}${pad(d)}T${pad(h)}${pad(min)}00`
  }
  return `${y}${pad(m)}${pad(d)}`
}

function nowUTCStamp() {
  const n = new Date()
  return (
    `${n.getUTCFullYear()}${pad(n.getUTCMonth() + 1)}${pad(n.getUTCDate())}` +
    `T${pad(n.getUTCHours())}${pad(n.getUTCMinutes())}${pad(n.getUTCSeconds())}Z`
  )
}

function inferEndTime(startTime) {
  if (!startTime) return null
  const [h, m] = startTime.split(':').map(Number)
  // Default 2-hour event duration; clamp at 23:00 so it stays on the same day.
  const endH = Math.min(h + 2, 23)
  return `${pad(endH)}:${pad(m)}`
}

export function buildICS(event) {
  if (!event?.date || !event?.slug) return ''
  const hasTime = !!event.time
  const startToken = formatDateTime(event.date, event.time)

  let endToken
  if (event.end_date) {
    endToken = formatDateTime(event.end_date, event.time || '17:00')
  } else if (hasTime) {
    endToken = formatDateTime(event.date, inferEndTime(event.time))
  } else {
    // All-day single date — DTEND should be next day (exclusive).
    const start = new Date(`${event.date}T00:00:00Z`)
    start.setUTCDate(start.getUTCDate() + 1)
    endToken = `${start.getUTCFullYear()}${pad(start.getUTCMonth() + 1)}${pad(start.getUTCDate())}`
  }

  const dtstart = hasTime
    ? `DTSTART;TZID=Europe/Ljubljana:${startToken}`
    : `DTSTART;VALUE=DATE:${startToken}`
  const dtend = hasTime
    ? `DTEND;TZID=Europe/Ljubljana:${endToken}`
    : `DTEND;VALUE=DATE:${endToken}`

  const description = event.summary || ''
  const url = `https://osgeo.si/#/dogodki/${event.slug}`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//OSGeo Slovenija//osgeo.si//SI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${event.slug}@osgeo.si`,
    `DTSTAMP:${nowUTCStamp()}`,
    dtstart,
    dtend,
    `SUMMARY:${escapeICS(event.title)}`,
    event.location && `LOCATION:${escapeICS(event.location)}`,
    event.lat != null && event.lng != null && `GEO:${event.lat};${event.lng}`,
    description && `DESCRIPTION:${escapeICS(description)}`,
    `URL:${url}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].filter(Boolean)

  return lines.join('\r\n')
}

export function downloadICS(event) {
  const ics = buildICS(event)
  if (!ics) return
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${event.slug}.ics`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
