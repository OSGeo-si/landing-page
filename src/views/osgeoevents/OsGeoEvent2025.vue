<template>
  <div class="container">
    <div class="content">
      <div class="head">
        <h1>Open Source Geospatial Slovenija</h1>
        <div class="location-date">
          <p>Gozdarski inštitut Slovenije</p>
          <p>Večna pot 2, 1000 Ljubljana</p>
          <p class="date">22 - 23 oktober 2025</p>
          <a href="https://github.com/OSGeo-si" target="_blank">
<!--            <img src="../../assets/github.svg" alt="Github" class="icon"/>-->
          </a>
        </div>
      </div>

      <h1 style="text-align: center" class="m-5">Program dogodka bo objavljen kmalu. </h1>

<!--      <section class="program">-->
<!--        <h2>Program dogodka</h2>-->


<!--        <div class="card">-->
<!--          <div class="conference-card">-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="card">-->
<!--          <h2>Delavnice 22. oktober 2025</h2>-->
<!--          <div class="workshops">-->
<!--            <div class="workshop-card">-->
<!--              <div class="workshop-title">Point-Cloud Acrobatics</div>-->
<!--              <div class="workshop-presenter">Tomaž Žagar & Alen Mangafić</div>-->
<!--              <div class="workshop-time">8:00</div>-->
<!--              <div class="workshop-room">Učilnica A1</div>-->
<!--              <div class="workshop-desc">Kratek opis: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>-->
<!--            </div>-->
<!--            <div class="workshop-card">-->
<!--              <div class="workshop-title">QGIS</div>-->
<!--              <div class="workshop-presenter">Tomaž Šturm</div>-->
<!--              <div class="workshop-time">9:30</div>-->
<!--              <div class="workshop-room">Učilnica B2</div>-->
<!--              <div class="workshop-desc">Kratek opis: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>-->
<!--            </div>-->
<!--            <div class="workshop-card">-->
<!--              <div class="workshop-title">GIT</div>-->
<!--              <div class="workshop-presenter">Nejc Dougan</div>-->
<!--              <div class="workshop-time">11:00</div>-->
<!--              <div class="workshop-room">Učilnica C3</div>-->
<!--              <div class="workshop-desc">Kratek opis: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>-->
<!--            </div>-->
<!--            <div class="workshop-card">-->
<!--              <div class="workshop-title">Priprava razvojnega okolja</div>-->
<!--              <div class="workshop-presenter">TBD</div>-->
<!--              <div class="workshop-time">12:30</div>-->
<!--              <div class="workshop-room">Učilnica D4</div>-->
<!--              <div class="workshop-desc">Kratek opis: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        &lt;!&ndash; Conference section unchanged &ndash;&gt;-->
<!--        <div class="card">-->
<!--          <h2>Konferenca 23. oktober 2025</h2>-->
<!--          <div class="conference-cards">-->
<!--            <div class="conference-card">-->
<!--              <div class="conference-time">8:30</div>-->
<!--              <div class="conference-title">Uvodni pozdrav</div>-->
<!--              <div class="conference-presenter">Tomaž Šturm</div>-->
<!--            </div>-->
<!--            <div class="conference-card">-->
<!--              <div class="conference-time">8:40</div>-->
<!--              <div class="conference-title">Infinite land for the Penguins</div>-->
<!--              <div class="conference-presenter">Gerardus Mercator</div>-->
<!--              <div class="conference-desc">-->
<!--                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et-->
<!--                dolore magna aliqua.-->
<!--                Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna-->
<!--                aliqua.-->
<!--                Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea-->
<!--                commodo consequat.-->
<!--                Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna-->
<!--                aliqua.-->

<!--              </div>-->
<!--            </div>-->
<!--            <div class="conference-card">-->
<!--              <div class="conference-time">9:00</div>-->
<!--              <div class="conference-title">Top</div>-->
<!--              <div class="conference-presenter">Gerardus Mercator</div>-->
<!--              <div class="conference-desc">-->
<!--                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et-->
<!--                dolore magna aliqua.-->
<!--                Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna-->
<!--                aliqua.-->
<!--                Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea-->
<!--                commodo consequat.-->
<!--                Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna-->
<!--                aliqua.-->

<!--              </div>-->
<!--            </div>-->
<!--          </div>-->

<!--        </div>-->
<!--      </section>-->
<!--      <section class="registration card">-->
<!--        <h2>Prijava na dogodek</h2>-->
<!--        <ul>-->
<!--          <li>Prijava na konferenco je <span class="free">BREZPLAČNA</span>.</li>-->
<!--          <li>Cena delavnice je <span class="price">20 EUR (zastonj za člane)</span>.</li>-->
<!--          <li>Prijave sprejemamo do vključno <strong>14. 10. 2025 do 12. ure</strong>.</li>-->
<!--        </ul>-->
<!--        <button class="register-btn">PRIJAVNI OBRAZEC</button>-->
<!--      </section>-->
    </div>
  </div>
  <!--  <button class="fixed-register-btn">PRIJAVNI OBRAZEC</button>-->
