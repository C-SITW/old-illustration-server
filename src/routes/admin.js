const
    router = require('koa-router')(),
    A = require('../controller/artist'),
    I = require('../controller/illustration'),
    C = require('../controller/comment'),
    U = require('../controller/user'),
    Admin = require('../controller/admin/adminuser'),
    loginCheck = require('../middleware/loginCheck');

router.prefix('/admin')
router
    .post('/user', Admin.register)  // 创建新管理用户
    .post('/user/login', Admin.login)   // 登录
    .get('/user/:id', Admin.getUserinfo)   // 获取单个理用户信息
    .get('/user', Admin.getUserlist)   // 获取指定管理用户分页列表
    .put('/user/:id/state/:type', loginCheck, Admin.updatastate)   // 修改管理用户状态
    .put('/user/:id', Admin.updatauserinfo)   // 修改管理用户权限
    .delete('/user/:id', loginCheck, Admin.remove)   // 删除管理用户

    .post('/artist', A.createArtist)    // 创建艺术家
    .get('/artist', A.getPagerlist)   // 获取指定艺术家分页列表
    .put('/artist/:id', A.updataArtistinfo)   // 编辑艺术家信息
    .delete('/artist/:id', A.remove)    // 删除单个艺术家

    .post('/illustration', I.createillustration)    // 创建新插画
    .get('/illustration', I.getPagerlist)   // 获取指定艺术家分页列表
    .get('/illustration/:id', I.getillustrationinfo)   // 获取单幅插画信息
    .put('/illustration/:id', I.updataillustrationinfo)   // 编辑插画信息
    .delete('/illustration/:id', I.remove)    // 删除单幅插画

    .get('/comment', C.getPagerlist)   // 获取指定评论分页列表

    .get('/userpager', U.getPagerlist)   // 获取指定用户分页列表


module.exports = router