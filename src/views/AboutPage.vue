<!-- src/views/About.vue -->
<template>
  <div class="container">
    <div class="content">
      <h2>O Društvu</h2>
      <span>Namen društva sta razvoj in promocija odprtokodnih geoprostorskih tehnologij ter odprtih podatkovnih standardov v
      Sloveniji.</span>
      <ul class="m-4">
        <li>promocija in podpora odprtokodnim geoprostorskim tehnologijam, zlasti programskim paketom, kot so QGIS,
          PostGIS, GRASS in GeoServer,
        </li>
        <li>organizacija izobraževanj, delavnic in drugih dogodkov, povezanih z odprtokodno geoprostorsko tehnologijo,
        </li>
        <li>sodelovanje s podobnimi organizacijami v Sloveniji in tujini,</li>
        <li>prizadevanje za uveljavitev odprtih podatkovnih standardov in za izboljšanje odprtosti, dostopnosti in
          kakovosti prostorskih podatkov v Sloveniji,
        </li>
        <li>spodbujanje široke uporabe geoinformatike v odprtokodnem okolju,</li>
        <li>obveščanje članov društva o aktualnem dogajanju, novostih in pobudah na področju odprtokodnih geoprostorskih
          tehnologij,
        </li>
        <li>podpora raziskavam, študijam in projektom, povezanimi z odprtokodno geoinformatiko in sorodnimi
          tehnologijami.
        </li>
      </ul>

      <a href="/OSGeoSlovenija_statut.pdf" download>Statut Društva</a><br><br>
      <a href="https://wiki.osgeo.org/wiki/Slovenia" download>OSGeo Wiki</a>


      <div class="section">


        <h2>Včlani se!</h2>

        <p>Če želite postati član društva,
          izpolnite
          <a href="/pristopna_izjava_osgeo_si_v20241101.pdf" download>pristopno izjavo</a>
          in jo pošljite na naš elektronski naslov:
          <a href="mailto:osgeoslovenija@gmail.com">osgeoslovenija@gmail.com</a>. Letna članarina znaša 20 EUR.
        </p>
      </div>


      <div class="payment-info">
        <div class="payment-list">
          <p><strong>Podatki za plačilo:</strong></p>
          <ul>
            <li>Prejemnik: DRUŠTVO OSGEO SLOVENIJA </li>
            <li>IBAN (TRR): SI56 6100 0003 0709 965</li>
            <li>Banka: Delavska hranilnica d.d.</li>
            <li>Naslov: Dolomitska ulica 20, 1000 Ljubljana</li>
            <li>Znesek: 20,00 EUR</li>
            <li>Referenca: SI99 (pustite prazno polje za sklic)</li>
            <li>Namen: Članarina 2025</li>
          </ul>
        </div>

        <figure class="payment-qr">
          <img
              :src="qr"
              alt="QR koda za plačilo članarine (20 EUR)"
              loading="lazy"
          />
        </figure>
      </div>


      <div class="section">

        <a class="btn" href="http://eepurl.com/i3SUYE" target="_blank" rel="noopener noreferrer">
          Prijavi se na novice
        </a>
      </div>

    </div>
  </div>
</template>

<script setup>
import qr from '@/assets/qr_clanarina_2025.png';
</script>

<style scoped>
.payment-info {
  display: grid;
  gap: 1.25rem 2rem;              /* row / column gaps */
  align-items: start;
  /* Two columns when there’s room; collapses to one when not */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.payment-list ul {
  margin: 0.5rem 0 0;
  padding-left: 1.25rem;          /* keep bullets aligned */
}

.payment-qr {
  margin: 0;                      /* remove default figure margins */
}

.payment-qr img {
  display: block;
  width: 100%;
  max-width: 200px;               /* keeps QR from getting too huge on wide screens */
  height: auto;
}
</style>
