/**
 * @description comment controller
 * @author SITW
 */

const { Comment } = require('../models/index')  // 获取存入数据库的模板



/**
 * 创建评论
 * @param {String} username 用户名
 * @param {Array} data 获取评论数据
 */
async function createComment(userid, data) {

    const { illustrationid, content } = data


    const newdata = await Comment.create(
        {
            userid,
            illustrationid,
            content
        }
    )

    return newdata

}



module.exports = {
    createComment
}