<!-- src/views/Contact.vue -->
<template>
  <div class="container">
    <div class="content">
      <h1>GeoDev Meetups Slovenia 🌍</h1>

      <div class="section">

      </div>
      <span>GeoDev Meetupi so odprto, sproščeno in tehnično srečanje za uporabnike in razvijalce geoprostorskih tehnologij,
        in vse, ki jih zanimajo prostorski podatki in tehnologije za njihovo obdelavo, analizo in vizualizacijo.
        Od navdušenih začetnikov do strokovnjakov - vsi ste dobrodošli, da se pridružite in delite svoje ideje,
        izkušnje, vprašanja, bolečine ali radosti, povezane z geoprostorskih tehnologij.
      </span>


      <div class="section">
        <h2>Dogodki in novice</h2>
        <div class="d-flex main overflow-auto gap-2 mt-3 p-2 relative">
          <div v-for="event in geoDevEvents" :key="event.id">
            <event-card :event="event"/>
          </div>
        </div>
      </div>

      <div class="section">



        <div class="newsletter" style="width: 264px">
          <a href="https://eepurl.com/i3SUYE" target="_blank" class="btn">
            Prijavi se na novice
            <img src="../assets/mail.svg" alt="Mailing List" class="icon"/>
          </a>
        </div>


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
