import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'E-VALUE WORKS ホームページ作成セミナー',
        description: 'E-VALUE WORKSがお届けするセミナー情報をまとめたサイトです。',
      },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView,
      meta: {
        title: 'プライバシーポリシー | E-VALUE WORKS',
        description: '',
      },
    },
    {
      path: '/:catchAll(.*)*',
      name: 'notFound',
      component: NotFound,
      meta: {
        title: 'お探しのページが見つかりませんでした | E-VALUE WORKS',
        description: '',
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { ...savedPosition, behavior: 'instant' }
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
    return { top: 0, behavior: 'instant' }
  },
})

export default router
