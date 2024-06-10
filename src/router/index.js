import { createRouter, createWebHashHistory } from 'vue-router';
import LandingPage from '@/views/LandingPage.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import ArticlesPage from '@/views/ArticlesPage.vue';
import ArticleDetail from '@/views/ArticleDetailPage.vue';
import UserDashboardPage from '@/views/UserDashboardPage.vue';
import ExercisePlanDashboardPage from '@/views/ExercisePlanDashboardPage.vue';
import ExercisePlanDetailPage from '@/views/ExercisePlanDetailPage.vue';
import JoinExercisePlanPage from '@/views/JoinExercisePlanPage.vue';
import JoinExercisePlanDetailPage from '@/views/JoinExercisePlanDetailPage.vue';
import MyExercisePlanPage from '@/views/MyExercisePlanPage.vue';
import MyExercisePlanDetailPage from '@/views/MyExercisePlanDetailPage.vue';
import ForumLanding from '@/views/Forum/ForumLanding.vue';
import CategoryLanding from '@/views/Forum/CategoryLanding.vue';
import TopicLanding from '@/views/Forum/TopicLanding.vue';
import ChallengeListPage from '@/views/ChallengeListPage.vue';
import ChallengeDetailPage from '@/views/ChallengeDetailPage.vue';
import CreateChallengePage from '@/views/CreateChallengePage.vue';
import AcceptChallengePage from '@/views/AcceptChallengePage.vue';

const routes = [
  { path: '/', name: 'default', component: LandingPage },
  { path: '/landingpage', name: 'landing', component: LandingPage },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/articles', name: 'articles', component: ArticlesPage },
  { path: '/article/:id', name: 'articleDetail', component: ArticleDetail },
  { path: '/forum/landing', name: 'forum', component: ForumLanding },
  {
    path: '/forum/topics/:topicId',
    name: 'topics',
    component: TopicLanding,
    props: true,
  },
  {
    path: '/forum/:categoryId/topics',
    name: 'category',
    component: CategoryLanding,
    props: (route) => ({
      categoryId: route.params.categoryId,
      categoryName: route.query.categoryName,
    }),
  },
  {
    path: '/joinexerciseplan',
    name: 'joinexerciseplan',
    component: JoinExercisePlanPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/joinexerciseplan/:id',
    name: 'joinexerciseplanDetail',
    component: JoinExercisePlanDetailPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/myexerciseplan',
    name: 'myexerciseplan',
    component: MyExercisePlanPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/myexerciseplan/:id',
    name: 'myexerciseplanDetail',
    component: MyExercisePlanDetailPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/user',
    name: 'dashboard',
    component: UserDashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/exerciseplan',
    name: 'exerciseplan',
    component: ExercisePlanDashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/exerciseplan/:id',
    name: 'exerciseplanDetail',
    component: ExercisePlanDetailPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/challenges',
    name: 'challenges',
    component: ChallengeListPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/challenge/:id',
    name: 'challengeDetail',
    component: ChallengeDetailPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/create-challenge',
    name: 'createChallenge',
    component: CreateChallengePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/accept-challenge',
    name: 'acceptChallenge',
    component: AcceptChallengePage,
    meta: { requiresAuth: true },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isPrivatePage = to.matched.some((record) => record.meta.requiresAuth);
  if (isPrivatePage && !localStorage.getItem('token')) {
    next({ path: '/login', name: 'login' });
  } else {
    next();
  }
});
