const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../res-model/index')
const { createMessages, getMessages } = require('../controller/messages')

router.prefix('/api/messages')


// 创建信息流
router.post('/', loginCheck, async function (ctx, next) {
    const { _id } = ctx.session.userInfo
    const data = ctx.request.body

    try {
        const newMessages = await createMessages(_id, data)
        ctx.body = new SuccessModel(newMessages)
    } catch (ex) {
        console.error(ex)
        ctx.body = new ErrorModel(1007, '信息流创建失败')
    }

})


// 获取登录用户信息流
router.get('/', loginCheck, async function (ctx, next) {
    const { _id } = ctx.session.userInfo

    try {
        const messages = await getMessages(_id)
        ctx.body = new SuccessModel(messages)
    } catch (ex) {
        console.error(ex)
        ctx.body = new ErrorModel(1008, '获取信息流失败')
    }

})

module.exports = router
