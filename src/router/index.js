import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import Candidate from '@/views/Candidate.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/candidate',
    name: 'Candidate',
    component: Candidate
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
