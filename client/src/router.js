import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/articles',
      name: 'articles', 
      component: () => import('./views/Articles.vue'),
    },
    {
      path: '/articles/:articleID',
      component: () => import('./views/ArticleDetail.vue'),
      children: [
        {
          path: '',
          name: 'articleDetail', 
          component: () => import('./components/Comment.vue')
        }] 
    },
    {
      path: '/myPage',
      component: () => import('./views/MyPage.vue'),
      children:[
        {
          path: 'create',
          name: 'createArticle',
          component: () => import('./components/CreateArticle.vue')
        },
        {
          path: 'myArticles', 
          name: 'myArticles',
          component: () => import('./components/MyArticles.vue')
        }
        ,
        {
          path: 'edit',
          name: 'editArticle',
          component: () => import('./components/EditArticle.vue')
        } 
      ]
    }
  ]
})
