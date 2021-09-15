/**
 * @description 成功返回的数据模型
 * @author SITW
 */

class SuccessModel {
    constructor(data) {
        this.errno = 0 // 成功返回的标准
        if (data != null) {
            this.data = data
        }
    }
}

module.exports = SuccessModel
