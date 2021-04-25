// pages/catlist/catlist.js
const fetch = require('../../utils/fetch')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['猫猫', '狗狗', '小宠'],
    currentTab: 0,
    selectPriceArray: [{
      "id": "0",
      "text": "不限"
  }, {
      "id": "1",
      "text": "2000以下"
  }, {
    "id": "2",
    "text": "2000-5000"
  }, {
  "id": "3",
  "text": "5000-10000"
  }, {
  "id": "4",
  "text": "10000以上"
}],
    selectSexArray: [{
  "id": "0",
  "text": "不限"
  }, {
  "id": "1",
  "text": "公"
  }, {
    "id": "2",
    "text": "母"
    }],
    cats:[],
    dogs:[],
    smalls: [],
    catlimitSex:"不限",
    doglimitSex:"不限",
    smalllimitSex: '不限',
    catlimitMin:0,
    catlimitMax:10000,
    doglimitMin:0,
    doglimitMax:10000,
    smalllimitMin:0,
    smalllimitMax:10000,
    hasMoreCat: true,
    hasMoreDog: true,
    catsAll: 0,
    catPages: 0,
    dogPages: 0,
    dogsAll: 0
  },
  /* 猫猫限制条件修改 */
  catgetPrice: function(e){
    switch(e.detail.id){
      case 0:
        this.setData({
          catlimitMin:0,
          catlimitMax:9999999
        })

        console.log(this.data.catlimitMin)

        fetch("findCatByLimit",this.data.catlimitSex, this.data.catlimitMin, this.data.catlimitMax).then(res => {
          this.setData({
            cats: res.data
          })
        })
        break;
      case 1:
        this.setData({
          catlimitMin:0,
          catlimitMax:2000
        })

        console.log(this.data.catlimitMin)

        fetch("findCatByLimit",this.data.catlimitSex, this.data.catlimitMin, this.data.catlimitMax).then(res => {
          this.setData({
            cats: res.data
          })
        })
        break;
      case 2:
        this.setData({
          catlimitMin:2000,
          catlimitMax:5000
        })

        console.log(this.data.catlimitMin)

        fetch("findCatByLimit",this.data.catlimitSex, this.data.catlimitMin, this.data.catlimitMax).then(res => {
          this.setData({
            cats: res.data
          })
        })
        break;
      case 3:
        this.setData({
          catlimitMin:5000,
          catlimitMax:10000
        })

        console.log(this.data.catlimitMin)

        fetch("findCatByLimit",this.data.catlimitSex, this.data.catlimitMin, this.data.catlimitMax).then(res => {
          this.setData({
            cats: res.data
          })
        })
        break;
      case 4:
        this.setData({
          catlimitMin:10000,
          catlimitMax:9999999
        })

        console.log(this.data.catlimitMin)
        
        fetch("findCatByLimit",this.data.catlimitSex, this.data.catlimitMin, this.data.catlimitMax).then(res => {
          this.setData({
            cats: res.data
          })
        })
        break;
    }
  },
  /* 猫猫限制条件修改 */
  catgetSex:function(e){
    console.log(e.detail)
    switch(e.detail.id){
      case 0:
        this.setData({
          catlimitSex:'不限'
        })
        fetch("findCatByLimit",this.data.catlimitSex, this.data.catlimitMin, this.data.catlimitMax).then(res => {
          this.setData({
            cats: res.data
          })
        })
        break;
      case 1:
        this.setData({
          catlimitSex:'公'
        })
        fetch("findCatByLimit",this.data.catlimitSex, this.data.catlimitMin, this.data.catlimitMax).then(res => {
          this.setData({
            cats: res.data
          })
        })
        break;
      case 2:
        this.setData({
          catlimitSex:'母'
        })
        fetch("findCatByLimit",this.data.catlimitSex, this.data.catlimitMin, this.data.catlimitMax).then(res => {
          this.setData({
            cats: res.data
          })
        })
        break;
    }
  },
  /* 狗狗限制条件修改 */
  doggetPrice: function(e){
    switch(e.detail.id){
      case 0:
        this.setData({
          doglimitMin:0,
          doglimitMax:9999999
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            dogs: res.data
          })
        })
        break;
      case 1:
        this.setData({
          doglimitMin:0,
          doglimitMax:2000
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            dogs: res.data
          })
        })
        break;
      case 2:
        this.setData({
          doglimitMin:2000,
          doglimitMax:5000
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            dogs: res.data
          })
        })
        break;
      case 3:
        this.setData({
          doglimitMin:5000,
          doglimitMax:10000
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
           dogs: res.data
          })
        })
        break;
      case 4:
        this.setData({
          doglimitMin:10000,
          doglimitMax:9999999
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            dogs: res.data
          })
        })
        break;
    }
  },
  /* 狗狗限制条件修改 */
  doggetSex:function(e){
    switch(e.detail.id){
      case 0:
        this.setData({
          doglimitSex:'不限'
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            dogs: res.data
          })
        })
        break;
      case 1:
        this.setData({
          doglimitSex:'公'
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            dogs: res.data
          })
        })
        break;
      case 2:
        this.setData({
          doglimitSex:'母'
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            dogs: res.data
          })
        })
        break;
    }
  },
    /* 狗狗限制条件修改 */
  doggetPrice: function(e){
    switch(e.detail.id){
      case 0:
        this.setData({
          doglimitMin:0,
          doglimitMax:9999999
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            dogs: res.data
          })
        })
        break;
      case 1:
        this.setData({
          doglimitMin:0,
          doglimitMax:2000
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            dogs: res.data
          })
        })
        break;
      case 2:
        this.setData({
          doglimitMin:2000,
          doglimitMax:5000
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            dogs: res.data
          })
        })
        break;
      case 3:
        this.setData({
          doglimitMin:5000,
          doglimitMax:10000
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
           dogs: res.data
          })
        })
        break;
      case 4:
        this.setData({
          doglimitMin:10000,
          doglimitMax:9999999
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            dogs: res.data
          })
        })
        break;
    }
  },
    /* 狗狗限制条件修改 */
  doggetSex:function(e){
    switch(e.detail.id){
      case 0:
        this.setData({
          doglimitSex:'不限'
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            dogs: res.data
          })
        })
        break;
      case 1:
        this.setData({
          doglimitSex:'公'
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            dogs: res.data
          })
        })
        break;
      case 2:
        this.setData({
          doglimitSex:'母'
        })
        fetch("findDogByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            dogs: res.data
          })
        })
        break;
    }
  },
  /* 小宠限制条件修改 */
  smallgetSex:function(e){
    switch(e.detail.id){
      case 0:
        this.setData({
          smalllimitSex:'不限'
        })
        fetch("findSmallByLimit",this.data.smalllimitSex, this.data.smalllimitMin, this.data.smalllimitMax).then(res => {
          this.setData({
            smalls: res.data
          })
        })
        break;
      case 1:
        this.setData({
          smalllimitSex:'公'
        })
        fetch("findSmallByLimit",this.data.smalllimitSex, this.data.smalllimitMin, this.data.smalllimitMax).then(res => {
          this.setData({
            smalls: res.data
          })
        })
        break;
      case 2:
        this.setData({
          smalllimitSex:'母'
        })
        fetch("findSmallByLimit",this.data.smalllimitSex, this.data.smalllimitMin, this.data.smalllimitMax).then(res => {
          this.setData({
            smalls: res.data
          })
        })
        break;
    }
  },
  /* 小宠限制条件修改 */
  smallgetPrice: function(e){
    switch(e.detail.id){
      case 0:
        this.setData({
          smalllimitMin:0,
          smalllimitMax:9999999
        })
        fetch("findSmallByLimit",this.data.smalllimitSex, this.data.smalllimitMin, this.data.smalllimitMax).then(res => {
          this.setData({
            smalls: res.data
          })
        })
        break;
      case 1:
        this.setData({
          smalllimitMin:0,
          smalllimitMax:2000
        })
        fetch("findSmallByLimit",this.data.doglimitSex, this.data.doglimitMin, this.data.doglimitMax).then(res => {
          this.setData({
            smalls: res.data
          })
        })
        break;
      case 2:
        this.setData({
          smalllimitMin:2000,
          smalllimitMax:5000
        })
        fetch("findSmallByLimit",this.data.smalllimitSex, this.data.smalllimitMin, this.data.smalllimitMax).then(res => {
          this.setData({
            smalls: res.data
          })
        })
        break;
      case 3:
        this.setData({
          smalllimitMin:5000,
          smalllimitMax:10000
        })
        fetch("findSmallByLimit",this.data.smalllimitSex, this.data.smalllimitMin, this.data.smalllimitMax).then(res => {
          this.setData({
           smalls: res.data
          })
        })
        break;
      case 4:
        this.setData({
          smalllimitMin:10000,
          smalllimitMax:9999999
        })
        fetch("findSmallByLimit",this.data.smalllimitSex, this.data.smalllimitMin, this.data.smalllimitMax).then(res => {
          this.setData({
            smalls: res.data
          })
        })
        break;
    }
  },
  navbarTap: function(e){
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    fetch('getCatALL').then(res => {
      this.setData({
        petsAll: res.data
      })
    })

    fetch('getCats', 0).then(res => {
      that.setData({
        cats: res.data
      })
    })

    fetch('getDogALL').then(res => {
      this.setData({
        dogsAll: res.data
      })
    })

    fetch('getDogs', 0).then(res => {
      that.setData({
        dogs: res.data
      })
    })

    fetch('getSmalls', 0).then(res => {
      that.setData({
        smalls: res.data
      })
    })

    if(options.idx == 1 ){
      var data = []
      data.currentTarget = []
      data.currentTarget.dataset = []
      data.currentTarget.dataset.idx = 1
      this.navbarTap(data)
    }

    if(options.idx == 2 ){
      var data = []
      data.currentTarget = []
      data.currentTarget.dataset = []
      data.currentTarget.dataset.idx = 2
      this.navbarTap(data)
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
    if(this.data.currentTab == 0){
      if(!this.data.hasMoreCat) return
      const catPages = this.data.catPages + 10

      fetch('getCats', catPages).then(res => {
        const cats = this.data.cats.concat(res.data)
        const hasMoreCat = cats.length < this.data.catsAll
        this.setData({
          catPages: catPages,
          cats: cats,
          hasMoreCat : hasMoreCat
        })
      })
    }else if(this.data.currentTab == 1){
      if(!this.data.hasMoreDog) return
      const dogPages = this.data.dogPages + 10

      fetch('getDogs', dogPages).then(res => {
        const dogs = this.data.dogs.concat(res.data)
        const hasMoreDog = dogs.length < this.data.dogsAll
        this.setData({
          dogPages: dogPages,
          dogs: dogs,
          hasMoreDog : hasMoreDog
        })
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})