/**
 * @description artist controller
 * @author SITW
 */

const { SuccessModel, ErrorModel } = require('../res-model/index')
const { Artist, Illustration } = require('../models/index')
const { getPagingData, Update } = require('../utils/index')

class Artistcontroller {

    // 创建艺术家
    static async createArtist(ctx) {
        const { artistname, artistinfo } = ctx.request.body

        // 保存到数据库
        const newArtist = await Artist.create({ artistname, artistinfo })
        // 判断执行成功与否
        try {
            ctx.body = new SuccessModel(newArtist)
        } catch (ex) {
            ctx.body = new ErrorModel(10001, `创建失败 ${ex.message}`)
        }
    }

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

    // 获取指定艺术家分页列表
    static async getPagerlist(ctx) {
        const { query, pagenum, pagesize } = ctx.request.body

        // 获取分页数据
        const pager = await getPagingData(pagesize, pagenum, Artist)

        ctx.body = pager
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

    // 更新艺术家数据
    static async updataArtistinfo(ctx) {
        const _id = ctx.params.id
        const data = ctx.request.body

        const newinfo = await Update(_id, data, Artist)
        ctx.body = new SuccessModel(newinfo)
    }

    // 删除单个艺术家
    static async remove(ctx) {
        const id = ctx.params.id

        const data = await Artist.remove({ _id: id })

        try { ctx.body = new SuccessModel(data) }
        catch (ex) {
            console.error(ex)
            ctx.body = new ErrorModel(1006, '删除失败')
        }
    }

}

module.exports = Artistcontroller