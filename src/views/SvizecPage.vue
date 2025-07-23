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
      <img :src="svizec" alt="Logo" class="hero"/>
<!--      <div class="m-2">-->
<!--        <span>Pridi v brlog! Vabila na <a href="mailto:osgeoslovenija@gmail.com">e-pošte</a> ali-->
<!--          <a href="https://discord.gg/7Q7v6vz">Discord</a>.</span>-->
<!--      </div>-->

    </div>
  </div>
</template>

<script setup>
import svizec from '@/assets/svizec-main-clr.svg';
// No specific logic needed here
</script>
