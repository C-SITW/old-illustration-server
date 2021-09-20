/**
 * @description 插图数据操作
 * @author SITW
 */

const Illustration = require('../../models/Illustration')  // 获取存入数据库的模板

!(async () => {
    // 创建插图
    await Illustration.create({
        artistid: '614600821e379223c04ebc38',
        artistname: 'Tegner, Hans',
        name: 'Death’s Large Hothouse',
        imgurl: 'https://www.oldbookillustrations.com/wp-content/high-res/1900/fly-away-1600.jpg',
        book: `Fairy tales and stories`,
        cn: `一只鹦鹉和其他鸟类的出现使明亮舒适的室内变得活跃起来，其中一只已经找到了打开窗户的框架，引起了家猫的注意，家猫已经靠在旁边的椅子上窗台。`,
        en: `A bright and cozy interior is enlivened by the presence of a parrot and other birds, one of which has found its way to the frame of an open window, drawing the attention of the house cat, which is already leaning on the chair next to the window ledge.`
    })


    // // 列出所有插图
    // const Illustrationlist = await Illustration.find()
    // console.log(Illustrationlist);

    // 获取指定插画详情
    // const id = '61270f5ef91206387c457189'
    // const details = await Illustration.findById(id)
    // console.log(details);

    // // 根据艺术家找插图
    // const artistid = '61270e9cf9c52a63e0e0fa53'
    // const ills = await Illustration.find({ artistid })
    // console.log(ills);
})()