</template>

<style scoped>
/* Existing styles ... */
.workshops {
  display: flex;
  flex-wrap: nowrap;
  gap: 1.2em;
  margin-top: 1em;
}

.card {
  margin-top: 2.5em;
}

.card:first-of-type {
  margin-top: 0;
}

.workshop-card {
  background: var(--background-main);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1.5em;
  min-width: 180px;
  flex: 1 1 0;
  font-family: 'Segoe UI', Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid var(--primary-color);
  transition: box-shadow 0.2s, border 0.2s;
}

.workshop-card:hover {
  box-shadow: 0 4px 16px rgba(42, 122, 226, 0.12);
  border: 1px solid var(--primary-color);
}

.workshop-title {
  font-size: 1.15em;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.3em;
}

.workshop-presenter {
  color: var(--secondary-color);
  margin-bottom: 0.2em;
}

.workshop-time,
.workshop-room {
  color: var(--gray);
  margin-bottom: 0.2em;
}

.workshop-desc {
  font-size: 0.98em;
  color: var(--gray-dark);
}

.conference-cards {
  display: flex;
  flex-direction: column;
  gap: 1.2em;
  margin-top: 1em;
}

.conference-card {
  background: var(--white);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(42, 122, 226, 0.07);
  padding: 1.2em 1.5em;
  border: 1px solid var(--primary-color);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  transition: box-shadow 0.2s, border 0.2s;
}

.conference-card:hover {
  box-shadow: 0 4px 16px rgba(42, 122, 226, 0.14);
  border: 1px solid var(--secondary-color);
}

.conference-time {
  font-size: 1.1em;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 0.2em;
}

.conference-title {
  font-size: 1.15em;
  font-weight: bold;
  color: var(--secondary-color);
  margin-bottom: 0.2em;
}

.conference-presenter {
  font-size: 1em;
  color: var(--gray-dark);
  margin-bottom: 0.2em;
}

.conference-desc {
  font-size: 0.98em;
  color: #444;
  margin-top: 0.3em;
}

.registration.card {
  background: linear-gradient(135deg, #f8fbff 80%, #e3eaf3 100%);
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(42, 122, 226, 0.09);
  padding: 2em 2.5em;
  margin-top: 2.5em;
  border: 1px solid #e3eaf3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.registration.card h2 {
  color: var(--primary-color);
  font-size: 1.35em;
  margin-bottom: 1em;
}


.registration.card ul {
  margin-bottom: 1.5em;
  font-size: 1.08em;
  color: var(--gray-dark);
  padding-left: 1.2em;
}

.registration.card .free {
  color: var(--primary-color);
  font-weight: bold;
}

.registration.card .price {
  color: var(--secondary-color);
  font-weight: bold;
}

.register-btn {
  background: var(--secondary-color);
  color: #fff;
  font-size: 1.18em;
  font-weight: bold;
  padding: 1em 2.5em;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(42, 122, 226, 0.13);
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
  margin-top: 0.7em;
  letter-spacing: 0.04em;
}

.register-btn:hover {
  background: var(--primary-color);
  box-shadow: 0 4px 18px rgba(42, 122, 226, 0.22);
  transform: translateY(-2px) scale(1.05);
}

.head {
  background: #f6fafd;
  border-radius: 16px;
  box-shadow: 0 2px 14px rgba(42, 122, 226, 0.08);
  padding: 2.2em 2.5em 1.5em 2.5em;
  margin-bottom: 2.5em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #e3eaf3;
}

.head h1 {
  font-size: 2.3em;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 0.5em;
  letter-spacing: 0.03em;
  position: relative;
}

.head h1::after {
  content: '';
  display: block;
  width: 80px;
  height: 5px;
  background: var(--secondary-color);
  border-radius: 3px;
  margin-top: 0.3em;
}

.location-date {
  margin-top: 1em;
  font-size: 1.08em;
  color: var(--secondary-color);
  display: flex;
  flex-direction: column;
  gap: 0.2em;
}

.location-date p {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5em;
}

.location-date .date {
  font-weight: bold;
  color: var(--secondary-color);
  font-size: 1.12em;
  margin-top: 0.3em;
}


.fixed-register-btn {
  position: fixed;
  right: 2em;
  top: 80%;
  transform: translateY(-50%);
  background: #2a7ae2;
  color: #fff;
  font-size: 1.18em;
  font-weight: bold;
  padding: 1em 2.5em;
  border: 2px solid #1a4d7a;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(42, 122, 226, 0.13);
  cursor: pointer;
  z-index: 1000;
  letter-spacing: 0.04em;
}

.fixed-register-btn:hover {
  background: #1a4d7a;
  box-shadow: 0 4px 18px rgba(42, 122, 226, 0.22);
  transform: translateY(-50%) scale(1.05);
}

.head-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.github-link {
  margin-left: 1.5em;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
}

.github-link:hover svg {
  transform: scale(1.15);
  filter: brightness(1.2);
}

</style>