<!-- src/components/FooterComponent.vue -->
<template>
  <event-card>
    <h3>{{ event.title }}</h3>
    <p><span class="text-sm">📍 Lokacija: {{ event.location }}</span></p>
    <p><span class="text-sm">📅 Datum: {{ event.date }}</span></p>
    <p><span class="text-sm">🕕 Ura:{{ event.time }} </span></p>
    <p><span class="text-sm">{{ event.summary }} </span></p>

    <a v-if="hasEventUrl" class="m-2 event-link" :href="event.eventUrl" target="_blank">
      <div class="text-sm">Več informacij ...</div>
    </a>
  </event-card>
</template>

<script setup>
import {defineProps} from 'vue';

// Define the props
defineProps({
  event: {
    type: Object,
    required: true,
    default: () => ({
      title: 'Default Event Title',
      location: 'Default Event Location',
      date: 'Default Event Date',
      time: 'Default Event Time',
      summary: 'Default Event Summary',
      eventUrl: undefined,
    }), // Default to an empty object if not provided
  },
});

// // Compute whether the event has a URL safely
// const hasEventUrl = computed(() => {
//   return event?.eventUrl !== undefined && event?.eventUrl !== null;
// });
const hasEventUrl = true;


</script>

<style scoped>
/* Add scoped styles here */
.event-link {
  text-decoration: none;
}
</style>
