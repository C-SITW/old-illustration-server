/**
 * @description  方法组件 入口文件
 * @author SITW
 */

const Update = require('./Update')
const VerificationInfo = require('./VerificationInfo')
const getPagingData = require('./getPagingData')
const getcreatedTime = require('./getcreatedTime')

module.exports = {
    Update,
    getPagingData,
    getcreatedTime,
    VerificationInfo,
}
