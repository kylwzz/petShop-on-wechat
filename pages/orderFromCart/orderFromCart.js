// pages/orderFromCart/orderFromCart.js
const fetch = require('../../utils/fetch.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart:[],
    index: 0,
    total: 0,
    transportPrice: 0,
    poster:[],
    buyerID: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //收货地址
    const foo = this.getOpenerEventChannel()
    foo.on('address', function(data) {
      that.setData({
        address: data.data
      })
    })

    this.data.cart = wx.getStorageSync('cart')
    for(var i = 0; i < this.data.cart.length; i++){
      if(this.data.cart[i].transport == '按重量计'){
        this.data.transportPrice = this.data.cart[i].weight.slice(0,-1) * 0.01 * this.data.cart[i].count
      }
      this.data.total = this.data.total + this.data.cart[i].price * this.data.cart[i].count + this.data.transportPrice
    }
    this.setData({
      cart: this.data.cart,
      transportPrice: this.data.transportPrice,
      total: this.data.total
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
    var that = this
    for(var i = 0; i < this.data.cart.length; i++){
      fetch("getPosterInfos", that.data.cart[i].posterID).then(res => {
        that.data.poster.push(res.data)
      })
    }
    
    this.data.buyerID = wx.getStorageSync('myOpenid')
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
  addCount: function(e){

    if(this.data.cart[e.currentTarget.id].transport == '全国包邮'){
      this.data.cart[e.currentTarget.id].count += 1
      this.data.total += this.data.cart[e.currentTarget.id].price
    }

    if(this.data.cart[e.currentTarget.id].transport == '按重量计'){
      this.data.cart[e.currentTarget.id].count += 1
      this.data.transportPrice += this.data.cart[e.currentTarget.id].weight.slice(0,-1) * 0.01
      this.data.total = this.data.total + this.data.cart[e.currentTarget.id].price + this.data.transportPrice
    }

    this.setData({
      cart: this.data.cart,
      total: this.data.total,
      transportPrice: this.data.transportPrice
    })
  },
  delCount: function(e){
    if(this.data.cart[e.currentTarget.id].count <= 1){
      return
    }

    if(this.data.cart[e.currentTarget.id].transport == '全国包邮'){
      this.data.cart[e.currentTarget.id].count -= 1
      this.data.total -= this.data.cart[e.currentTarget.id].price
    }

    if(this.data.cart[e.currentTarget.id].transport == '按重量计'){
      this.data.transportPrice -= this.data.cart[e.currentTarget.id].weight.slice(0,-1) * 0.01
      this.data.total = this.data.total - this.data.cart[e.currentTarget.id].price - this.data.cart[e.currentTarget.id].weight.slice(0,-1) * 0.01 * this.data.cart[e.currentTarget.id].count
      this.data.cart[e.currentTarget.id].count -= 1
    }

    this.setData({
      cart: this.data.cart,
      total: this.data.total,
      transportPrice: this.data.transportPrice
    })
  },
  createCode: function(orderCode){
    // 6位随机数(加在时间戳后面)
    for (var i = 0; i < 6; i++){
      orderCode += Math.floor(Math.random() * 10);
    }

    // 时间戳(用来生成订单号)
    orderCode = 'D' + new Date().getTime() + orderCode;

    return orderCode;
  },
  Pay:function(e){
    var that = this
    wx.showModal({
      title: '支付',
      content: '支付' + that.data.total + '￥',
      success (res) {
        if (res.confirm) {
          for(var i = 0; i < that.data.cart.length; i++){
            if(that.data.cart[i].transport == '全国包邮'){
              var transportPrice = 0
              var price = that.data.cart[i].price * that.data.cart[i].count
            }
            if(that.data.cart[i].transport == '按重量计'){
              var transportPrice = that.data.cart[i].weight.slice(0,-1) * 0.01 * that.data.cart[i].count
              var price = that.data.cart[i].price * that.data.cart[i].count + transportPrice
            }
            
            wx.request({
              url: app.globalData.URL1 + 'createOrder',
              data:{
                orderCode: that.createCode(''),
                cover:  that.data.cart[i].cover,
                name:  that.data.cart[i].name,
                price:  price,
                transportPrice: transportPrice,
                transportWay: that.data.cart[i].transport,
                poster:  that.data.poster[i].nickName,
                posterID:  that.data.poster[i].openId,
                posterAera:  that.data.cart[i].posterArea,
                buyerID:  that.data.buyerID,
                buyerName:  that.data.address.name,
                buyerPhone: that.data.address.phone,
                buyerArea:  that.data.address.region + that.data.address.infos,
                shopID: that.data.cart[i].id,
                state: '1',
                amount: that.data.cart[i].count,
              },
              success: function(){
                wx.switchTab({
                  url: '/pages/index/index',
                  success: res =>{
                    wx.showToast({
                      title: '支付成功',
                      icon: 'success',
                      duration: 2000
                    })
                  }
                })
                
                wx.setStorageSync('cart', [])
              }
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

})