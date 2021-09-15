/**
 * @description User Model
 * @author SITW
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
    username: {
        type: String,
        required: true, // 必需
        unique: true,  // 唯一的，不可重复
    },
    password: {
        type: String,
        required: true, // 必需
    },
    age: {
        type: Number,
        default: 18
    },
    sex: {
        type: String,
        default: '未知'
    },
    imgurl: {
        type: String,
        default: 'http://192.168.31.66:3000/images/useravatar/DefaultAvatar.jpeg'
    },
    introduction: {
        type: String,
        default: '快来更新您的个性签名吧！'
    },
    Totallikes: {
        type: Number,
        default: 0
    },
    fans: {
        type: Number,
        default: 0
    },
    follow: {
        type: Number,
        default: 0
    },
    collections: []
}, { timestamps: true } // 时间戳
)

const User = mongoose.model('user', Schema)

module.exports = User