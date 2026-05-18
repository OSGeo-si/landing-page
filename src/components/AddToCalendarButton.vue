<template>
  <button
    type="button"
    class="btn-ghost"
    :disabled="!event?.date"
    @click="onClick"
  >
    <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2" /><path stroke-linecap="round" d="M8 3v4M16 3v4M3 10h18" /></svg>
    Dodaj v koledar
  </button>
</template>

<script setup>
import { downloadICS } from '@/utils/calendar.js'

const props = defineProps({
  event: { type: Object, required: true },
})

const onClick = () => downloadICS(props.event)
</script>
