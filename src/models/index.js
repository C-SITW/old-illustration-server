/**
 * @description  Model 入口文件
 * @author SITW
 */


const User = require('./User')
const Artist = require('./Artist')
const Illustration = require('./Illustration')
const Comment = require('./Comment')
const Messages = require('./Messages')


module.exports = {
    User,
    Artist,
    Illustration,
    Comment,
    Messages,
}