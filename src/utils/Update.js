
/**
 * 更新指定数据功能
 * @param {*} _id 用户id
 * @param {*} data 更新的数据
 * @param {*} dbs 指定数据库
 */
async function Update(_id, data, dbs) {

    const newinfo = await dbs.findOneAndUpdate(
        { _id },      // 条件
        { ...data },  // 更新的数据
        { new: true }
    )
    return newinfo

}

module.exports = Update