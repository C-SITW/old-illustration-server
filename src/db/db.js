/**
 * @description mongoose 连接数据库
 * @author SITW
 */


const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017' // 本地默认的 mongodb 服务地址
const dbName = 'oldillustration' // 数据库名称


// 规定配置
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

// 开始连接
mongoose.connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', err => {
    console.error('mongoose connect error', err)
})

// db.once('open', () => {
//     // 用以测试数据库连接是否成功
//     console.log('连接数据库成功！')
// })

module.exports = mongoose

