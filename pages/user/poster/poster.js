const fetch = require('../../../utils/fetch.js')
const app = getApp()
// pages/user/poster/poster.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: '0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch('changeUserState', wx.getStorageSync('myOpenid')).then(res => {
      this.setData({
        state: res.data
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
    this.onLoad()
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

  requestUser: function(){
    fetch("requestUser", wx.getStorageSync('myOpenid')).then(res => {
      this.onLoad()
    })
  }
})