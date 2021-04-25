// pages/mallmessage/mallmessage.js
const fetch = require('../../utils/fetch')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
/*     ID: null,
    supplyName: null,
    price: null,
    infos: null,
    transport: null,
    classify: null,
    brand: null,
    stage:null,
    advice: null,
    weight: null,
    expiration: null,
    cover: null,
    openid: null,
    banner: [], */
    amount: 1,
    poster: {},
    cartItem:{
      cover: '',
      id: '',
      name: '',
      price: '',
      count: 0
    },
    supply:{
      ID: null,
      supplyName: null,
      price: null,
      infos: null,
      transport: null,
      classify: null,
      brand: null,
      stage:null,
      advice: null,
      weight: null,
      expiration: null,
      cover: null,
      openid: null,
      banner: [],
      area: null
    },
    comment:[],
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

    fetch("mallInfos", options.id).then(res => {
      this.setData({
        supply: res.data,
        banner: res.data.banner
      })
      fetch('getPosterInfos', this.data.supply.openid).then(res =>{
        this.setData({
          poster: res.data
        })
      })

      fetch('getComment', this.data.supply.openid).then(res =>{
        console.log(res);
        this.setData({
          comment: res.data,
        })
        for(var i = 0; i < this.data.comment.length; i++){
          this.data.comment[i].heartScore = parseInt(this.data.comment[i].heartScore)
        }
        this.setData({
          comment: this.data.comment 
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
  addShoppingCar: function(e){
    if(this.data.supply.openid == wx.getStorageSync('myOpenid')){
      wx.showToast({
        title: '此商品由你发布',
        icon:'error'
      })
      return 
    }
    /* 需要获得该商品的 封面 ID 商品名 价格 */
    this.setData({
      cartItem:{
        cover: this.data.supply.cover,
        id: this.data.supply.id,
        name: this.data.supply.supplyName,
        price: this.data.supply.price,
        transport: this.data.supply.transport,
        weight: this.data.supply.weight,
        posterID: this.data.supply.openid,
        posterArea: this.data.supply.area
      }
    })

    //将当前商品的count前项置为1，表示添加到购物车的数量
    this.data.cartItem.count = 1
    console.log(this.data.cartItem)

    //获取缓存中的购物车数组，若没有数据则赋予一个空数组
    var arr = wx.getStorageSync('cart') || []
    //如果购物车中有数据
    if(arr.length > 0){
      //遍历购物车
      for(var j in arr){
        //如果购物车中有相同的商品，使此商品数量+1
        if(arr[j].id == this.data.cartItem.id){
          arr[j].count = arr[j].count + 1
          //然后将购物车的数据存入缓存中
          try{
            wx.setStorageSync('cart', arr)
          }catch(e){
            console.log(e)
          }
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
          //在if内使用return，跳出循环节约运算，节约性能
          return;
        }
      }
      //遍历完购物车，没有相同的商品，则将此商品存入购物车中
      arr.push(this.data.cartItem)
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
    }else{
      //若购物车中没有数据，则把当前商品存入购物车中
      arr.push(this.data.cartItem)
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 2000
      })
    }

    //最后将购物车数据存入缓存中
    try{
      wx.setStorageSync('cart', arr)
    }catch(e){
      console.log(e)
    }
  },
  toCollect: function(e){
    var that = this
    if(this.data.supply.openid == wx.getStorageSync('myOpenid')){
      wx.showToast({
        title: '此商品由你发布',
        icon:'error'
      })
      return 
    }
    var collect = {
      openid: app.globalData.openid,
      name: this.data.supply.supplyName,
      price: this.data.supply.price,
      area: this.data.supply.area,
      type: '商品',
      cover: this.data.supply.cover,
      shopID: this.data.supply.id
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
      fetch('deleteCollectNow', that.data.ID, 1).then(res => {
        that.setData({
          isCollect: false
        })
      })
    }
    
  },
  BuyNow: function(e){
    if(this.data.supply.openid == wx.getStorageSync('myOpenid')){
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
    cover: this.data.supply.cover,
    name: this.data.supply.supplyName,
    price: this.data.supply.price,
    buyerID: wx.getStorageSync('myOpenid'),
    poster: '',
    posterID: this.data.supply.openid,
    posterAera: this.data.supply.area,
    buyerName: '',
    buyerPhone: '',
    buyerArea: '',
    shopid: this.data.ID,
    state: '',
    amount: this.data.amount,
    type: 1,
    transport: this.data.supply.transport,
    weight: this.data.supply.weight
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