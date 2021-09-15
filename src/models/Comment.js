/**
 * @description Comment Model
 * @author SITW
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    illustrationid: {
        type: String,
        required: true,
    },
    content: String
}, { timestamps: true } // 时间戳
)

const Comment = mongoose.model('comment', Schema)

module.exports = Comment