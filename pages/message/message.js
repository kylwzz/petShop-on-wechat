// pages/message/message.js
const app = getApp()
const fetch = require('../../utils/fetch.js')
const utils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster: {},
    ID: null,
    petName: null,
    price: 0,
    birth: null,
    sex: null,
    Sterilization: null,
    infos: null,
    cover:null,
    area:null,
    openid: null,
    banner: [],
    amount: 1,
    comment: [],
    hearts: [],
    recommend: [],
    index: 0,
    isCollect: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    this.setData({
      ID: options.id
    })

    fetch('isCollect', options.id).then(res => {
      this.setData({
        isCollect: res.data
      })
    })

    fetch('petInfos', options.id).then(res => {
      this.setData({
        petName: res.data.petName,
        sex: res.data.sex,
        birth: res.data.birth,
        price: res.data.price,
        infos: res.data.infos,
        Sterilization: res.data.sterilization,
        cover: res.data.cover,
        banner:res.data.banner,
        area: res.data.area,
        openid: res.data.openid
      })

      fetch('getPosterInfos', this.data.openid).then(res =>{
        this.setData({
          poster: res.data
        })
      })

      fetch('getComment', this.data.openid).then(res =>{
        this.setData({
          comment: res.data,
        })
        for(var i = 0; i < this.data.comment.length; i++){
          this.data.comment[i].heartScore = parseInt(this.data.comment[i].heartScore)
        }
        this.setData({
          comment: this.data.comment 
        })

        fetch('getRecommend', this.options.id).then(res => {
          console.log(res);
          this.setData({
            recommend: res.data
          })
        })
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
  test: function(e){
    console.log(e)
  },
  toHome: function(e){
    wx.reLaunch({
      url: '../index/index',
    })
  },
  toCollect: function(e){
    var that = this
    if(this.data.openid == wx.getStorageSync('myOpenid')){
      wx.showToast({
        title: '此商品由你发布',
        icon:'error'
      })
      return 
    }
    var collect = {
      openid: app.globalData.openid,
      name: this.data.petName,
      price: this.data.price,
      area: this.data.area,
      type: '宠物',
      cover: this.data.cover,
      shopID: this.data.ID
    }

    if(!this.data.isCollect){
      wx.request({
        url: 'http://192.168.40.1:8080/addCollect',
        data:{
          openid: collect.openid,
          name: collect.name,
          price: collect.price,
          area: collect.area,
          type: collect.type,
          cover: collect.cover,
          shopID: collect.shopID
        },
        success: function(res){
          that.setData({
            isCollect: true
          })
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
        }
      })
    }else{
      fetch('deleteCollectNow', that.data.ID, 0).then(res => {
        that.setData({
          isCollect: false
        })
      })
    }
  },
  BuyNow: function(e){
    if(this.data.openid == wx.getStorageSync('myOpenid')){
      wx.showToast({
        title: '此商品由你发布',
        icon:'error'
      })
      return 
    }
    /* 
      订单需要数据：
        封面、商品名、价格
        卖家名、卖家地址
    */
   var order = {
     orderCode: '',
     cover: this.data.cover,
     name: this.data.petName,
     price: this.data.price,
     buyerID: wx.getStorageSync('myOpenid'),
     poster: '',
     posterID: this.data.openid,
     posterAera: this.data.area,
     buyerName: '',
     buyerPhone: '',
     buyerArea: '',
     shopid: this.data.ID,
     state: '',
     amount: this.data.amount,
     type: 0
   }
    wx.navigateTo({
      url: '/pages/order/order',
      events:{
        foo: function(data){
          console.log(data)
        },
      },
      success: function(res){
        res.eventChannel.emit('foo', {data: order})
      }
    })
  }
})