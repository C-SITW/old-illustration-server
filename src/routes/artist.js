const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../res-model/index')
const { getArtistList, getArtistinfoById } = require('../controller/artist')

router.prefix('/api/artist')

// 获取全部艺术家信息
router.get('/', async function (ctx, next) {
    try {
        const artistList = await getArtistList()
        ctx.body = new SuccessModel(artistList)
    } catch (ex) {
        ctx.body = new ErrorModel(10005, `获取失败 ${ex.message}`)
    }

})

// 获取艺术家详情
router.get('/:id', async function (ctx, next) {
    const id = ctx.params.id

    const artistinfo = await getArtistinfoById(id)
    ctx.body = new SuccessModel(artistinfo)
})


module.exports = router
