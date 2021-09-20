/**
 * @description illustration controller
 * @author SITW
 */

const { Illustration, Comment, User, Messages } = require('../models/index')
const { getcreatedTime } = require('../utils/getcreatedTime')


/**
 * 数据整理
 * @param {Array} olddata 旧数组数据
 */
function Processing(olddata) {

    const newdata = olddata.map(el => {
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

    return newdata
}

/**
 * 获取全部插画
 */
async function getillustration() {
    const illustration = await Illustration.find()
    const data = Processing(illustration)

    return data
}

/**
 * 获取随机插画
 */
async function getrecommend() {
    const illustration = await Illustration.aggregate([{ $sample: { size: 5 } }])
    const data = Processing(illustration)
    return data
}



/**
 * 获取插画详情
 * @param {*} id 插画id
 * @param {*} userid 用户id
 * @returns 
 */
async function getillustrationInfo(id, userid) {

    // 获取插画详情
    const illustration = await Illustration.findById(id)

    const {
        _id,
        artistid,
        artistname,
        imgurl,
        name,
        book,
        cn,
        en,
    } = illustration



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
        Total_likes = likes.length


        // 判断用户是否点赞此条评论
        let userlike = false
        const like = await Messages.findOne({ commentid, Creator_id: loginid })
        if (like !== null) {
            userlike = true
        }



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


    const data = {
        _id,
        artistid,
        artistname,
        imgurl,
        name,
        book,
        cn,
        en,
        collection,
        comments
    }

    return data

}


module.exports = {
    getillustration,
    getrecommend,
    getillustrationInfo
}