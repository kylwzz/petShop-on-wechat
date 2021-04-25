// pages/shoppingcar/shoppingcar.js
const fetch = require('../../utils/fetch.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iscart: false,
    address: [],
    cart: [],
    total: 0,
    count: 0,
    index: 0,
  },
  chooseAddress: function(e){
    wx.navigateTo({
      url: '/pages/order/chooseAddress/chooseAddress',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    fetch('myAddress', app.globalData.openid).then(res => {
      this.setData({
        address:res.data
      })
    })
/*     wx.request({
      url: 'http://192.168.40.1:8080/myAddress',
      data:{
        openid: app.globalData.openid
      },
      success: res =>{
        console.log(res)
        that.setData({
          address: res.data
        })
      }
    }) */

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
    var that = this
    //获取缓存中的购物车数据 (无数据则赋予一个空数组)
    var arr = wx.getStorageSync('cart') || []

    //有数据，则遍历数组，计算总金额 和 总数量
    if(arr.length > 0){
      for(var i in arr){
        that.data.total += Number(arr[i].price) * Number(arr[i].count)
        that.data.count += Number(arr[i].count)
      }
      //更新数据
      this.setData({
        iscart: true,
        cart: arr,
        total: that.data.total,
        count: that.data.count
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 清除数据
    this.setData({
      iscart: false,
      cart: [], //数据
      total: 0,    //总金额
      goodsCount: 0, //数量
      count: 0
    });
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
  addCount: function(e){
    this.data.count += 1
    this.data.total += Number(this.data.cart[e.target.id.substring(3)].price)
    this.data.cart[e.target.id.substring(3)].count = ++this.data.cart[e.target.id.substring(3)].count

    this.setData({
      cart: this.data.cart,
      total: this.data.total,
      count: this.data.count
    })

    try{
      wx.setStorageSync('cart', this.data.cart)
    }catch(e){
      console.log(e)
    }
  },
  delCount: function(e){
    //获取购物车中 该商品的数量
    if(this.data.cart[e.target.id.substring(3)].count <= 1){
      return
    }
    //总商品数-1
    this.data.count -= 1
    //总价钱 - 对应商品的单价
    this.data.total -= Number(this.data.cart[e.target.id.substring(3)].price)
    //购物车主体数据对应的商品数量 - 1  并且赋值给主体数据的对应项内
    this.data.cart[e.target.id.substring(3).count] = --this.data.cart[e.target.id.substring(3)].count
    
    //更新数据
    this.setData({
      cart: this.data.cart,
      total: this.data.total,
      count: this.data.count
    })

    //更新主体数据
    try{
      wx.setStorageSync('cart', this.data.cart)
    }catch(e){
      console.log(e)
    }
  },
  delGoods: function(e){
    this.data.count = this.data.count - this.data.cart[e.target.id.substring(3)].count
    this.data.total -= this.data.cart[e.target.id.substring(3)].price * this.data.cart[e.target.id.substring(3)].count
    this.data.cart.splice(e.target.id.substring(3),1)

    this.setData({
      cart: this.data.cart,
      total: this.data.total,
      count: this.data.count
    })

    try{
      wx.setStorageSync('cart', this.data.cart)
    }catch(e){
      console.log(e)
    }
  },
  goPay: function(e){
    var that = this
    wx.navigateTo({
      url: '/pages/orderFromCart/orderFromCart',
      success: function(res){
        res.eventChannel.emit('address', {data: that.data.address[that.data.index]})
      }
    })
  }
})