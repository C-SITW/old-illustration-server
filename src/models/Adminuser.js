/**
 * @description Adminuser Model
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
        required: true,
    },
    jurisdiction: {
        readable: {
            type: Boolean,
            default: true,
            required: true,
        },
        writable: {
            type: Boolean,
            default: false,
            required: true,
        }
    },
    type: {
        type: Number,
        default: 1 // 0 - 超级管理员 , 1 - 普通用户
    },
    mg_state: {
        type: Boolean,
        default: true
    },
    role_name: String,
}, { timestamps: true } // 时间戳
)

const Adminuser = mongoose.model('adminuser', Schema)

module.exports = Adminuser