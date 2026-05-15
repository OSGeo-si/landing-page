<template>
  <div v-if="events.length" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <EventCard v-for="event in events" :key="event.slug" :event="event" />
  </div>
  <p v-else class="rounded-lg border border-dashed border-moss-700/20 bg-paper-2 px-6 py-10 text-center text-sm text-moss-900/60">
    Še ni objavljenih dogodkov. Spremljaj nas — kmalu pridejo.
  </p>
</template>

<script setup>
import EventCard from './EventCard.vue'

defineProps({
  events: { type: Array, required: true },
})
</script>
