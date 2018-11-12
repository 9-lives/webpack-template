/**
 * api 返回值封装
 */
export class Result {
  constructor({ data = {}, status }) {
    this.data = data
    this.status = status
  }

  /**
   * api 是否执行正常
   * @return {Boolean} false 异常；true 正常
   */
  isOk () {
    if (this.status === 200) {
      return true
    }

    return false
  }
}
