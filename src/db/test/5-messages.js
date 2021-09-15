/**
 * @description 消息流数据操作
 * @author SITW
 */

const { Messages, User } = require('../../models/index')  // 获取存入数据库的模板


!(async () => {
    // // 创建一条消息
    // await Messages.create({
    //     illustrationid: '61270f5ef91206387c457189',
    //     commentid: '61273e29c1d75f3b0c53f8b3',
    //     Creator_id: '61262bc74b127e5e88c91821',
    //     involve_id: '61261b652eda9e6180bae2c1',
    //     type: 0,
    // })

    // 获取关于某个用户的消息
    // const involve_id = '61261b652eda9e6180bae2c1'
    // const mgslist = await Messages.find({ involve_id })

    // const Creator_id = mgslist[0].Creator_id;
    // const Creatoruser = await User.find({ _id: Creator_id })
    // console.log(Creatoruser);
})()