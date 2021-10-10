/**
 * @description comment controller
 * @author SITW
 */

const { SuccessModel, ErrorModel } = require('../res-model/index')
const { Comment } = require('../models/index')
const { getPagingData } = require('../utils/index')

class Commentcontroller {
    // 创建评论
    static async createComment(ctx) {
        const { _id } = ctx.session.userInfo
        const { illustrationid, content } = ctx.request.body
        const data = await Comment.create({ userid: _id, illustrationid, content })

        try { ctx.body = new SuccessModel(data) }
        catch (ex) {
            console.error(ex)
            ctx.body = new ErrorModel(1006, '评论创建失败')
        }
    }

    // 获取评论分页列表
    static async getPagerlist(ctx) {
        const { query, pagenum, pagesize } = ctx.request.body

        // 获取分页数据
        const pager = await getPagingData(pagesize, pagenum, Comment)

        ctx.body = pager
    }


    // 删除评论
    static async removeComment(ctx) {
        const { _id } = ctx.session.userInfo
        const { commentid } = ctx.request.body
        const data = await Comment.remove({ userid: _id, _id: commentid })

        try { ctx.body = new SuccessModel(data) }
        catch (ex) {
            console.error(ex)
            ctx.body = new ErrorModel(1006, '评论删除失败')
        }
    }
}



module.exports = Commentcontroller