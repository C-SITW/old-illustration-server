/**
 * @description Illustration Model
 * @author SITW
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
    artistid: String,
    artistname: String,
    name: String,
    imgurl: String,
    book: String,
    cn: String,
    en: String
}, { timestamps: true } // 时间戳
)

const Illustration = mongoose.model('illustration', Schema)

module.exports = Illustration