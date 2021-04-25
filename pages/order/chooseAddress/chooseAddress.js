// pages/order/chooseAddress/chooseAddress.js
const app = getApp();
var fetch = require("../../../utils/fetch.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[],
    openid: null,
    slideButtons: [{
      type:'warn',
      text:'删除'
    }],
    index: 0,
  },
  choose: function(e){
    console.log(e.currentTarget.dataset.id)
    let pages = getCurrentPages(); // 当前页的数据，
    let prevPage = pages[pages.length - 2]; // 上一页的数据
    prevPage.setData({
      index: e.currentTarget.dataset.id, // 修改上一页的属性值；
    })
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openid: wx.getStorageSync('myOpenid')
    })

    fetch('myAddress',this.data.openid).then(res => {
      this.setData({
        addressList: res.data
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