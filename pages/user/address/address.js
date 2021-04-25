// pages/user/address/ad.js
var fetch = require("../../../utils/fetch.js")
var getopenid = require("../../../utils/getopenid.js")
const app = getApp();
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
  slideButtonTap(e) {
    var that = this
    wx.request({
      url: 'http://192.168.40.1:8080/deleteAddress',
      data:{ 
        id: e.target.dataset.id
      },
      success: function(res){
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 2000
        })
        that.onLoad()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      openid: app.globalData.openid
    })

/*     wx.request({
      url: 'http://192.168.40.1:8080/myAddress',
      data:{
        openid: this.data.openid
      },
      success: res =>{
        this.setData({
          addressList: res.data
        })
      }
    })  */

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
    this.onLoad()
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
