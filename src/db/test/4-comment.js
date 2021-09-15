/**
 * @description 评论数据操作
 * @author SITW
 */

const { Comment, Messages } = require('../../models/index')  // 获取存入数据库的模板


!(async () => {
    // // 创建一条评论
    // await Comment.create({
    //     userid: '61261b652eda9e6180bae2c1',
    //     illustrationid: '61270f5ef91206387c457189',
    //     content: '这老鼠看起来好可爱啊！！'
    // })

    // // 获取这个插画下所有的评论
    // const illustrationid = '61270f5ef91206387c457189';
    // const commentlist = await Comment.find({ illustrationid })
    // console.log(commentlist);


    // // 获取当前评论下所有点赞数
    // const id = '61273e29c1d75f3b0c53f8b3'
    // const count = await Messages.find({ commentid: id, type: 0 })
    // console.log(count.length);

})()