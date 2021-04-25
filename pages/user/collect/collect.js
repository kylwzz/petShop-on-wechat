// pages/user/collect/collect.js
const app = getApp()
const fetch = require('../../../utils/fetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['宠物', '用品'],
    currentTab: 0,
    pets: [],
    supplies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    fetch('getPetCollect', app.globalData.openid).then(res => {
      this.setData({
        pets: res.data
      })
    })

    fetch('getSupplyCollect', app.globalData.openid).then(res => {
      this.setData({
        supplies: res.data
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
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  deleteCollection: function(e){
    var that = this
    wx.showModal({
      title: '删除',
      content: '是否删除收藏',
      success (res) {
        if (res.confirm) {
          console.log(e.currentTarget.dataset.index)
          fetch('deleteCollect', e.currentTarget.dataset.index).then(res => {
            that.onLoad()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})