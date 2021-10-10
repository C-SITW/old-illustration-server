/**
 * 获取数据库分页数据
 * @param {*} pagesize 每页显示条数
 * @param {*} pagenum 当前页码
 * @param {*} dbs 查询的数据库
 */
async function getPagingData(pagesize, pagenum, dbs) {

    // 获取数据库数据
    const data = await dbs.find()

    // 返回的数据
    const pager = {}

    // 获取数据长度
    pager.maxNum = data.length

    // 每页显示多少条记录 (前端自定义)
    pager.pageSize = pagesize

    // 总共页数
    pager.pageCount = parseInt(Math.ceil(pager.maxNum / pager.pageSize))

    // 返回指定数据
    // 当前是第几页，默认的第一页 (前端自定义)
    pager.pagenum = pagenum;
    const datalist = data.slice((pager.pagenum - 1) * pager.pageSize, pager.pagenum * pager.pageSize)
    pager.data = datalist

    return pager
}

module.exports = getPagingData