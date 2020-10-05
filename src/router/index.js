import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '@/views/Recruiter.vue'
import Candidate from '@/views/Recruiter.vue'
import Recruiter from '@/views/Recruiter.vue'
import Jobs from '@/views/Jobs.vue'
import Profile from '@/views/Profile.vue'
import JobDetails from '@/views/JobDetails.vue'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/views/Landing.vue'),
    // component: Landing,
    logged: false
  },
  {
    path: '/candidate',
    name: 'Home Candidato',
    component: () => import('@/views/Candidate.vue'),
    // component: Candidate,
    logged: true
  },
  {
    path: '/company',
    name: 'Home Empresa',
    component: () => import('@/views/Company.vue'),
    // component: Candidate,
    logged: true
  },
  {
    path: '/recruiter',
    name: 'Home Recrutador',
    component: () => import('@/views/Recruiter.vue'),
    // component: Recruiter,
    logged: true,
    hidden: true
  },
  {
    path: '/jobs',
    name: 'Vagas',
    component: () => import('@/views/Jobs.vue'),
    // component: Jobs,
    logged: true,
    hidden: true
  },
  {
    path: '/jobs/:id',
    name: 'Detalhes da Vaga',
    component: () => import('@/views/JobDetails.vue'),
    // component: JobDetails,
    logged: true,
    hidden: true
  },
  {
    path: '/profile',
    name: 'Perfil',
    component: () => import('@/views/Profile.vue'),
    // component: Profile,
    logged: true,
    hidden: true
  },
  {
    path: '/jobs/:id/exams/users/:userId',
    name: 'Exames',
    component: () => import('@/views/Exams.vue'),
    logged: true,
    hidden: true
  },
  {
    path: '/jobs/edit/:id',
    name: 'Editar Vaga',
    component: () => import('@/views/EditJob.vue'),
    logged: true,
    hidden: true
  },
  {
    path: '/jobs/create/company/:id/recruiter/:userId',
    name: 'Cadastrar nova Vaga',
    component: () => import('@/views/CreateJob.vue'),
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
