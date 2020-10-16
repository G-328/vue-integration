import router from './router'

router.beforeEach((to, from, next) => {
  const user = sessionStorage.getItem('user');

  if (!user && to.path !== '/login') {
    next({path: '/login'})
  }else {
    next()
  }
})