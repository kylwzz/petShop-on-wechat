// pages/index/index.js
const fetch = require('../../utils/fetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     //判断小程序的API，回调，参数，组件等是否在当前版本可用。
     canIUse: wx.canIUse('button.open-type.getUserInfo'),
     isHide: false,
     pets: [],
     newest: [],
     timeCode: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.hideTabBar({
      animation: false,
    })
    //查看是否授权
    wx.getSetting({
      success: function(res){
        if(res.authSetting['scope.userInfo']){
          /* wx.getUserInfo({
            success: function(res){
        // 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
        // 根据自己的需求有其他操作再补充
        // 我这里实现的是在用户授权成功后，调用微信的 wx.login 接口，从而获取code
              wx.login({
                success: res =>{
                  // 可以传给后台，再经过解析获取用户的 openid
                  // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
                  wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1df9b19ea6463f9c&secret=49a40a084fc17c7df50a8943daba3558&js_code=' + res.code + '&grant_type=authorization_code',
                    success: res =>{
                      wx.setStorageSync('myOpenid', res.data.openid)
                      wx.setStorageSync('testOpenid', '123')
                    }
                  })
                }
              })
            }
          }) */
        }else{
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          console.log(res.authSetting)
          that.setData({
            isHide: true
          })
        }
      }
    }),

    fetch('onloadDiscount').then(res => {
      this.setData({
        pets: res.data
      })
    })

    fetch('onloadNewest').then(res => {
      this.setData({
        newest: res.data
      })
    })
    
  },
  bindGetUserInfo: function(e){
    var that = this

    var nickName = ''
    var country = ''
    var city = ''
    var province = ''
    var avatarUrl = ''

    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);

        nickName = res.userInfo.nickName,
        country = res.userInfo.country,
        city = res.userInfo.city,
        province = res.userInfo.province,
        avatarUrl = res.userInfo.avatarUrl

        wx.login({
          success: res =>{
           /*  console.log("用户的code：" + res.code); */
            // 可以传给后台，再经过解析获取用户的 openid
            // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1df9b19ea6463f9c&secret=49a40a084fc17c7df50a8943daba3558&js_code=' + res.code + '&grant_type=authorization_code',
              success: res =>{
                wx.setStorageSync('myOpenid', res.data.openid)
                wx.setStorageSync('testOpenid', '123')

                wx.request({
                  url: 'http://192.168.31.140:8080/register',
                  data :{
                    openId: wx.getStorageSync('myOpenid'),
                    nickName: nickName,
                    country: country,
                    city: city,
                    province: province,
                    avatarUrl: avatarUrl
                  },
                })

              }
            })
          }
        })

        wx.showTabBar({
          animation: true,
        })
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          isHide: false
        })
      },
      fail:(res) => {
        console.log("123123123");
      }
    })

/*     if(e.detail.userInfo){
      //用户按了允许授权按钮
      var that = this;
      //将获取到的用户信息打印到控制台
      console.log("用户信息如下：")
      console.log(e.detail.userInfo);

      //将openid等用户信息传到后台服务器
      wx.login({
        success: res =>{
          console.log("用户的code" + res.code);
          // 可以传给后台，再经过解析获取用户的 openid
          // 或者可以直接使用微信的提供的接口直接获取 openid ，方法如下：
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx1df9b19ea6463f9c&secret=49a40a084fc17c7df50a8943daba3558&js_code=' + res.code + '&grant_type=authorization_code',
            success: res =>{
              console.log("用户的openid：" + res.data.openid);
              wx.request({
                url: 'http://192.168.31.140:8080/register',
                data :{
                  openId: res.data.openid,
                  nickName: e.detail.userInfo.nickName,
                  conuntry: e.detail.userInfo.country,
                  city: e.detail.userInfo.city,
                  province: e.detail.userInfo.province,
                  avatarUrl: e.detail.userInfo.avatarUrl
                },
                success(res){
                  that.onLoad() 
                }
              })
            }
          })
        }
      })

      //授权成功后，通过改变 isHide 的值，让实际页面实现出来，把授权界面隐藏
      that.setData({
        isHide: false
      });
    }else{
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res){
          if(res.confirm){
            console.log("用户点击了“返回授权”")
          }
        }
      })
    } */
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
    fetch('onloadDiscount').then(res => {
      this.setData({
        pets: res.data
      })
    })

    fetch('onloadNewest').then(res => {
      this.setData({
        newest: res.data
      })
    })
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  testInfos: function(e){
    console.log(e.detail.userInfo)
  },
  onRefresh(){
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading(); 
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...',
    })
    this.getData();
  },
  getData(){
    fetch('onloadDiscount').then(res => {
      this.setData({
        pets: res.data
      })
    })

    fetch('onloadNewest').then(res => {
      this.setData({
        newest: res.data
      })
    }).then(res => {
      //隐藏loading 提示框
      wx.hideLoading();
      //隐藏导航条加载动画
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    })
  },
  onPullDownRefresh: function () {
    //调用刷新时将执行的方法
  this.onRefresh();
}
})