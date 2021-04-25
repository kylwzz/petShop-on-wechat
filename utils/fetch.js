module.exports = (url, data1, data2, data3, data4) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `http://192.168.2.158:8080/${url}`,
      data:{
        data1: data1,
        data2: data2,
        data3: data3,
        data4: data4
      },
      success: resolve,
      fail: reject
    })
  })
}

/* module.exports = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `http://192.168.40.1:8080/${url}`,
      data:{
        data: data
      },
      success: resolve,
      fail: reject
    })
  })
} */