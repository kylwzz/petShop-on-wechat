// pages/user/orderList/orderList.js
const app = getApp();
const fetch = require('../../../utils/fetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['待付款', '待发货','已发货','待评价','退款','已完成'],
    currentTab: '0',
    order: [],
    index: 0,
    minute: 0,//分
    second: 0,//秒
    countdown: [],
    timeList: [], //到期时间戳
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })

    //买家的openid
    fetch('getMyOrder', wx.getStorageSync('myOpenid'), this.data.currentTab).then(res => {
      this.setData({
        order: res.data,
      })
      
      if(e.currentTarget.dataset.idx == 0){
        this.countDown()
      }
    })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options.idx == 0 ){
      this.onShow()
      var data = []
      data.currentTarget = []
      data.currentTarget.dataset = []
      data.currentTarget.dataset.idx = 0
      this.navbarTap(data)
    }

    if(options.idx == 1 ){
      var data = []
      data.currentTarget = []
      data.currentTarget.dataset = []
      data.currentTarget.dataset.idx = 1
      this.navbarTap(data)
    }

    if(options.idx == 2 ){
      var data = []
      data.currentTarget = []
      data.currentTarget.dataset = []
      data.currentTarget.dataset.idx = 2
      this.navbarTap(data)
    }

    if(options.idx == 3 ){
      var data = []
      data.currentTarget = []
      data.currentTarget.dataset = []
      data.currentTarget.dataset.idx = 3
      this.navbarTap(data)
    }

    if(options.idx == 4 ){
      var data = []
      data.currentTarget = []
      data.currentTarget.dataset = []
      data.currentTarget.dataset.idx = 4
      this.navbarTap(data)
    }

    if(options.idx == 5 ){
      var data = []
      data.currentTarget = []
      data.currentTarget.dataset = []
      data.currentTarget.dataset.idx = 5
      this.navbarTap(data)
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
  countDown: function(e){
    var that = this
    var len = this.data.order.length
    for(var i = 0; i < len; i++){
      var start = parseInt(this.data.order[i].orderCode.substring(1,14))
      var endTime = start + 15 * 60000
  
      var now = new Date().getTime()
      var allTime = endTime - now
      var m,s
      if (allTime > 0) {
        m = Math.floor(allTime / 1000 / 60 % 60);
        s = Math.floor(allTime / 1000 % 60);
        that.data.order[i].countdown = '倒计时:' + m + "：" + s
        that.data.order[i].close = false
        that.setData({
          order: that.data.order
        })
        setTimeout(that.countDown, 1000);
      }else if(allTime < 0){
        that.data.order[i].countdown = '超时，订单关闭'
        that.data.order[i].close = true
        that.setData({
          order: that.data.order
        })
        fetch('closeOrder', that.data.order[i].shopID).then(res => {
          
        })
      }
    }
  },
  deleteOrderNow: function(e){
    var that = this
    console.log(e);
    wx.showModal({
      title: '删除订单',
      content: '确认删除订单吗',
      success (res) {
        if (res.confirm) {
          fetch('deleteOrder', that.data.order[e.currentTarget.dataset.index].orderCode, that.data.order[e.currentTarget.dataset.index].shopID).then(res => {
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })
            that.onShow()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
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
    fetch('getMyOrder', wx.getStorageSync('myOpenid'), this.data.currentTab).then(res => {
      this.setData({
        order: res.data,
      })
      
      if(this.data.currentTab == 0){
        this.countDown()
      }
    })
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
  toOrderDetail: function(e){
    var that = this
    wx.navigateTo({
      url: "/pages/orderdetail/ordertail?Close=" + that.data.order[e.currentTarget.dataset.index].close,
      success: function(res){
        res.eventChannel.emit('order',{data: that.data.order[e.currentTarget.dataset.index]})
      }
    })
  },
  goPay: function(e){
    var that = this
/*     console.log(e); */
    wx.showModal({
      title: '支付',
      content: '支付' + that.data.order[e.currentTarget.dataset.index].price + '￥',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })

          fetch('changeOrderState', that.data.order[e.currentTarget.dataset.index].orderCode, 1).then(res => {
            fetch('getMyOrder', wx.getStorageSync('myOpenid'), that.data.currentTab).then(res => {
              /* console.log(res.data) */
              that.setData({
                order: res.data
              })
            })
          })

        } else if (res.cancel) {
          wx.showModal({
            title: '取消订单',
            content: '是否要取消订单',
            success (res) {
              if (res.confirm) {
                fetch("deleteOrder", that.data.order[e.currentTarget.dataset.index].orderCode, that.data.order[e.currentTarget.dataset.index].shopID).then(res => {
                  wx.navigateBack({
                    delta: 0,
                    success: res => {
                      wx.showToast({
                        title: '删除成功',
                        icon: 'success'
                      })
                    }
                  })
                })
              } else if (res.cancel) {
                
              }
            }
          })
        }
      }
    })
  },
  goAccept: function(e){
    var that = this
    wx.showModal({
      title: '收获',
      content: '已收到商品？',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: '确认收货成功',
            icon: 'success',
            duration: 2000
          })

          fetch('changeOrderState', that.data.order[e.currentTarget.dataset.index].orderCode, 3).then(res => {
            that.setData({
              order: res.data
            })
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '收货后尽快确认',
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
        res.eventChannel.emit('order',{data: that.data.order[e.currentTarget.dataset.index]})
        res.eventChannel.emit('flag',{data: 1})
      }
    })
  }
})