/**
 * @description artist controller
 * @author SITW
 */

const { SuccessModel, ErrorModel } = require('../res-model/index')
const { Artist, Illustration } = require('../models/index')

class Artistcontroller {
    // 获取艺术家列表
    static async getArtistList(ctx) {
        const artistinfo = await Artist.find()
        const data = artistinfo.map(el => {
            const _id = el._id
            const artistname = el.artistname
            return { _id, artistname }
        })
        try {
            ctx.body = new SuccessModel(data)
        } catch (ex) {
            ctx.body = new ErrorModel(10005, `获取失败 ${ex.message}`)
        }
    }
    // 获取艺术家详情
    static async getArtistinfoById(ctx) {
        const id = ctx.params.id
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
        ctx.body = new SuccessModel(data)
    }
}

module.exports = Artistcontroller