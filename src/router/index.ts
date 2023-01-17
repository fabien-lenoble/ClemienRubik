import { nextTick } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ScrambleView from '../views/ScrambleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/scramble/:seed?/:scrambleIndex?',
      name: 'scramble',
      component: ScrambleView,
      beforeEnter: function (to, from, next) {
        console.log(to.params.seed, to.params.scrambleIndex);
        
        if (!to.params.seed || isNaN(Number(to.params.seed))) {
          to.params.seed = Math.floor((Math.random() * 1000000000000000)).toString();
        }
        if (!to.params.scrambleIndex || isNaN(Number(to.params.scrambleIndex))) {
          to.params.scrambleIndex = '0';
        }
        next()
      },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
