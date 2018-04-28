
import toastr from './toastr'

// 定义一个类
class VerifyResponse {
  verify (result) {
    if (result && (result.code === 0) && ((typeof result.data) === 'object')) {
      return true
    }

    toastr.error((result && result.msg) || '非法请求，响应异常')

    return false
  }
}

export default VerifyResponse
