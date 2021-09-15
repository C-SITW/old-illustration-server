/**
 * @description artist controller
 * @author SITW
 */

const { Artist, Illustration } = require('../models/index')

/**
 * 获取艺术家列表
 */
async function getArtistList() {
    const artistinfo = await Artist.find()

    const data = artistinfo.map(el => {
        const _id = el._id
        const artistname = el.artistname

        return {
            _id,
            artistname,
        }
    })

    return data
}


/**
 * 获取艺术家详情
 * @param {string} id 
 */
async function getArtistinfoById(id) {
    // 获取艺术家信息
    const artist = await Artist.findById(id)
    const { _id, artistname, artistinfo } = artist

    // 获取艺术家创作插画信息
    const list = await Illustration.find({ artistid: id })
    const collect = list.map(el => {
        // 商品id
        const _id = el._id
        const name = el.name
        const imgurl = el.imgurl

        return {
            _id,
            artistname,
            name,
            imgurl
        }
    })

    const data = {
        _id,
        artistname,
        artistinfo,
        llustrationlist: collect
    }

    return data
}

module.exports = {
    getArtistList,
    getArtistinfoById
}