<!-- src/views/Contact.vue -->
<template>
  <div class="container">
    <div class="content">
      <h2>Svizec</h2>

      <p class="mt-4">
        Svizec je večdnevni skupnostni dogodek v naravi, kjer združimo prijetno s koristnim: začnemo in zaključimo skupni projekt, obenem pa si sproščeno delimo znanje, ideje in orodja. Med priljubljenimi kapljicami, roštiljanjem in šotorjenjem se pogovarjamo o rešitvah, sodelujemo na projektu in preživljamo čas na prostem.
      </p>
      <p class="mt-4">
        Dogodek je namenjen vsem, ki jih zanima odprto sodelovanje, skupnostno ustvarjanje in povezovanje ob ognju, ne pa v sejni sobi. Prinesi svoj šotor, dobro voljo, idejo ali samo željo po druženju – ostalo uredimo skupaj.
      </p>

      <div class="section">
  <div class="d-flex main overflow-auto gap-2 mt-3 p-2 relative">
    <div v-for="event in svizecEvents" :key="event.id">
      <event-card :event="event" />
    </div>
  </div>
</div>

      <img :src="svizec" alt="Logo" class="hero"/>
<!--      <div class="m-2">-->
<!--        <span>Pridi v brlog! Vabila na <a href="mailto:osgeoslovenija@gmail.com">e-pošte</a> ali-->
<!--          <a href="https://discord.gg/7Q7v6vz">Discord</a>.</span>-->
<!--      </div>-->

    </div>
  </div>
</template>

<script setup>
import EventCard from "@/components/EventCardComponent.vue";
import eventsData from "@/events.json";

const svizecEvents = eventsData.filter(event => event.tags.includes("osgeo-svizec"));

import svizec from '@/assets/svizec-main-clr.svg';
// No specific logic needed here
</script>
