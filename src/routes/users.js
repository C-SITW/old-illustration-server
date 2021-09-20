const router = require('koa-router')()
const loginCheck = require('../middleware/loginCheck')
const { SuccessModel, ErrorModel } = require('../res-model/index')
const {
    register,
    login,
    getUserInfo,
    updateUserInfo,
    collections,
    getCollection
} = require('../controller/user')


router.prefix('/api/user')

// 注册用户
router.post('/register', async function (ctx, next) {
    // 获取前端传来的注册用户名和密码
    const { username, password } = ctx.request.body

    // 判断执行成功与否
    try {
        const newUser = await register(username, password)
        ctx.body = new SuccessModel(newUser)
    } catch (ex) {
        ctx.body = new ErrorModel(10001, `注册失败 ${ex.message}`)
    }
})

// 登录
router.post('/login', async function (ctx, next) {
    const { username, password } = ctx.request.body

    // 登录验证
    const res = await login(username, password)
    const { state, _id } = res

    if (state) {
        // 验证成功，设置 session.userInfo
        ctx.session.userInfo = {
            username,
            _id
        }
        // 返回成功
        ctx.body = new SuccessModel('登录成功！')
    } else {
        // 返回失败
        ctx.body = new ErrorModel(10002, `用户名或密码错误！`)
    }
})

// 获取用户信息
router.get('/info', loginCheck, async function (ctx, next) {
    const { _id } = ctx.session.userInfo

    try {
        const user = await getUserInfo(_id)
        ctx.body = new SuccessModel(user)
    } catch (ex) {
        ctx.body = new ErrorModel(10004, `获取用户信息失败 ${ex.message}`)
    }
})

// 更新用户信息
router.patch('/info/', loginCheck, async function (ctx, next) {
    const { _id } = ctx.session.userInfo
    const data = ctx.request.body

    // 更新数据
    const newuserinfo = await updateUserInfo(_id, data)
    ctx.body = new SuccessModel(newuserinfo)

})

// 用户收藏插画
router.patch('/collection', loginCheck, async function (ctx, next) {
    const { _id } = ctx.session.userInfo
    const illustrationid = ctx.request.body.illustrationid

    // 更新数据
    const data = await collections(_id, illustrationid)
    ctx.body = new SuccessModel(data)
})


// 获取用户收藏列表
router.get('/collection', loginCheck, async function (ctx, next) {
    const { _id } = ctx.session.userInfo
    const collections = await getCollection(_id)
    ctx.body = new SuccessModel(collections)
})

module.exports = router
