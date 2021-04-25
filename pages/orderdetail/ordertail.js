// pages/orderdetail/ordertail.js
const app = getApp();
const fetch = require('../../utils/fetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    state: "待支付",
    isShowPay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this
    //与商品信息界面通信 传参
    const foo = this.getOpenerEventChannel()
    foo.on('order', function(data) {
      console.log(data);
      that.setData({
        order: data.data
      })
    })

    switch(this.data.order.state){
      case '0':
        this.setData({
          isShowPay: Boolean(this.data.order.close)
        })
        break;
      
      case '1':
        this.setData({
          state: "待发货",
          isShowPay: true
        })
        break;

       case '2':
        this.setData({
          state: "已发货",
          isShowPay: true
        })
        break;

       case '3':
        this.setData({
          state: "待评价",
          isShowPay: true
        })
        break;

       case '4':
        this.setData({
          state: "退款中",
          isShowPay: true
        })
        break;
    }
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

  },
  goPay: function(e){
    var that = this
    wx.showModal({
      title: '支付',
      content: '模拟支付',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })

          fetch('changeOrderState', that.data.order.orderCode, 1).then(res => {
            wx.navigateBack({
              delta: 0,
            })
          })

        } else if (res.cancel) {
          wx.showToast({
            title: '请尽快支付',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  },
  goComment: function(e){
    var that = this
    wx.navigateTo({
      url: '/pages/comment/comment',
      success: function(res){
        res.eventChannel.emit('order',{data: that.data.order})
        res.eventChannel.emit('flag',{data: 2})
      }
    })
  },
  refund: function(e){
    var that = this
    wx.showModal({
      title: '退款',
      content: '确定退款吗',
      success (res) {
        if (res.confirm) {
          fetch('changeOrderState', that.data.order.orderCode, 4).then(res => {
            wx.navigateBack({
              delta: 0,
            })
          })
        } else if (res.cancel) {
          
        }
      }
    })
  }
})