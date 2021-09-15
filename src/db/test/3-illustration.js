/**
 * @description 插图数据操作
 * @author SITW
 */

const Illustration = require('../../models/Illustration')  // 获取存入数据库的模板

!(async () => {
    // 创建插图
    await Illustration.create({
        artistid: '6129e961cb6c56d448d3958c',
        artistname: 'Vidal, Emeric Essex',
        name: 'Water Cart',
        imgurl: 'https://www.oldbookillustrations.com/wp-content/uploads/2020/10/water-cart.jpg',
        book: `Picturesque illustrations of Buenos Ayres and Monte Video`,
        cn: `这些推车一整天都在行驶，除了在炎热的夏天，它们只在早晚工作，整个城市都靠它们供应；因为这些井虽然很多，但只产生不适合烹饪用途的劣质微咸水：因此，手推车的数量相当可观。木桶通常是一个桶或打孔器，在八英尺高的轮子上升高，使推车能够深入水中，以便尽可能干净地采购。桶装大约四加仑，司机从房子的院子里取下并存放在房子的院子里，这个数量的四倍，在那里总是放一个桶，要花半里亚尔。挂在车尾的那块皮革放在地上以保持桶的清洁，`,
        en: `These carts ply all day, except during the heats of summer, when they work only in the morning and evening, and the whole city is supplied by their means; for the wells, though numerous, produce nothing but bad, brackish water, unfit for culinary purposes: the number of carts is consequently considerable. The cask is commonly a butt or puncheon, which is raised upon wheels eight feet high, to enable the carts to go deep into the water, that it may be procured as clean as possible. The bucket contains about four gallons, and four times this quantity drawn off and deposited by the driver in the yard of the house, where a cask is always kept for the purpose, costs half a rial. The piece of hide which hangs at the tail of the cart, is laid upon the ground to keep the bucket clean, while the latter is filling by means of the hose attached to the back-head of the butt.`
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