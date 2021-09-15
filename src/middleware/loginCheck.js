/**
 * @description 登录校验
 * @author SITW
 */


const { ErrorModel } = require('../res-model/index')

module.exports = async (ctx, next) => {
    const session = ctx.session
    if (session && session.userInfo) {
        await next()
        return
    }
    ctx.body = new ErrorModel(10003, '用户尚未登录')
}

