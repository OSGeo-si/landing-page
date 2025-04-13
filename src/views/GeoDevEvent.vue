<template>
  <div class="container">
    <div class="content">
      <div class="section">
        <div v-html="htmlContent" class="markdown"></div>
      </div>
      <a :href="event.eventUrl" target="_blank">
        <img src="../assets/github.svg" alt="Github" class="icon"/>
      </a>
    </div>
  </div>
</template>


<script setup>
import {useRoute} from 'vue-router'
import eventsData from '@/events.json'
import {computed} from 'vue'
import {marked} from 'marked'


// Get geoId from route params
const route = useRoute()
const geoId = computed(() => route.params.geoId)

// Find the matching event
const event = computed(() => eventsData.find(item => item.id === geoId.value))

// Safely render markdown only if event exists
const htmlContent = computed(() => {
  if (event.value && event.value.descriptions) {
    return marked(event.value.descriptions)
  }
  return ''
})

</script>


<style scoped>

</style>