// src/router.js
import {createRouter, createWebHashHistory} from 'vue-router'
import Home from './views/HomePage.vue'
import OsGeoConf from './views/OsGeoConfPage.vue'
import GeoDev from './views/GeoDevPage.vue'
import About from './views/AboutPage.vue'
import Teren from './views/TerenPage.vue'
import OsGeoEvent2025 from "@/views/osgeoevents/OsGeoEvent2025.vue";

const routes = [
    {path: '/', redirect: '/home'},
    { path: '/home', name: 'Home', component: Home},
    { path: '/osgeo-konferenca', name: 'OsGeoConf', component: OsGeoConf },
    { path: '/geodev', name: 'GeoDev', component: GeoDev },
    { path: '/teren', name: 'Teren', component: Teren },
    { path: '/about', name: 'About', component: About },
    { path: '/osgeo-konferenca/2025', name: 'OsGeoKonferenca2025', component: OsGeoEvent2025},
    {path: '/geodev/:geoId', name: 'GeoDevDetail', component: () => import('@/views/GeoDevEvent.vue')
}
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
