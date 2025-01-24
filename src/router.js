// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/HomePage.vue'
import OsGeoConf from './views/OsGeoConfPage.vue'
import GeoDev from './views/GeoDevPage.vue'
import About from './views/AboutPage.vue'
import Teren from './views/TerenPage.vue'

const routes = [
    { path: '/', name: 'Home', component: Home},
    { path: '/osgeo-konferenca', name: 'OsGeoConf', component: OsGeoConf },
    { path: '/geodev', name: 'GeoDev', component: GeoDev },
    { path: '/teren', name: 'Teren', component: Teren },
    { path: '/about', name: 'About', component: About },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
