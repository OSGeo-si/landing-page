<!-- src/views/Contact.vue -->
<template>
  <div class="container">
    <div class="content">
      <h1>GeoDev Slovenia 🌍</h1>

      <div class="section">

      </div>
      <span>GeoDev so odprto, sproščeno in tehnično srečanje za uporabnike in razvijalce geoprostorskih tehnologij,
        in vse, ki jih zanimajo prostorski podatki in tehnologije za njihovo obdelavo, analizo in vizualizacijo.
        Od navdušenih začetnikov do strokovnjakov - vsi so dobrodošli, da se pridružijo in delijo svoje ideje,
        izkušnje, vprašanja, bolečine ali radosti, povezane z geoprostorskimi tehnologijami.
      </span>


      <div class="section">
        <h2>Dogodki in novice</h2>
        <div class="d-flex main overflow-auto gap-2 mt-3 p-2 relative">
          <div v-for="event in geoDevEvents" :key="event.id">
            <event-card :event="event"/>
          </div>
        </div>
      </div>

      <div class="m-2">
        <span>Posreduj nam svojo idejo po <a href="mailto:osgeoslovenija@gmail.com">e-pošti</a> ali
          <a href="https://discord.gg/7Q7v6vz">Discordu</a>.</span>
      </div>

    </div>
  </div>
</template>

<script setup>
// No specific logic needed here
import eventsData from "@/events.json";
import EventCard from "@/components/EventCardComponent.vue";

const geoDevEvents = eventsData.filter((event) => event.tags.includes("geodev"));
</script>
