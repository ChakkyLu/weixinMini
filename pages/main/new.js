// pages/main/new.js
const app = getApp();
const config = app.config;

Page({

  /**
   * Page initial data
   */
  data: {
    array: [],
    newContent: "",
    index: 0
  },
  category: [],
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindKeyInput(e) {
    this.setData({
      newContent: e.detail.value
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var myPage = this;
    wx.request({
      url: `https://${config.host}/gtd/getTCa?id=19`,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        let data = res.data;
        wx.startPullDownRefresh({
          success: function () {
            myPage.setData({
              array: data.info,
              index: data.info.length -1
            });

          },
          fail: function () {

          }
        })
      }
    });
    
  },
  submit() {
    var myPage = this;
    wx.request({
      url: `https://${config.host}/gtd/newT`,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      data: {
        content: myPage.data.newContent,
        type: myPage.data.array[myPage.data.index].id
      },
      success(res) {
        let data = res.data;
        console.log(data);
      }
    });
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {
  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})