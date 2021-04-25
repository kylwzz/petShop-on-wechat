// pages/user/poster/orderHandler/orderHandler.js
const app = getApp();
const fetch = require('../../../../utils/fetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['待付款', '待发货','已发货','已完成','退款'],
    currentTab: '0',
    order: [],
    index: 0,
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })

                        //卖家的openid
    fetch('getPosterOrder', wx.getStorageSync('testOpenid'), this.data.currentTab).then(res => {
      console.log(res.data)
      this.setData({
        order: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var data = []
      data.currentTarget = []
      data.currentTarget.dataset = []
      data.currentTarget.dataset.idx = 0
      this.navbarTap(data)

    fetch('getPosterOrder', wx.getStorageSync('testOpenid'), this.data.currentTab).then(res => {
      console.log(res.data)
      this.setData({
        order: res.data
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

  },
  goSend: function(e){
    var that = this
    
    wx.showModal({
      title: '发货',
      content: '是否已发货？',
      success (res) {
        if (res.confirm) {
          wx.showToast({
            title: '发货成功',
            icon: 'success',
            duration: 2000
          })

          fetch('changeOrderState',  that.data.order[e.currentTarget.dataset.index].orderCode, 2).then(res => {
            fetch('getPosterOrder', wx.getStorageSync('testOpenid'), that.data.currentTab).then(res => {
              /* console.log(res.data) */
              that.setData({
                order: res.data
              })
            })
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '请尽快发货',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  },
  refund: function(e){
    var that = this
    wx.showModal({
      title: '退款',
      content: '同意退款申请',
      success (res) {
        if (res.confirm) {
          fetch('refundOrder', that.data.order[e.currentTarget.dataset.index].orderCode).then(res => {
            that.onLoad()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})