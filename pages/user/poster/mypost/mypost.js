// pages/user/poster/mypost/mypost.js
const app = getApp()
const fetch = require('../../../../utils/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['宠物', '商品'],
    currentTab: 0,
    pets: [],
    supplies: [],
    openid: app.globalData.openid
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //宠物请求
    wx.request({
      url: 'http://192.168.40.1:8080/myPetPost',
      data:{
        openid: app.globalData.openid
      },
      success: res =>{
        this.setData({
          pets: res.data
        })
      }
    })

    //商品请求
    wx.request({
      url: 'http://192.168.40.1:8080/mySupplyPost',
      data:{
        openid: app.globalData.openid
      },
      success: res =>{
        this.setData({
          supplies: res.data
        })
      }
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