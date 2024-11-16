<!-- src/views/HomePage.vue -->
<template>
  <div class="container">
    <div class="content mb-4">
      <div class="section">
        <img :src="logo" alt="Logo"/>
        <h2> razvoj in promocija odprtokodnih geoprostorskih tehnologij ter odprtih podatkovnih standardov v
          Sloveniji</h2>
      </div>
      <div class="section">
        <h3>Dogodki in novice</h3>
        <div class="d-flex main overflow-auto gap-2 mt-3 p-2 relative">
          <div v-for="event in eventsData" :key="event.id">
            <event-card :event="event"/>
          </div>
        </div>
      </div>
      <div class="section mb-6">
        <div class="contact-container">
          <div class="newsletter">
            <a href="https://eepurl.com/i3SUYE" target="_blank" class="btn">
              Prijavi se na novice
              <img src="../assets/mail.svg" alt="Mailing List" class="icon"/>
            </a>
          </div>
          <div class="icon-container">
            <a href="https://github.com/OSGeo-si" target="_blank">
              <img src="../assets/github.svg" alt="Github" class="icon"/>
            </a>
            <a href="https://discord.gg/XQGqrz8CgA" target="_blank">
              <img src="../assets/discord.svg" alt="Discord" class="icon"/>
            </a>
            <a href="https://www.linkedin.com/company/osgeo-slovenija/about" target="_blank">
              <img src="../assets/linkedin.svg" alt="LinkedIn" class="icon"/>
            </a>
          </div>
        </div>
      </div>
      <div class="m-3">

      </div>
    </div>
  </div>
</template>

<script setup>
import logo from '@/assets/logo-lg.svg'; // Import the logo image directly
import EventCard from '../components/EventCardComponent.vue'
import eventsData from '../events.json';


</script>

