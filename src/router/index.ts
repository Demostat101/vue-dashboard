import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      name: 'layout',
      component: () => import('../layouts/DashBoardLayouts.vue'), // lazy-loaded
      children: [
        {
          path: '',
          name:"dashboard",
          component: () => import('../views/DashBoard.vue'),
        },
        {
          path: '/student-page',
          name:"student page",
          component: () => import('../views/StudentsPage.vue'),
        },
        {
          path: '/teachers',
          name:"teachers page",
          component: () => import('../views/TeachersPage.vue'),
        },
        {
          path: '/events',
          name:"events page",
          component: () => import('../views/EventsPage.vue'),
        },
        {
          path: '/finance',
          name:"finance page",
          component: () => import('../views/FinancePage.vue'),
        },
        {
          path: '/food',
          name:"food page",
          component: () => import('../views/FoodPage.vue'),
        },
        {
          path: '/user',
          name:"user page",
          component: () => import('../views/UsersPage.vue'),
        },
        {
          path: '/chat',
          name:"chat page",
          component: () => import('../views/ChatPage.vue'),
        },
        {
          path: '/activity',
          name:"activity page",
          component: () => import('../views/LatestActivity.vue'),
        },
      ],
    },
  ],
});

export default router;
