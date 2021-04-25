// pages/search/search.js
const fetch = require('../../utils/fetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: '',
    pets: [],
    supply: [],
/*     isShow: false, */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  showInput: function () {
    this.setData({
      inputShowed: true
    });
    },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    // getList(this);
  },
  inputTyping: function (e) {
    //搜索数据
    this.setData({
      inputVal: e.detail.value
    });

  if(e.detail.value != ''){
  fetch('searchListPet', e.detail.value).then(res => {
      this.setData({
        pets: res.data
      })
    })

    fetch('searchListSupply', e.detail.value).then(res => {
      this.setData({
        supply: res.data
      })
    })

/*      if(this.data.pets.length > 0 || this.data.supply.length > 0){
        this.data.isShow = true
      }else{
        this.data.isShow = false
      }
      this.setData({
        isShow: this.data.isShow
      }) */
  }
  }
})