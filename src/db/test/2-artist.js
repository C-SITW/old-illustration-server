/**
 * @description 艺术家数据操作
 * @author SITW
 */

const Artist = require('../../models/Artist')  // 获取存入数据库的模板

!(async () => {
    // 创建艺术家
    await Artist.create({
        artistname: `Vidal, Emeric Essex`,
        artistinfo: `Emeric Essex Vidal was an English watercolourist and naval officer. His opportunities for travel, his curiosity about local customs and human types, and his eye for the picturesque, led him to make paintings which are now historical resources. A landscape painter and a costumbrista, he was the first visual artist to leave records of the ordinary inhabitants of the newly emergent Argentina and Uruguay, including the first depictions of gauchos. He also left records of Canada, Brazil, the West Indies and St Helena, where he sketched the...`
    })

    // // 列出所有艺术家
    // const artistList = await Artist.find()
    // console.log(artistList); 

    // // 查找指定艺术家
    // const id = '61265d31c914aa4dace4e40d'
    // const artist = await Artist.findById(id)
    // console.log(artist);
})()