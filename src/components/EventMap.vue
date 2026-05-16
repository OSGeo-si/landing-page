<template>
  <div
    class="relative overflow-hidden bg-paper-2"
    :class="chromeless ? '' : 'rounded-lg border border-moss-700/15'"
    :style="{ height }"
  >
    <div ref="el" class="leaflet-host h-full"></div>
    <p
      v-if="!eventsWithCoords.length && !chromeless"
      class="mono absolute inset-0 flex items-center justify-center bg-paper-2/80 text-sm text-moss-900/60"
    >
      Brez geolociranih dogodkov.
    </p>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  events: { type: Array, default: () => [] },
  height: { type: String, default: '380px' },
  zoom: { type: Number, default: null },
  fallbackCenter: { type: Array, default: () => [46.15, 14.8] },
  fallbackZoom: { type: Number, default: 7 },
  chromeless: { type: Boolean, default: false },
  lockScroll: { type: Boolean, default: false },
  markerOffsetX: { type: Number, default: 0 },
})

const el = ref(null)
let map = null
let markers = []
let tileLayer = null

const eventsWithCoords = computed(() =>
  props.events.filter(e => typeof e.lat === 'number' && typeof e.lng === 'number')
)

const TILE_CONFIG = {
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 19,
}

function makeIcon() {
  return L.divIcon({
    className: 'ev-pin-wrap',
    html: `<span class="ev-pin"><span class="ev-pin-dot"></span></span>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  })
}

function popupHtml(ev) {
  const href = `#/dogodki/${ev.slug}`
  const date = ev.date || ''
  const loc = ev.location ? ` · ${escapeHtml(ev.location)}` : ''
  return `
    <div class="ev-popup-content">
      <a href="${href}" class="ev-popup-title">${escapeHtml(ev.title)}</a>
      <div class="ev-popup-meta">${escapeHtml(date)}${loc}</div>
    </div>
  `
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]))
}

function applyOffset() {
  if (!map || !props.markerOffsetX) return
  map.panBy([-props.markerOffsetX, 0], { animate: false })
}

function render() {
  if (!map) return
  markers.forEach(m => map.removeLayer(m))
  markers = []

  const evs = eventsWithCoords.value
  if (!evs.length) {
    map.setView(props.fallbackCenter, props.fallbackZoom)
    return
  }

  const icon = makeIcon()
  evs.forEach(ev => {
    const m = L.marker([ev.lat, ev.lng], { icon, title: ev.title, riseOnHover: true })
    m.bindPopup(popupHtml(ev), { className: 'ev-popup', closeButton: false })
    m.addTo(map)
    markers.push(m)
  })

  if (props.zoom && evs.length === 1) {
    map.setView([evs[0].lat, evs[0].lng], props.zoom)
  } else if (evs.length === 1) {
    map.setView([evs[0].lat, evs[0].lng], 14)
  } else {
    const group = L.featureGroup(markers)
    map.fitBounds(group.getBounds().pad(0.25), { maxZoom: 12 })
  }
  nextTick(applyOffset)
}

onMounted(() => {
  map = L.map(el.value, {
    zoomControl: true,
    attributionControl: true,
    scrollWheelZoom: false,
  }).setView(props.fallbackCenter, props.fallbackZoom)

  tileLayer = L.tileLayer(TILE_CONFIG.url, TILE_CONFIG).addTo(map)

  if (!props.lockScroll) {
    // Click to enable scroll-wheel zoom; leaving the map disables it again so
    // the wheel doesn't hijack page scrolling.
    map.on('click', () => map.scrollWheelZoom.enable())
    map.on('mouseout', () => map.scrollWheelZoom.disable())
  }

  render()
})

onBeforeUnmount(() => {
  if (map) {
    map.remove()
    map = null
    markers = []
    tileLayer = null
  }
})

watch(() => props.events, render, { deep: true })
</script>

<style>
/* Leaflet renders into dynamically created DOM — keep styles global. */
.leaflet-host { width: 100%; }
.leaflet-container {
  background: var(--color-paper-2);
  font-family: var(--font-sans);
  outline: none;
}

.ev-pin-wrap { background: transparent !important; border: 0 !important; }
.ev-pin {
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: color-mix(in oklab, var(--color-moss-500) 28%, transparent);
  animation: ev-pulse 2.6s ease-in-out infinite;
}
.ev-pin-dot {
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 9999px;
  background: var(--color-moss-700);
  box-shadow: 0 0 0 2px var(--color-paper), 0 2px 6px rgba(0, 0, 0, 0.25);
}
.dark .ev-pin {
  background: color-mix(in oklab, var(--color-moss-500) 30%, transparent);
}
.dark .ev-pin-dot {
  background: var(--color-moss-500);
  box-shadow: 0 0 0 2px var(--color-paper-2), 0 2px 6px rgba(0, 0, 0, 0.45);
}
@keyframes ev-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.18); opacity: 0.9; }
}
@media (prefers-reduced-motion: reduce) {
  .ev-pin { animation: none; }
}

.ev-popup .leaflet-popup-content-wrapper {
  border-radius: 6px;
  background: var(--color-surface);
  color: var(--color-ink);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.18);
}
.ev-popup .leaflet-popup-content {
  margin: 0.7rem 0.9rem;
  font-family: var(--font-sans);
}
.ev-popup .leaflet-popup-tip { background: var(--color-surface); }
.ev-popup-title {
  display: block;
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.25;
  color: var(--color-moss-800);
  text-decoration: none;
}
.ev-popup-title:hover { color: var(--color-moss-600); }
.ev-popup-meta {
  margin-top: 4px;
  font-size: 0.78rem;
  color: color-mix(in oklab, var(--color-ink) 65%, transparent);
}

.leaflet-bar a, .leaflet-bar a:hover {
  background: var(--color-surface);
  color: var(--color-ink);
  border-bottom-color: color-mix(in oklab, var(--color-ink) 12%, transparent);
}
.leaflet-bar a:hover { background: var(--color-paper); }
.leaflet-control-attribution {
  background: color-mix(in oklab, var(--color-surface) 80%, transparent) !important;
  color: var(--color-ink);
  font-size: 10px;
}
.leaflet-control-attribution a { color: var(--color-moss-700); }
</style>
