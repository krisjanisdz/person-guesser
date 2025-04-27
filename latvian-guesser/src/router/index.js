import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import HelloWorld from '../components/HelloWorld.vue';
import AdminMain from '../components/admin/AdminMain.vue';
import MainPage from '../components/MainPage.vue';
import NotFound from '../components/NotFound.vue';
import AddPerson from '../components/admin/AddPerson.vue';
import AddCategory from '../components/admin/AddCategory.vue';

const routes = [
  {
    path: '/land',
    name: 'LandingPage',
    component: LandingPage,
  },
  {
    path: '/hello2',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/admin',
    name: 'AdminMain',
    component: AdminMain,
  },
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: NotFound,
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

export default router;