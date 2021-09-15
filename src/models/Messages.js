/**
 * @description Messages Model
 * @author SITW
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
    illustrationid: String,
    commentid: String,
    Creator_id: String,
    involve_id: String,
    type: {
        type: Number,
        default: 0 // 0 - 点赞 , 1 - 关注
    },
}, { timestamps: true } // 时间戳
)

const Messages = mongoose.model('messages', Schema)

module.exports = Messages