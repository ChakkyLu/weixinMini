// pages/novel/article.js
Page({

  /**
   * Page initial data
   */
  data: {
    followList: [{
      id: 1,
      name: "少帅你老婆又跑了",
      url: "http://www.rikuki.cn",
      status: 'none'
    },{
      id: 2,
      name: "巫蛊情纪",
      url: "http://www.rikuki.cn",
      status: 'none'
    }
    ]
  },
  changeItemStatus: function(e) {
    let index = e.currentTarget.dataset.index;
    let followList = this.data.followList;
    followList.forEach((follow)=>  {
      follow.status = 'none';
    });
    followList[index].status = 'block';
    this.setData({
      followList: followList
    });
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
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