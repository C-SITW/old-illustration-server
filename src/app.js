const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const cors = require('koa2-cors')

const index = require('./routes/index')
const users = require('./routes/users')
const artist = require('./routes/artist')
const illustration = require('./routes/illustration')
const comment = require('./routes/comment')
const messages = require('./routes/messages')

// error handler
onerror(app)

// cors 配置跨域
app.use(cors({
  origin: 'http://localhost:8080',  // 前端 origin
  credentials: true                 // 允许跨域带 cookie
}))

// 配置session中间件
app.keys = ['awdhjcghjaiuywd*334'] // 秘钥

// 自动配置了 cookie 和 session
app.use(session({
  // 配置 cookie
  cookie: {
    path: '/', // cookie 在根目录下都有效
    httpOnly: 'true', // cookie 只允许服务端来进行操作
    maxAge: 24 * 60 * 60 * 1000 // cookie 的过期时间 这里是一天
  }
}))


// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(artist.routes(), artist.allowedMethods())
app.use(illustration.routes(), illustration.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())
app.use(messages.routes(), messages.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
