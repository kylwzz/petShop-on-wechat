// pages/order/order.js
const fetch = require('../../utils/fetch.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:{},
    address: [],
    index: 0,
    poster: {},
    singlePrice: 0,
    index: 0,
    transportPrice: 0,
    transportSinglePrice: 0,
    transportArray:[{
      'id': '0',
      'text': '自提0元',
      'checked': true,
      'price': 0
    },{
      'id': '1',
      'text': '汽运350元',
      'checked': false,
      'price': 350 
    },{
      'id': '2',
      'text': '空运750元',
      'checked': false,
      "price": 750
    }],
    transportWay: '自提',
    fromCart: false,
    cart: [],
    indexCart: 0,
  },
  changetransportArray: function(e){
    var arr = this.data.transportArray
    var index = e.currentTarget.dataset.id

    arr.forEach(item =>{
      item.checked = false
    })
    arr[index].checked = true;

    this.data.order.price = this.data.order.price - this.data.transportPrice + arr[index].price
    
    this.setData({
      transportArray: this.data.transportArray,
      transportPrice: arr[index].price,
      transportWay: arr[index].text.slice(0,2),
      order: this.data.order
    })
  },
  addCount: function(e){
    if(this.data.order.transport == '全国包邮'){
      this.data.order.amount += 1
      this.data.order.price += this.data.singlePrice
    }
    

    if(this.data.order.transport == '按重量计'){
      this.data.order.amount += 1
      this.data.transportSinglePrice = this.data.order.weight.slice(0,-1) * 0.01
      this.data.transportPrice += this.data.transportSinglePrice
      this.data.order.price = this.data.order.price + this.data.singlePrice + this.data.transportSinglePrice
    }
    

    this.setData({
      order: this.data.order,
      transportPrice: this.data.transportPrice
    })
  },
  delCount: function(e){
    if(this.data.order.amount <= 1){
      return
    }

    if(this.data.order.transport == '全国包邮'){
      this.data.order.amount -= 1
      this.data.order.price -= this.data.singlePrice
    }


    if(this.data.order.transport == '按重量计'){
      this.data.order.amount -= 1
      this.data.transportSinglePrice = this.data.order.weight.slice(0,-1) * 0.01
      this.data.transportPrice -= this.data.transportSinglePrice
      this.data.order.price = this.data.order.price - this.data.singlePrice - this.data.transportSinglePrice
    }
    

    this.setData({
      order: this.data.order,
      transportPrice: this.data.transportPrice
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    //收货地址
    fetch('myAddress', wx.getStorageSync('myOpenid')).then(res => {
      this.setData({
        address:res.data,
      })
    })

    const foo = this.getOpenerEventChannel()

      //与商品信息界面通信 传参
      foo.on('foo', function(data) {
        that.setData({
          order: data.data,
        })
      })

      this.setData({
        singlePrice: this.data.order.price
      })

      if(this.data.order.transport == '按重量计'){
        this.data.transportPrice += this.data.order.weight.slice(0,-1) * 0.01
        this.data.order.price += this.data.transportPrice
        this.setData({
          order: this.data.order,
          transportPrice: this.data.transportPrice
        })
      }

      //发布人信息
      fetch('getPosterInfos', this.data.order.posterID).then(res =>{
        this.setData({
          poster: res.data
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
  //选择地址
  chooseAddress: function(e){
    wx.navigateTo({
      url: './chooseAddress/chooseAddress',
    })
  },
  createCode: function(orderCode){
    // 6位随机数(加在时间戳后面)
    for (var i = 0; i < 6; i++){
      orderCode += Math.floor(Math.random() * 10);
    }

    // 时间戳(用来生成订单号)
    orderCode = 'D' + new Date().getTime() + '-' +  orderCode;
    return orderCode;
  },
  Pay: function(e){
    var that = this
     
    this.data.order.buyerName = this.data.address[this.data.index].name
    this.data.order.buyerPhone = this.data.address[this.data.index].phone
    this.data.order.buyerArea = this.data.address[this.data.index].region + this.data.address[this.data.index].infos
    this.setData({
      order: this.data.order
    })

    //生成订单号
    this.data.order.orderCode = this.createCode(this.data.order.orderCode)
    console.log(this.data.order)

    if(this.data.order.transport == '全国包邮'){
      this.setData({
        transportWay: this.data.order.transport,
      })
    }else if(this.data.order.transport == '按重量计'){
      this.setData({
        transportWay: this.data.order.transport,
      })
    }

    wx.showModal({
      title: '支付',
      content: '支付' + that.data.order.price + '￥',
      success (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.URL1 + 'createOrder',
            data:{
                orderCode: that.data.order.orderCode,
                cover:  that.data.order.cover,
                name:  that.data.order.name,
                price:  that.data.order.price,
                transportPrice: that.data.transportPrice,
                transportWay: that.data.transportWay,
                poster:  that.data.poster.nickName,
                posterID:  that.data.order.posterID,
                posterAera:  that.data.order.posterAera,
                buyerID:  that.data.order.buyerID,
                buyerName:  that.data.order.buyerName,
                buyerPhone: that.data.order.buyerPhone,
                buyerArea:  that.data.order.buyerArea,
                shopID: that.data.order.shopid,
                state: '1',
                amount: that.data.order.amount,
                type: that.data.order.type
            },
            success: res =>{
              wx.navigateBack({
                delta: 99,
              })
/*               wx.switchTab({
                url: '/pages/index/index',
                success: function(){
                  var page = getCurrentPages().pop(); 
                  if (page == undefined || page == null) return; 
                  page.onLoad()
                  wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
              }) */
            }
          })
        } else if (res.cancel) {
          if(that.data.order.type == 0){
            wx.request({
              url: app.globalData.URL1 + 'createOrder',
              data:{
                  orderCode: that.data.order.orderCode,
                  cover:  that.data.order.cover,
                  name:  that.data.order.name,
                  price:  that.data.order.price,
                  transportPrice: that.data.transportPrice,
                  transportWay: that.data.transportWay,
                  poster:  that.data.poster.nickName,
                  posterID:  that.data.order.posterID,
                  posterAera:  that.data.order.posterAera,
                  buyerID:  that.data.order.buyerID,
                  buyerName:  that.data.order.buyerName,
                  buyerPhone: that.data.order.buyerPhone,
                  buyerArea:  that.data.order.buyerArea,
                  shopID: that.data.order.shopid,
                  supplyID: that.data.order.supplyID,
                  state: '0',
                  amount: that.data.order.amount,
                  type: that.data.order.type,
              },
              success: res =>{
                wx.redirectTo({
                  url: '/pages/user/orderList/orderList?idx=0',
                  success: res =>{
                    wx.showToast({
                      title: '请尽快支付',
                      icon: 'error',
                      duration: 2000
                    })
                  }
                })
              }
            })
          }else if(that.data.order.type == 1){
            wx.navigateBack({
              delta: 0,
            })
          }
        }
      }
    })
  
  }
})