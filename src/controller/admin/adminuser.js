/**
 * @description adminuser controller
 * @author SITW
 */

const { SuccessModel, ErrorModel } = require('../../res-model/index')
const { Adminuser } = require('../../models/index')
const { Update, getPagingData, VerificationInfo } = require("../../utils/index")

class Adminusercontroller {
    // 创新新管理用户
    static async register(ctx) {
        // 获取前端传来的数据
        const { username, password, jurisdiction, type, role_name } = ctx.request.body
        // 保存到数据库
        const newUser = await Adminuser.create({ username, password, jurisdiction, type, role_name })
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
        const user = await Adminuser.findOne({ username, password })
        if (user != null) {
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

    // 获取单个用户信息
    static async getUserinfo(ctx) {
        const id = ctx.params.id
        const info = await Adminuser.findById(id)

        const arr = ['_id', 'username', 'jurisdiction', 'role_name', 'createdAt', 'type']
        const data = VerificationInfo([info], arr)

        try { ctx.body = new SuccessModel(data) }
        catch (ex) { ctx.body = new ErrorModel(10004, `获取用户信息失败 ${ex.message}`) }
    }

    // 获取指定用户列表
    static async getUserlist(ctx) {
        const { query, pagenum, pagesize } = ctx.request.body

        // 获取分页数据
        const pager = await getPagingData(pagesize, pagenum, Adminuser)

        // 获取校验后数据
        const arr = ['_id', 'username', 'jurisdiction', 'role_name', 'createdAt', 'type']
        const data = VerificationInfo(pager.data, arr)

        ctx.body = data

    }

    // 修改用户状态
    static async updatastate(ctx) {
        const _id = ctx.params.id
        const type = ctx.params.type

        const newuserinfo = await Adminuser.findOneAndUpdate(
            { _id },      // 条件
            { mg_state: type },  // 更新的数据
            { new: true }
        )
        ctx.body = new SuccessModel(newuserinfo)
    }

    // 修改用户权限
    static async updatauserinfo(ctx) {
        const _id = ctx.params.id
        const data = ctx.request.body

        if (data.type === 0) {
            data.jurisdiction.readable = true
            data.jurisdiction.writable = true
        }

        // 调用修改功能
        const newuserinfo = await Update(_id, data, Adminuser)
        ctx.body = new SuccessModel(newuserinfo)
    }

    // 删除用户
    static async remove(ctx) {
        const id = ctx.params.id
        const data = await Adminuser.remove({ _id: id })

        try { ctx.body = new SuccessModel(data) }
        catch (ex) {
            console.error(ex)
            ctx.body = new ErrorModel(1006, '删除失败')
        }
    }



}

module.exports = Adminusercontroller