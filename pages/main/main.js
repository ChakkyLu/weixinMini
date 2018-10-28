// pages/main/main.js
const app = getApp();
const config = app.config;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tweets: [],
    fontSize: 12,
    curPage: 1,
    totalPage: 1,
    showPan: true
  },
  adjustFont(event) {
    let n = this.data.fontSize + parseInt(event.target.dataset.adjust);
    this.setData({
      fontSize: n
    })
  },
  delTweet(event) {
    let n = event.target.dataset.id;
    var myPage = this;

    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: `https://${config.host}/gtd/delT?tid=${n}`,
            header: {
              'content-type': 'application/json'
            },
            success(res) {
              let data = res.data;
            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
  clickScreen() {
    this.setData({
      showPan: true
    });
  },
  showExpand() {
    this.setData({
      showPan: !this.data.showPan
    })
  },
  newTweet() {
    wx.navigateTo({url:"new"});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  callTwit(n=1) {
    var thisPage = this;
    wx.request({
      url: `https://${config.host}/gtd/getFTW?id=19&page=${n}`,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        let data = res.data;
        let tweets = thisPage.data.tweets;
        data.info.ctx.forEach((twit) => {
          tweets.push(twit);
        });
        thisPage.setData({
          tweets: tweets,
          totalPage: data.info.totalPage
        });
      }
    });
  },
  onLoad: function (options) {
    // this.callTwit();
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
    wx.startPullDownRefresh();
    this.setData({
      showPan: true
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    console.log("hahah");
    this.data.tweets.splice(0,this.data.tweets.length);
    this.callTwit();
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let page = this.data.curPage;
    if (page < this.data.totalPage) {
      this.setData({
        curPage: page + 1
      });
      this.callTwit(page + 1);
    } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})