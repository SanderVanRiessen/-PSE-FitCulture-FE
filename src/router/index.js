import { createRouter, createWebHashHistory } from 'vue-router';
import LandingPage from '@/views/LandingPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import ArticlesPage from '@/views/ArticlesPage.vue';
import ArticleDetail from '@/views/ArticleDetailPage.vue';
import UserDashboardPage from '@/views/UserDashboardPage.vue';
import ExercisePlanDashboardPage from '@/views/ExercisePlanDashboardPage.vue';
import ExercisePlanDetailPage from '@/views/ExercisePlanDetailPage.vue';

const routes = [
  { path: '/', name: 'default', component: LandingPage },
  { path: '/landingpage', name: 'landing', component: LandingPage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/articles', name: 'articles', component: ArticlesPage },
  { path: '/article/:id', name: 'articleDetail', component: ArticleDetail },
  { path: '/dashboard/user', name: 'dashboard', component: UserDashboardPage },
  {
    path: '/dashboard/exerciseplan',
    name: 'exerciseplan',
    component: ExercisePlanDashboardPage,
  },
  {
    path: '/dashboard/exerciseplan/:id',
    name: 'exerciseplanDetail',
    component: ExercisePlanDetailPage,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
