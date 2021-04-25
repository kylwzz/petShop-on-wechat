// pages/user/poster/release/release.js
var util = require('../../../../utils/util.js')
const app = getApp();
var address = require("../../../../utils/mock.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],

    sexArray:['公','母'],
    sexIndex:0,
    isSterilization:['否','是'],
    isSterilizationIndex:0,
    enddate: '',
    nowdate: '',
    info: '',
    banner: [],
    bannerNew: [],
    chooseViewShowBanner: true,
    type:"",
    openid: null,
    area: '',
  },
  isSterilizationChangeHandler: function(e){
    console.log('picker选择发生变化，携带值为：', e.detail.value)
    this.setData({
      isSterilizationIndex: e.detail.value
    })
  },
  sexChangeHandler: function(e){
    console.log('picker选择发生变化，携带值为：', e.detail.value)
    this.setData({
      sexIndex: e.detail.value
    })
  },
  dateChangeHandler: function(e){
    console.log('picker选择发生变化，携带值为：', e.detail.value)
    this.setData({
      nowdate: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var DATE = util.formatDate(new Date());
    this.setData({
      enddate: DATE,
      nowdate: DATE
    })

    this.setData({
      type: options.type
    })

    // 默认联动显示北京
    var id = address.provinces[0].id
    var that = this
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
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
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear',
    })
    this.animation = animation
  },
  selectArea:function(e){
    // 如果已经显示，不在执行显示动画
    if (this.data.addressMenuIsShow) {
      return false
    } else {
      // 执行显示动画
      this.startAddressAnimation(true)
    }
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    if (isShow) {
      // vh是用来表示尺寸的单位，高度全屏是100vh
      this.animation.translateY(0 + 'vh').step()
    } else {
      this.animation.translateY(40 + 'vh').step()
    }
    this.setData({
      animationAddressMenu: this.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    this.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    /* var area = that.data.citys[value[1]].name + '-' + that.data.areas[value[2]].name */
    var area = that.data.provinces[value[0]].name + '-' + that.data.citys[value[1]].name + '-' + that.data.areas[value[2]].name
    that.setData({
      area: area,
    })
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    // 如果省份选择项和之前不一样，表示滑动了省份，此时市默认是省的第一组数据，
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      // 滑动选择了第二项数据，即市，此时区显示省市对应的第一组数据
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id],
      })
    } else {
      // 滑动选择了区
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
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
  formSubmit(e){
    var that = this
    var sex = this.data.sexArray[e.detail.value.sex]
    var sterilization = this.data.isSterilization[e.detail.value.sterilization]
    let cover = ''
    var flag = that.data.banner[0].charAt(0)
    if(flag == 'h'){
      cover = that.data.banner[0].slice(11)
    }else if(flag == 'w'){
      cover =  that.data.banner[0].slice(9)
    }
    if(e.detail.value.petName == ''){
      wx.showToast({
        title: '请输入宠物名',
        image: "../../../../assets/reminder.png"
      })
      return false
    }
    if(e.detail.value.price == ''){
      wx.showToast({
        title: '请输入价格',
        image: "../../../../assets/reminder.png"
      })
      return false
    }
    if(e.detail.value.birth == ''){
      wx.showToast({
        title: '请输入价格',
        image: "../../../../assets/reminder.png"
      })
      return false
    }
    if(e.detail.value.info == ''){
      wx.showToast({
        title: '请输入宠物介绍',
        image: "../../../../assets/reminder.png"
      })
      return false
    }
    if(e.detail.value.area == ''){
      wx.showToast({
        title: '请输入发布地',
        image: "../../../../assets/reminder.png"
      })
      return false
    }
    if(that.data.banner.length == 0){
      wx.showToast({
        title: '请上传宠物图片',
        image: "../../../../assets/reminder.png"
      })
      return false
    }

    wx.request({
      url: 'http://10.20.88.30:8080/postPet',
      data:{
        petName: e.detail.value.petName,
        Price: e.detail.value.price,
        Birth: e.detail.value.birth,
        sex: sex,
        Sterilization: sterilization,
        infos: e.detail.value.info,
        //封面，利用slice截取出文件名字
        cover: cover,
        openid: app.globalData.openid,
        area: e.detail.value.area,
        type: this.data.type
      },
      success: res =>{
        //上传的图片名字
        console.log(res.data)
        var data = []
        data.i = 0
        data.position = res.data
        this.uploadimg(data)
      },
      complete(res){
        wx.navigateBack({
          delta: 0,
        })
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  /* 上传图片到服务器 */
  uploadimg: function(e){
    var that = this
    var i = e.i
    var position = e.position
    var length = that.data.banner.length
    wx.uploadFile({
      filePath: that.data.banner[i],
      name: 'files',
      url: 'http://10.20.88.30:8080/postPetPics?position=' + position,
      success: function(res){

      },
      complete: function(){
        //正在上传第几张图片
        //console.log(i)
        i++
        if(i == length){
          console.log("全部上传完成")
        }else{
          e.i = i
          that.uploadimg(e)
        }
      }
    })
  },
  /* 查看大图 */
  showImageBanner: function(e) {
    var banner = this.data.banner;
    var itemIndex = e.currentTarget.dataset.id;
    wx.previewImage({
      current: banner[itemIndex], // 当前显示图片的http链接
      urls: banner // 需要预览的图片http链接列表
    })
    console.log(banner[itemIndex])
  },
  chooseBanner: function(){
    var that = this;
    if(that.data.banner.length < 4){
      wx.chooseImage({
        count: 4,
        success: function(photo){
          var banner = that.data.banner
          banner = banner.concat(photo.tempFilePaths)
          var bannerNew = that.data.bannerNew
          bannerNew = bannerNew.concat(photo.tempFilePaths)
          that.setData({
            banner: banner,
            bannerNew: bannerNew,
            /* checkUP: false */
          })
        }
      })
    }
  },
  deleteImvBanner: function(e){
    var that = this
    var banner = that.data.banner
    var itemIndex = e.currentTarget.dataset.id
    if(banner.length != 0){
      wx.showModal({
        title: '提示',
        content: '删除不可恢复',
        success(res){
          if(res.confirm){
            banner.splice(itemIndex, 1)
            that.setData({
              banner: banner
            })
          }
        }
      })
    }
  },
})