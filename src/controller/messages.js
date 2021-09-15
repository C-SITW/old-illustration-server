/**
 * @description messages controller
 * @author SITW
 */

const { Messages, User } = require('../models/index')

/**
 * 创建信息流
 * @param {String} Creator_id 创建信息流的用户id
 * @param {Array} data 信息流数据
 */
async function createMessages(Creator_id, data) {
    const { illustrationid, commentid, involve_id, type } = data

    // 判断是否创建信息流
    const state = await Messages.findOne({ Creator_id, commentid })
    let newdata = {}
    if (state !== null) {
        // 有创建则删除
        newdata = await Messages.remove(
            { Creator_id, commentid, illustrationid }
        )
        return newdata
    } else {
        newdata = await Messages.create(
            {
                illustrationid,
                commentid,
                Creator_id,
                involve_id,
                type
            }
        )
        return newdata
    }


}

/**
 * 判断信息流时间
 * @param {String} createdAt 创建时间
 */
async function getcreatedTime(createdAt) {
    // 获取现在时间戳
    const nowtime = new Date().getTime()
    // 获取存入的时间戳
    const time = new Date(createdAt).getTime()

    // 获取该信息流距离现在过去了多久
    const sjc = nowtime - time
    const juli = parseInt(sjc / 1000 / 60)

    let data = ''

    if (juli < 5) {
        data = '刚刚'
    } else if (juli < 60) {
        data = `${juli}分钟前`
    } else {
        data = new Date(createdAt).toLocaleString()
    }

    return data
}


/**
 * 获取信息流
 * @param {String} involve_id 登录用户的id
 */
async function getMessages(involve_id) {
    let userlist = []
    const message = await Messages.find({ involve_id })

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



    return userlist

}

module.exports = {
    createMessages,
    getMessages
}