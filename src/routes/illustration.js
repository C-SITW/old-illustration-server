const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../res-model/index')
const loginCheck = require('../middleware/loginCheck')

const {
    getillustration,
    getrecommend,
    getillustrationInfo } = require('../controller/illustration')

router.prefix('/api/illustration')

// 获取全部插画
router.get('/', async function (ctx, next) {
    const illustration = await getillustration()
    ctx.body = new SuccessModel(illustration)
})

// 获取推荐插画
router.get('/recommend', async function (ctx, next) {
    const recommend = await getrecommend()
    ctx.body = new SuccessModel(recommend)
})

// 获取插画详情
router.get('/:id', loginCheck, async function (ctx, next) {
    const id = ctx.params.id
    const { _id } = ctx.session.userInfo

    const artistinfo = await getillustrationInfo(id, _id)
    ctx.body = new SuccessModel(artistinfo)
})


module.exports = router
