import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/HomePage.vue') },
  { path: '/home', redirect: '/' },
  { path: '/about', name: 'About', component: () => import('@/views/AboutPage.vue') },
  { path: '/osgeo-konferenca', name: 'OsGeoConf', component: () => import('@/views/OsGeoConfPage.vue') },
  { path: '/geodev', name: 'GeoDev', component: () => import('@/views/GeoDevPage.vue') },
  { path: '/svizec', name: 'Svizec', component: () => import('@/views/SvizecPage.vue') },
  { path: '/teren', name: 'Teren', component: () => import('@/views/TerenPage.vue') },
  { path: '/kje-tebe-karta-zuli', name: 'KjeTebeKartaZuli', component: () => import('@/views/KjeTebeKartaZuliPage.vue') },
  { path: '/dogodki', name: 'Events', component: () => import('@/views/EventsPage.vue') },
  { path: '/dogodki/:slug', name: 'Event', component: () => import('@/views/EventPage.vue') },

  { path: '/novice', name: 'News', component: () => import('@/views/NewsPage.vue') },
  { path: '/novice/:slug', name: 'NewsItem', component: () => import('@/views/NewsItemPage.vue') },

  // Back-compat with old links
  { path: '/geodev/:slug', redirect: to => `/dogodki/${to.params.slug}` },
  { path: '/osgeo-konferenca/:slug', redirect: to => `/dogodki/${to.params.slug}` },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
