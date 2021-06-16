import router from './router'

router.beforeEach((to, from, next) => {
  const user = JSON.parse(sessionStorage.getItem('vuex'));

  if (!user && to.path !== '/login') {
    next({path: '/login'})
  }else {
    next()
  }
})