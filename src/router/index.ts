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
          component: () => import('../pages/DashBoard.vue'),
        },
        {
          path: '/student-page',
          name:"student page",
          component: () => import('../pages/StudentsPage.vue'),
        },
        {
          path: '/teachers',
          name:"teachers page",
          component: () => import('../pages/TeachersPage.vue'),
        },
        {
          path: '/events',
          name:"events page",
          component: () => import('../pages/EventsPage.vue'),
        },
        {
          path: '/finance',
          name:"finance page",
          component: () => import('../pages/FinancePage.vue'),
        },
        {
          path: '/food',
          name:"food page",
          component: () => import('../pages/FoodPage.vue'),
        },
        {
          path: '/user',
          name:"user page",
          component: () => import('../pages/UsersPage.vue'),
        },
        {
          path: '/chat',
          name:"chat page",
          component: () => import('../pages/ChatPage.vue'),
        },
        {
          path: '/activity',
          name:"activity page",
          component: () => import('../pages/LatestActivity.vue'),
        },
      ],
    },
  ],
});

export default router;
