import router from './router'

router.beforeEach((to, from, next) => {
  const user = sessionStorage.getItem()
})