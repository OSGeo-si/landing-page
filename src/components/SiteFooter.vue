<template>
  <footer class="mt-16 border-t border-moss-700/10 bg-paper-2">
    <div class="container-page grid gap-10 py-12 md:grid-cols-3">
      <div>
        <router-link to="/" class="flex items-center gap-3 no-underline">
          <img :src="logo" alt="OSGeo Slovenija" class="h-10 w-auto" />
          <span class="font-serif text-lg font-semibold text-moss-800">OSGeo Slovenija</span>
        </router-link>
        <p class="mt-4 max-w-xs text-sm text-moss-900/70">
          Razvoj in promocija odprtokodnih geoprostorskih tehnologij ter odprtih podatkovnih standardov v Sloveniji.
        </p>
      </div>

      <div>
        <p class="eyebrow">Razišči</p>
        <ul class="mt-3 space-y-2 text-sm">
          <li><router-link to="/osgeo-konferenca" class="text-moss-900/80 no-underline hover:text-moss-700">Konferenca</router-link></li>
          <li><router-link to="/geodev" class="text-moss-900/80 no-underline hover:text-moss-700">GeoDev</router-link></li>
          <li><router-link to="/svizec" class="text-moss-900/80 no-underline hover:text-moss-700">Svizec</router-link></li>
          <li><router-link to="/about" class="text-moss-900/80 no-underline hover:text-moss-700">O društvu</router-link></li>
        </ul>
      </div>

      <div>
        <p class="eyebrow">Povezave</p>
        <ul class="mt-3 space-y-2 text-sm">
          <li>
            <a href="mailto:osgeoslovenija@gmail.com" class="text-moss-900/80 no-underline hover:text-moss-700">osgeoslovenija@gmail.com</a>
          </li>
          <li>
            <a href="http://eepurl.com/i3SUYE" target="_blank" rel="noopener" class="text-moss-900/80 no-underline hover:text-moss-700">Newsletter</a>
          </li>
          <li>
            <a href="https://wiki.osgeo.org/wiki/Slovenia" target="_blank" rel="noopener" class="text-moss-900/80 no-underline hover:text-moss-700">OSGeo Wiki</a>
          </li>
        </ul>
        <div class="mt-4 flex items-center gap-3">
          <a href="https://github.com/OSGeo-si" target="_blank" rel="noopener" aria-label="GitHub" class="text-moss-800 hover:text-moss-600">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.52-1.31-1.27-1.66-1.27-1.66-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.76.11 3.05.73.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.18c0 .31.21.66.8.55C20.21 21.38 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" /></svg>
          </a>
          <a href="https://discord.gg/XQGqrz8CgA" target="_blank" rel="noopener" aria-label="Discord" class="text-moss-800 hover:text-moss-600">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.075.075 0 0 0-.079.038c-.21.375-.444.864-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.51 12.51 0 0 0-.617-1.249.077.077 0 0 0-.079-.037 19.736 19.736 0 0 0-4.885 1.515.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.075.075 0 0 0-.041-.105 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.127c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .079.009c.12.099.245.198.372.292a.077.077 0 0 1-.006.127c-.598.349-1.22.645-1.873.892a.076.076 0 0 0-.04.105c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.029 19.834 19.834 0 0 0 6.002-3.03.077.077 0 0 0 .031-.056c.5-5.177-.838-9.674-3.548-13.66a.06.06 0 0 0-.031-.029ZM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.419 0 1.334-.955 2.419-2.157 2.419Zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.419 0 1.334-.946 2.419-2.157 2.419Z" /></svg>
          </a>
          <a href="https://www.linkedin.com/company/osgeo-slovenija/about" target="_blank" rel="noopener" aria-label="LinkedIn" class="text-moss-800 hover:text-moss-600">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.56c0-1.33-.03-3.04-1.86-3.04-1.86 0-2.14 1.45-2.14 2.95v5.65H9.35V9h3.4v1.56h.05a3.73 3.73 0 0 1 3.36-1.85c3.6 0 4.26 2.37 4.26 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.11 2.06 2.06 0 0 1 0 4.11Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0Z" /></svg>
          </a>
        </div>
      </div>
    </div>
    <div class="border-t border-moss-700/10">
      <div class="container-page flex flex-col items-start justify-between gap-2 py-5 text-xs text-moss-900/60 md:flex-row md:items-center">
        <p>© {{ year }} OSGeo Slovenija</p>
        <p>Vsebina je odprta. Prispevaj na <a href="https://github.com/OSGeo-si" target="_blank" rel="noopener" class="underline decoration-moss-300 underline-offset-4 hover:decoration-moss-700">GitHub</a>.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import logo from '@/assets/osgeo-si-logo.svg'

const year = new Date().getFullYear()
</script>
