<!-- src/views/Contact.vue -->
<template>
  <div class="container">
    <div class="content">
      <h1>OSGeo Konferenca</h1>
      <span>Konference Open Source Geospatial Slovenija, ki vsako leto potekajo v Ljubljani, služijo kot platforma za strokovnjake in navdušence za razpravo o napredku in uporabi odprtokodnih geoprostorskih tehnologij.</span>

      <div class="section">
        <h2>Dogodki in novice</h2>
        <div class="d-flex main overflow-auto gap-2 mt-3 p-2 relative">
          <div v-for="event in osgeoEvents" :key="event.id">
            <event-card :event="event"/>
          </div>
        </div>
      </div>

      <div class="newsletter" style="width: 264px">
        <a href="https://eepurl.com/i3SUYE" target="_blank" class="btn">
          Prijavi se na novice
          <img src="../assets/mail.svg" alt="Mailing List" class="icon"/>
        </a>
      </div>


    </div>
  </div>
</template>

<script setup>
// No specific logic needed here
import EventCard from "@/components/EventCardComponent.vue";
import eventsData from "@/events.json";

const osgeoEvents = eventsData.filter((event) => event.tags.includes("osgeo-conference"));
</script>
