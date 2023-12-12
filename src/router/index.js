import { createWebHistory, createRouter } from "vue-router";
import routes from './routes'
 import store from "../store";
const router = createRouter({
  history: createWebHistory(),
  routes,
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }  
  }, 
}) 
 
 router.beforeEach((to, from, next) => {
   const authRequiredRoutes = ["PermissionRequests","MyRequestPermission","RequestPermission","Permission","Job","Task","default","Register","Calendar","Users","Profil","addressAdd"];
   const authNotRequiredRoutes = ["login"];
   const isAuthenticated = store.getters['login/isAuthenticated'];
   if (authNotRequiredRoutes.indexOf(to.name) > -1 && isAuthenticated) next(false);

   if (authRequiredRoutes.indexOf(to.name) > -1) {
     if (isAuthenticated) next();
     else next({ name: "login" });
   } else {
     next();
   }
 });

export default router
