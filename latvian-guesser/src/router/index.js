import { createRouter, createWebHistory } from 'vue-router';
import AdminMain from '../components/admin/AdminMain.vue';
import MainPage from '../components/MainPage.vue';
import NotFound from '../components/NotFound.vue';
import AddPerson from '../components/admin/AddPerson.vue';
import AddCategory from '../components/admin/AddCategory.vue';
import GuestPage from '../components/GuestPage.vue';
import RegisterPage from '../components/user/RegisterPage.vue';
import UserMain from '../components/user/UserMain.vue';
import LoginPage from '../components/user/LoginPage.vue';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/user',
    name: 'UserMain',
    component: UserMain,
    meta: {
      requiresAuth: true  // Route accessed only if authorized
    }
  },
  {
    path: '/admin',
    name: 'AdminMain',
    component: AdminMain,
    meta: {
      requiresAuth: true  // Route accessed only if authorized
    }
  },
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/guest',
    name: 'GuestPage',
    component: GuestPage,
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/add',
    name: 'Add',
    children: [
      {
        path: 'person',
        name: 'AddPerson',
        component: AddPerson,
      },
      {
        path: 'category',
        name: 'AdCategory',
        component: AddCategory,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token)
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      next('/login');
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router;