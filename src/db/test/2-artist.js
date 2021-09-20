/**
 * @description 艺术家数据操作
 * @author SITW
 */

const Artist = require('../../models/Artist')  // 获取存入数据库的模板

!(async () => {
    // 创建艺术家
    await Artist.create({
        artistname: `Tegner, Hans`,
        artistinfo: `Hans Christian Harald Tegner, known as Hans Tegner, was a Danish artist and illustrator. He is primarily known for his illustrations of literary works by Hans Christian Andersen and Ludvig Holberg and for his work for the Bing & Grøndahl porcelain factory.`
    })

    // // 列出所有艺术家
    // const artistList = await Artist.find()
    // console.log(artistList); 

    // // 查找指定艺术家
    // const id = '61265d31c914aa4dace4e40d'
    // const artist = await Artist.findById(id)
    // console.log(artist);
})()