/**
 * @description user controller
 * @author SITW
 */

const { SuccessModel, ErrorModel } = require('../res-model/index')
const { User, Illustration, Messages } = require('../models/index')
const { getPagingData, VerificationInfo } = require('../utils/index')

class Usercontroller {
    // 注册
    static async register(ctx) {
        // 获取前端传来的注册用户名和密码
        const { username, password } = ctx.request.body
        // 保存到数据库
        const newUser = await User.create({ username, password })
        // 判断执行成功与否
        try {
            ctx.body = new SuccessModel(newUser)
        } catch (ex) {
            ctx.body = new ErrorModel(10001, `注册失败 ${ex.message}`)
        }
    }

    // 登录
    static async login(ctx) {
        const { username, password } = ctx.request.body
        const user = await User.findOne({ username, password })
        if (user != null) {
            // 登录成功
            // 验证成功，设置 session.userInfo
            ctx.session.userInfo = { username, _id: user._id }
            // 返回成功
            ctx.body = new SuccessModel('登录成功！')
        }
        else {
            // 返回失败
            ctx.body = new ErrorModel(10002, `用户名或密码错误！`)
        }
    }

    // 获取用户信息
    static async getUserInfo(ctx) {
        const { _id } = ctx.session.userInfo
        const userinfo = await User.findById(_id)
        const likes = await Messages.find({ involve_id: _id, type: 0 })
        const Totallikes = likes.length
        const data = {
            _id: userinfo._id,
            username: userinfo.username,
            age: userinfo.age,
            sex: userinfo.sex,
            imgurl: userinfo.imgurl,
            introduction: userinfo.introduction,
            Totallikes,
            fans: userinfo.fans,
            follow: userinfo.follow,
            collections: userinfo.collections,
        }
        try { ctx.body = new SuccessModel(data) }
        catch (ex) { ctx.body = new ErrorModel(10004, `获取用户信息失败 ${ex.message}`) }
    }

    // 获取用户分页列表
    static async getPagerlist(ctx) {
        const { query, pagenum, pagesize } = ctx.request.body

        // 获取分页数据
        const pager = await getPagingData(pagesize, pagenum, User)

        // 校对数据
        const arr = ["_id", "age", "sex", "username", "createdAt"]
        const data = VerificationInfo(pager.data, arr)

        const newdata = {
            maxNum: pager.maxNum,
            pageSize: pager.pageSize,
            pageCount: pager.pageCount,
            pagenum: pager.pagenum,
            data
        }

        ctx.body = newdata
    }

    // 更新用户信息
    static async updateUserInfo(ctx) {
        const { _id } = ctx.session.userInfo
        const data = ctx.request.body
        const newuserinfo = await User.findOneAndUpdate(
            { _id },      // 条件
            { ...data },  // 更新的数据
            { new: true }
        )
        ctx.body = new SuccessModel(newuserinfo)
    }

    // 用户收藏插画
    static async collections(ctx) {
        const { _id } = ctx.session.userInfo
        const illustrationid = ctx.request.body.illustrationid

        // 获取该用户的收藏数据
        const userinfo = await User.findById(_id)
        const data = userinfo.collections

        // 判断用户是否收藏
        let state = data.includes(illustrationid)

        if (state) {
            // 用户收藏了，就取消收藏
            let index = data.indexOf(illustrationid)
            data.splice(index, 1)
        } else {
            // 用户没收藏，就进行收藏
            data.push(illustrationid)
        }

        const collections = { collections: data }
        await User.findOneAndUpdate(
            { _id },   // 条件
            { ...collections },
            { new: true }
        )
        state = data.includes(illustrationid)

        const Collection = { CollectionState: state }
        ctx.body = new SuccessModel(Collection)
    }

    // 获取用户收藏列表
    static async getCollection(ctx) {
        const { _id } = ctx.session.userInfo
        const userinfo = await User.findById(_id)
        const collections = userinfo.collections

        // 获取插画信息
        const collectionList = await Illustration.find({ _id: { $in: collections } })
        const data = collectionList.map(el => {
            const _id = el._id
            const artistname = el.artistname
            const name = el.name
            const imgurl = el.imgurl
            return {
                _id,
                artistname,
                name,
                imgurl
            }
        })
        ctx.body = new SuccessModel(data)
    }

}

module.exports = Usercontroller