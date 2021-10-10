
/**
 * 校验指定数据格式
 * @param {Array} data 需要校验的数据
 * @param {Array} checkarr 需要校验的数据格式
 */

function VerificationInfo(data, checkarr) {
    let result = []
    for (let el of data) {
        const newdata = {}
        for (let k of checkarr) {
            newdata[k] = el[k]
        }
        result.push(newdata)
    }
    return result
}


module.exports = VerificationInfo