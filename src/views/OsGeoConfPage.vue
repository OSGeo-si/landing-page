<!-- src/views/Contact.vue -->
<template>
  <div class="container">
    <div class="content">
      <h1>Open Source Geospatial Slovenija</h1>
      <span>Vsakoletna konferenca Open Source Geospatial Slovenija, ki poteka v Ljubljani, predstavlja osrednje stičišče za strokovnjake in navdušence nad odprtokodnimi geoprostorskimi tehnologijami. Dogodek je namenjen predstavitvi najnovejših dosežkov, trendov in praks na področju razvoja in uporabe teh tehnologij ter spodbuja strokovno izmenjavo mnenj in mreženje.</span>


      <div class="section">
        <div class="d-flex main overflow-auto gap-2 mt-3 p-2 relative">
          <div v-for="event in osgeoEvents" :key="event.id">
            <event-card :event="event"/>
          </div>
        </div>
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
