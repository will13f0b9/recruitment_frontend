import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import Candidate from '@/views/Candidate.vue'
import Recruiter from '@/views/Recruiter.vue'
import Jobs from '@/views/Jobs.vue'
import JobDetails from '@/views/JobDetails.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
    logged: false
  },
  {
    path: '/candidate',
    name: 'Home Candidato',
    component: Candidate,
    logged: true
  },
  {
    path: '/recruiter',
    name: 'Home Recrutador',
    component: Recruiter,
    logged: true,
    hidden: true
  },
  {
    path: '/jobs',
    name: 'Vagas',
    component: Jobs,
    logged: true,
    hidden: true
  },
  {
    path: '/jobs/:id',
    name: 'Detalhes da Vaga',
    component: JobDetails,
    logged: true,
    hidden: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
