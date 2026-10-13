import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AdmisionesView from '../views/AdmisionesView.vue'
import AvisosView from '../views/AvisosView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { title: 'Inicio' } },
  { path: '/admisiones', name: 'admisiones', component: AdmisionesView, meta: { title: 'Admisiones' } },
  { path: '/avisos', name: 'avisos', component: AvisosView, meta: { title: 'Avisos y novedades' } },
  { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFoundView, meta: { title: 'Página no encontrada' } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 84 }
    if (to.path !== from.path) return { top: 0 }
    return undefined
  },
})

router.afterEach((to) => {
  document.title = `${to.meta.title || 'Inicio'} | Universidad UNISITE`
})

export default router
