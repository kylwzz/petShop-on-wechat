// pages/supplyList/supplyList.js
const app = getApp()
const fetch = require('../../utils/fetch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectClassifyArray: [{
      "id": "0",
      "text": "全部"
    },{
      "id": "1",
      "text": "宠粮"
    },{
      "id": "2",
      "text": "零食"
    },{
      "id": "3",
      "text": "玩具用品"
    },],
    selectStageArray: [{
      "id": '0',
      "text": '品种'
    },{
      "id": '1',
      "text": '猫猫'
    },{
      "id": '2',
      "text": '狗狗'
    },],
    classify: "全部",
    stage: "品种",
    supplies: []
  },
  /* 分类限制条件修改 */
  getClassify:function(e){
    switch(e.detail.id){
      case 0:
        this.setData({
          classify: '全部'
        })
        fetch('getSuppliesByLimit', this.data.classify, this.data.stage).then(res => {
          this.setData({
            supplies: res.data
          })
        })
        break;
      
      case 1:
        this.setData({
          classify: '宠粮'
        })
        fetch('getSuppliesByLimit', this.data.classify, this.data.stage).then(res => {
          this.setData({
            supplies: res.data
          })
        })
        break;
      
      case 2:
        this.setData({
          classify: '零食'
        })
        fetch('getSuppliesByLimit', this.data.classify, this.data.stage).then(res => {
          this.setData({
            supplies: res.data
          })
        })
        break;
      case 3:
        this.setData({
          classify: '玩具用品'
        })
        fetch('getSuppliesByLimit', this.data.classify, this.data.stage).then(res => {
          this.setData({
            supplies: res.data
          })
        })
        break;
    }
  },
  /* 品种限制条件修改 */
  getStage: function(e){
    switch(e.detail.id){
      case 0:
        this.setData({
          stage: '品种'
        })
        fetch('getSuppliesByLimit', this.data.classify, this.data.stage).then(res => {
          this.setData({
            supplies: res.data
          })
        })
        break;
      
      case 1:
        this.setData({
          stage: '猫'
        })
        fetch('getSuppliesByLimit',this.data.classify, this.data.stage).then(res => {
          this.setData({
            supplies: res.data
          })
        })
        break;

      case 2:
        this.setData({
          stage: '犬'
        })
        fetch('getSuppliesByLimit', this.data.classify, this.data.stage).then(res => {
          this.setData({
            supplies: res.data
          })
        })
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.classify == '全部' && options.stage == '品种'){
      fetch("getSuppliesByLimit", options.classify, options.stage).then(res => {
        this.setData({
          supplies: res.data
        })
      })
    }else{
      fetch("getSupplies", options.classify).then(res => {
        this.setData({
          supplies: res.data
        })
      })
    }
    
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