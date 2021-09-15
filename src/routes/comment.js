const router = require('koa-router')()
const { SuccessModel, ErrorModel } = require('../res-model/index')
const loginCheck = require('../middleware/loginCheck')
const { createComment } = require('../controller/comment')

router.prefix('/api/comment')

// 创建评论
router.post('/', loginCheck, async function (ctx, next) {
    const { _id } = ctx.session.userInfo
    const data = ctx.request.body

    try {
        const newComment = await createComment(_id, data)
        ctx.body = new SuccessModel(newComment)
    } catch (ex) {
        console.error(ex)
        ctx.body = new ErrorModel(1006, '评论创建失败')
    }
})


module.exports = router
