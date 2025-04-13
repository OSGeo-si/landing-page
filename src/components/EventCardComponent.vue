<!-- src/components/FooterComponent.vue -->
<template>
  <event-card>
    <h3>{{ event.title }}</h3>
    <p><span class="text-sm">📍 Lokacija: {{ event.location }}</span></p>
    <p><span class="text-sm">📅 Datum: {{ event.date }}</span></p>
    <p><span class="text-sm">🕕 Ura:{{ event.time }} </span></p>
    <p><span class="text-sm">{{ event.summary }} </span></p>


    <router-link
        v-if="isInternal"
        :to="`/geodev/${props.event.id}`"
        class="m-2 event-link"
    >
      <div class="text-sm">Več informacij ...</div>
    </router-link>
    <a
        v-else
        :href="props.event.eventUrl"
        class="m-2 event-link"
        target="_blank"
        rel="noopener noreferrer"
    >
      <div class="text-sm">Več informacij ...</div>
    </a>


  </event-card>
</template>

<script setup>
import {defineProps, computed} from 'vue'

// Define props
const props = defineProps({
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
      tags: [],
      id: ''
    })
  }
})

const isInternal = computed(() => props.event.tags.includes("geodev"))


</script>

<style scoped>
/* Add scoped styles here */
.event-link {
  text-decoration: none;
}
</style>
