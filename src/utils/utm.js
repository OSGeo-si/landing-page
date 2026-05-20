const SOURCE = 'osgeo.si'
const MEDIUM = 'referral'
const SAME_HOSTS = /(^|\.)osgeo\.si$/i

export function withUtm(url, campaign) {
  if (!url || !/^https?:/i.test(url)) return url
  try {
    const u = new URL(url)
    if (SAME_HOSTS.test(u.hostname)) return url
    if (!u.searchParams.has('utm_source')) u.searchParams.set('utm_source', SOURCE)
    if (!u.searchParams.has('utm_medium')) u.searchParams.set('utm_medium', MEDIUM)
    if (campaign && !u.searchParams.has('utm_campaign')) u.searchParams.set('utm_campaign', campaign)
    return u.toString()
  } catch {
    return url
  }
}
