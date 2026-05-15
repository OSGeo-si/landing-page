import { ref, watch } from 'vue'

const STORAGE_KEY = 'osgeo-theme'

function getInitial() {
  if (typeof document === 'undefined') return false
  return document.documentElement.classList.contains('dark')
}

const isDark = ref(getInitial())

watch(isDark, (value) => {
  const root = document.documentElement
  root.classList.toggle('dark', value)
  try {
    localStorage.setItem(STORAGE_KEY, value ? 'dark' : 'light')
  } catch (e) { /* ignore */ }
})

export function useDarkMode() {
  return {
    isDark,
    toggle: () => { isDark.value = !isDark.value },
  }
}
