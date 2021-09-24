const
    router = require('koa-router')(),
    U = require('../controller/user'),
    A = require('../controller/artist'),
    C = require('../controller/comment'),
    M = require('../controller/messages'),
    I = require('../controller/illustration'),
    loginCheck = require('../middleware/loginCheck');

router.prefix('/api')
router
    .post('/user/register', U.register)  // 注册
    .post('/user/login', U.login)    // 登录
    .get('/user/info', loginCheck, U.getUserInfo)    // 获取用户信息
    .patch('/user/info', loginCheck, U.updateUserInfo)   //更新用户信息
    .patch('/user/collection', loginCheck, U.collections)   // 用户收藏插画
    .get('/user/collection', loginCheck, U.getCollection)    // 获取用户收藏插画

    .get('/artist', A.getArtistList)    // 获取艺术家列表
    .get('/artist/:id', A.getArtistinfoById)    // 获取艺术家详情

    .get('/illustration/recommend/:id', I.getrecommend)    // 获取指定插画列表数
    .get('/illustration/:id', loginCheck, I.getillustrationInfo)  // 获取插画详情

    .post('/comment', loginCheck, C.createComment)  // 创建评论
    .delete('/comment', loginCheck, C.removeComment)    // 删除评论

    .post('/messages', loginCheck, M.createMessages)    // 创建信息流
    .get('/messages', loginCheck, M.getMessages)        // 获取所属信息流

module.exports = router