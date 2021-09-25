/**
 * @description messages controller
 * @author SITW
 */


const { Messages, User } = require('../models/index')
const { getcreatedTime } = require('../utils/getcreatedTime')
const { SuccessModel, ErrorModel } = require('../res-model/index')


class Messagescontroller {

    // 创建信息流
    static async createMessages(ctx) {
        const { _id } = ctx.session.userInfo
        const { illustrationid, commentid, involve_id, type } = ctx.request.body
        // 判断是否创建信息流
        const state = await Messages.findOne({ Creator_id: _id, commentid })
        let data = {}
        if (state !== null) {
            // 有创建则删除
            data = await Messages.deleteOne({ Creator_id: _id, commentid, illustrationid })
        } else {
            data = await Messages.create({ illustrationid, commentid, Creator_id: _id, involve_id, type })
            try { ctx.body = new SuccessModel(data) }
            catch (ex) {
                console.error(ex)
                ctx.body = new ErrorModel(1007, '信息流创建失败')
            }
        }
        ctx.body = new SuccessModel(data)
    }

    // 获取登录用户信息流
    static async getMessages(ctx) {
        const { _id } = ctx.session.userInfo
        let userlist = []
        const message = await Messages.find({ involve_id: _id }).sort({ createdAt: -1 })

        // 处理数据
        for (let el of message) {
            const { type, createdAt, Creator_id, illustrationid } = el

            // // 根据id获取用户名和头像
            const userinfo = await User.findById(Creator_id)
            const { imgurl, username, } = userinfo

            const newtime = await getcreatedTime(createdAt)

            const newdata = {
                type,
                createdAt: newtime,
                created_userid: Creator_id,
                created_username: username,
                created_userimg: imgurl,
                illustrationid
            }
            userlist.push(newdata)
        }

        try {
            ctx.body = new SuccessModel(userlist)
        } catch (ex) {
            console.error(ex)
            ctx.body = new ErrorModel(1008, '获取信息流失败')
        }

    }

}

module.exports = Messagescontroller