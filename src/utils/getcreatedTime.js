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
    const timestamp = nowtime - time
    const distance = parseInt(timestamp / 1000 / 60)

    let data = ''
    if (distance < 1) {
        data = '刚刚'
    } else if (distance < 59) {
        data = `${distance}分钟前`
    } else if (distance < 1439) {
        const h = Math.round(distance / 60)
        data = `${h}小时前`
    } else {
        olddata = new Date(createdAt).toLocaleString()
        data = olddata.substring(0, 9)
    }
    return data
}

module.exports = getcreatedTime