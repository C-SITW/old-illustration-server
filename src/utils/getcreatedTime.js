/**
 * 判断信息流时间
 * @param {String} createdAt 创建时间
 */
async function getcreatedTime(createdAt) {
    // 获取现在时间戳
    const nowtime = new Date().getTime()
    // 获取存入的时间戳
    const time = new Date(createdAt).getTime()

    // 获取该信息流距离现在过去了多久
    const sjc = nowtime - time
    const juli = parseInt(sjc / 1000 / 60)

    let data = ''

    if (juli < 5) {
        data = '刚刚'
    } else if (juli < 60) {
        data = `${juli}分钟前`
    } else {
        data = new Date(createdAt).toLocaleString()
    }
    return data
}

module.exports = { getcreatedTime }