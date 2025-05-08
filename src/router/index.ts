import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { ...savedPosition, behavior: 'smooth' }
    }
    if (to.hash) {
      console.log(to.hash)
      const target = document.querySelector(to.hash)
      if (target) {
        const isMobile = window.innerWidth <= 767
        const header = document.querySelector('.header__inner')
        const headerHeight = isMobile && header instanceof HTMLElement ? header.offsetHeight : 0
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight

        window.scrollTo({
          top,
          behavior: 'smooth',
        })

        return false
      }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
