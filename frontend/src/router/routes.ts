import { RouteConfig } from 'vue-router';
import PageHome from 'pages/PageHome.vue';
import PageMap from 'pages/PageMap.vue';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: PageHome },
      { path: '/map', component: PageMap },
      { path: '/new-post', component: () => import('pages/PageCreatePost.vue') },
      { path: '/post/:id', component: () => import('pages/PagePostDetail.vue') },
      {
        path: '/admin',
        component: () => import('pages/PageAdmin.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageAuth.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
