// pages/comment/comment.js
const app = getApp();
const fetch = require('../../utils/fetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userStars: [
      '/assets/heart_full.png',
      '/assets/heart_full.png',
      '/assets/heart_full.png',
      '/assets/heart_full.png',
      '/assets/heart_full.png'
    ],
    heartScore:5,
    min: 5,
    max: 50,
    current:0,
    order:{},
    comment: '',
    flag: 0
  },
  starTap: function(e){
    var that = this
    var index = e.currentTarget.dataset.index
    var tempUserStars = this.data.userStars
    var len = tempUserStars.length

    for(var i = 0; i < len; i++){
      if(i <= index){
        tempUserStars[i] = '/assets/heart_full.png',
        that.setData({
          heartScore: i + 1
        })
      }else{
        tempUserStars[i] = '/assets/heart_empty.png'
      }
    }

    this.setData({
      userStars: tempUserStars
    })
  },
  inputsLimit: function(e){
    // 获取输入框的内容
    var value = e.detail.value
    // 获取输入框内容的长度
    var len = parseInt(value.length)
    //最多字数限制
    if (len > this.data.max){
      return
    }
    // 当输入框内容的长度大于最大长度限制（max)时，终止setData()的执行
    this.setData({
      currentWordNumber: len, //当前字数
      comment: value
    });
  },
  postComment: function(e){
    var value = this.data.comment
    var that = this
    if(value == ""){
      wx: wx.showToast({
        title: '评论不能为空',
        image: "../../assets/reminder.png"
      })
      return
    }else{
      wx.request({
      url: app.globalData.URL1 + 'postComment',
      data:{
        buyerID: this.data.order.buyerID,
        posterID: this.data.order.posterID,
        comment: this.data.comment,
        heartScore: this.data.heartScore,
        orderCode: this.data.order.orderCode
      },
      success: res => {
        if(this.data.flag = 1){
          wx.navigateBack({
            delta: 0
          })
        }
        if(this.data.flag = 2){
          wx.navigateBack({
            delta: 1
          })
        }
        
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //通信 传参
    const foo = this.getOpenerEventChannel()
    foo.on('order', function(data) {
      console.log(data);
      that.setData({
        order: data.data
      })
    })

    foo.on('flag', function(data) {
      console.log(data);
      that.setData({
        flag: data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})