/**
 * @description illustration controller
 * @author SITW
 */


const { Illustration, Comment, User, Messages } = require('../models/index')
const { SuccessModel, ErrorModel } = require('../res-model/index')
const { getcreatedTime, getPagingData, Update } = require('../utils/index')

class Illustrationcontroller {

    // 创建新插画
    static async createillustration(ctx) {
        const data = ctx.request.body

        // 保存到数据库
        const newIllustration = await Illustration.create(data)
        // 判断执行成功与否
        try {
            ctx.body = new SuccessModel(newIllustration)
        } catch (ex) {
            ctx.body = new ErrorModel(10001, `创建失败 ${ex.message}`)
        }
    }

    // 获取单个插画信息
    static async getillustrationinfo(ctx) {
        const id = ctx.params.id
        const data = await Illustration.findById(id)

        try { ctx.body = new SuccessModel(data) }
        catch (ex) { ctx.body = new ErrorModel(10004, `获取用户信息失败 ${ex.message}`) }
    }

    // 获取指插画分页列表
    static async getPagerlist(ctx) {
        const { query, pagenum, pagesize } = ctx.request.body
        // 获取分页数据
        const pager = await getPagingData(pagesize, pagenum, Illustration)

        ctx.body = pager
    }

    // 获取指定插画列表数
    static async getrecommend(ctx) {
        const { id } = ctx.params
        const count = parseInt(id)
        const illustration = await Illustration.aggregate([{ $sample: { size: count } }])

        const data = illustration.map(el => {
            const _id = el._id
            const artistname = el.artistname
            const name = el.name
            const imgurl = el.imgurl
            return { _id, artistname, name, imgurl }
        })

        ctx.body = new SuccessModel(data)
    }

    // 获取插画详情(包含评论)
    static async getillustrationInfo(ctx) {
        const id = ctx.params.id
        const userid = ctx.session.userInfo._id
        // // 获取插画详情
        const illustration = await Illustration.findById(id)
        const { _id, artistid, artistname, imgurl, name, book, cn, en, } = illustration
        // 判断用户是否收藏
        // 获取用户收藏列表
        const userinfos = await User.findById(userid)
        const collections = userinfos.collections
        const collection = collections.includes(id)
        // 获取评论
        // 获取对应插画id下的所有评论
        const illustrationid = id
        const loginid = userid
        const comments = []
        const commentlist = await Comment.find({ illustrationid }).sort({ createdAt: -1 })
        // 每条评论包含用户信息, 获赞数，以及判断登录用户是否点赞了该评论
        for (let el of commentlist) {
            // 获取评论id
            const _id = el._id
            // 获取评论内容
            const content = el.content
            // 获取评论时间
            const createdAt = el.createdAt
            const newtime = await getcreatedTime(createdAt)
            // 获取评论里用户id
            const userid = el.userid
            // 根据id获取用户名和头像
            const userinfo = await User.findById(userid)
            const { imgurl, username } = userinfo
            // 获取总赞数
            // 获取评论的id
            const commentid = el._id
            const likes = await Messages.find({ commentid })
            // 获取每条插画的总赞数
            const Total_likes = likes.length
            // 判断用户是否点赞此条评论
            let userlike = false
            const like = await Messages.findOne({ commentid, Creator_id: loginid })
            if (like !== null) { userlike = true }

            const last = {
                commentid: _id,
                userid,
                userimgurl: imgurl,
                username,
                content,
                createdAt: newtime,
                Total_likes,
                userlike
            }
            comments.push(last)
        }
        const data = { _id, artistid, artistname, imgurl, name, book, cn, en, collection, comments }
        ctx.body = new SuccessModel(data)
    }

    // 更新插画数据
    static async updataillustrationinfo(ctx) {
        const _id = ctx.params.id
        const data = ctx.request.body

        const newinfo = await Update(_id, data, Illustration)
        ctx.body = new SuccessModel(newinfo)
    }

    // 删除单个插画
    static async remove(ctx) {
        const id = ctx.params.id

        const data = await Illustration.remove({ _id: id })

        try { ctx.body = new SuccessModel(data) }
        catch (ex) {
            console.error(ex)
            ctx.body = new ErrorModel(1006, '删除失败')
        }
    }




}

module.exports = Illustrationcontroller