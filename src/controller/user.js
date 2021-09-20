/**
 * @description user controller
 * @author SITW
 */

const { User, Illustration, Messages } = require('../models/index')  // 获取存入数据库的模板

/**
 * 注册
 * @param {string} username 用户名
 * @param {string} password 密码
 */
async function register(username, password) {
    // 保存到数据库
    const newUser = await User.create({ username, password })
    return newUser
}


/**
 * 登录
 * @param {string} username 用户名
 * @param {string} password 密码
 */
async function login(username, password) {
    const user = await User.findOne({ username, password })
    if (user != null) {
        // 登录成功
        return {
            state: true,
            _id: user._id
        }
    }
    return { state: false }
}


/**
 * 获取用户信息
 * @param {string} id 用户id
 */
async function getUserInfo(id) {
    const userinfo = await User.findById(id)
    const likes = await Messages.find({ involve_id: id, type: 0 })
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

    return data

}

/**
 * 更新用户信息
 * @param {string} _id         用户id
 * @param {Object} data       更新的数据
 */
async function updateUserInfo(_id, data) {
    const newuserinfo = await User.findOneAndUpdate(
        { _id },      // 条件
        { ...data },  // 更新的数据
        { new: true }
    )

    return newuserinfo
}


/**
 * 用户收藏
 * @param {string} _id 用户id
 * @param {string} illustrationid 插画id
 */
async function collections(_id, illustrationid) {
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
    return {
        CollectionState: state
    }
}


/**
 * 获取用户收藏列表
 * @param {string} username 用户名
 */
async function getCollection(id) {
    const userinfo = await User.findById(id)
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

    return data
    // return collections
}



module.exports = {
    register,
    login,
    getUserInfo,
    updateUserInfo,
    collections,
    getCollection
}