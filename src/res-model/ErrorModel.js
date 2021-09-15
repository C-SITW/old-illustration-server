/**
 * @description 失败返回的数据模型
 * @author SITW
 */

class ErrorModel {
    constructor(errno = -1, message = 'error') {
        this.errno = errno  // 失败返回的标准
        this.message = message
    }
}

module.exports = ErrorModel

// new ErrorModel(10001,'注册失败') // { errno:10001 ,message:'注册失败' }
