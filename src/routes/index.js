const router = require('koa-router')()


router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello SITW!'
  })
})


module.exports = router
