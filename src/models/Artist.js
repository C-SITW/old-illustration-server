/**
 * @description Artist Model
 * @author SITW
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
    artistname: {
        type: String,
        required: true,
        unique: true,
    },
    artistinfo: String,
}, { timestamps: true } // 时间戳
)

const Artists = mongoose.model('artist', Schema)

module.exports = Artists