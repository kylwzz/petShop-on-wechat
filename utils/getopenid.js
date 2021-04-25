module.exports = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1df9b19ea6463f9c&secret=49a40a084fc17c7df50a8943daba3558&js_code=' + res.code + '&grant_type=authorization_code',
          success: resolve,
          fail: reject
        })
      }
    })
  })
}