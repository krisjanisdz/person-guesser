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
import Categories from '../components/user/Categories.vue';
import History from '../components/user/History.vue';
import Profile from '../components/user/Profile.vue';
import Game from '../components/Game.vue';


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
    path: '/game',
    name: 'UserGamePage',
    component: Game,
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
  },
  {
    path: '/history',
    name: 'HistoryPage',
    component: History,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/add',
    name: 'Add',
    component: AdminMain,
    meta: { requiresAuth: true, adminOnly: true }
  },
  {
    path: '/add/person',
    name: 'AddPerson',
    component: AddPerson,
    meta: { requiresAuth: true, adminOnly: true }
  },
  {
    path: '/add/category',
    name: 'AddCategory',
    component: AddCategory,
    meta: { requiresAuth: true, adminOnly: true }
  }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


router.beforeEach((to, from, next) => {
  
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  
  // Redirect logged-in users away from login/register
  if ((to.path === '/login' || to.path === '/register') && token) {
    return next(isAdmin ? '/add' : '/user');
  }
  // Route requires auth
  if (to.meta.requiresAuth && !token) {
    return next('/login');
  }
  // Route is for admin only (optional)
  if (to.meta.adminOnly && !isAdmin) {
    return next('/user');
  }
  next();
});


export default router;