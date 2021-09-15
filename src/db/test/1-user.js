/**
 * @description 用户数据操作
 * @author SITW
 */

const { User, Messages } = require('../../models/index')  // 获取存入数据库的模板

!(async () => {
    // // 注册： 创建一个新的用户
    // await User.create({
    //     username: 'Alex',
    //     password: '123456',
    // })

    // // 获取用户列表
    // const userList = await User.find()
    // console.log('userList', userList)


    // 获取指定用户
    const userlogin = await User.find({ username: 'zeze' })
    console.log('userlogin', userlogin)


    // // 更新用户信息
    // const id = '61262bc74b127e5e88c91821';
    // const newDate = {
    //     sex: '女',
    //     age: 17,
    //     imgurl: 'http://localhost:3000/images/useravatar/test.jpeg'
    // }

    // const upuserinfo = await User.findOneAndUpdate(
    //     { _id: id, username: 'Alex' }, //条件
    //     newDate,
    //     {
    //         new: true // 返回更新之后的最新数据 (默认是 false,返回更新之前的数据)
    //     }
    // )
    // console.log('newdata', upuserinfo);



    // // 收藏插画功能
    // const id = '61262bc74b127e5e88c91821';
    // const userinfo = await User.find({ username: 'Alex' })

    // const shouchang = userinfo[0].collections;
    // // console.log(shouchang);

    // const collections = [...shouchang, '61261b652eda9e6180bae2c5']

    // console.log(collections);

    // const newDate = {
    //     collections
    // }

    // const upuserinfo = await User.findOneAndUpdate(
    //     { _id: id, username: 'Alex' }, //条件
    //     newDate,
    //     {
    //         new: true // 返回更新之后的最新数据 (默认是 false,返回更新之前的数据)
    //     }
    // )
    // console.log('newdata', upuserinfo);


    // 获取收藏列表
    // const id = '61262bc74b127e5e88c91821';
    // const userinfo = await User.find({ _id: id })

    // const shouchang = userinfo[0].collections;
    // console.log(shouchang);


})()