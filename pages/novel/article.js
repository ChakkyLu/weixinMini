// pages/novel/article.js
const app = getApp();
const config = app.config;
const statusNum = 4;

Page({

  /**
   * Page initial data
   */
  data: {
    array: [],
    followList: [],
    pageSelect: 0
  },
  changeItemStatus: function(e) {
    let index = e.currentTarget.dataset.index;
    let followList = this.data.followList; 
    for(let i=0; i<followList.length; i++) {
      let status = followList[i].status;
      if (i==index)  {
        status[0] = 'block';
      }
      else {
        status[0] = 'none';
      } 
    }
    followList[index].status.shift();
    followList[index].status.unshift('block');
    this.setData({
      followList: followList
    });
  },
  backStatus: function(e) {
    let index = e.currentTarget.dataset.index;
    let status = e.currentTarget.dataset.status;
    let followList = this.data.followList;
    switch(status) {
      case "booklist":
        {
          followList[index].status = ['block', 'block', 'none', 'none'];
          break;
        }
      case "content":
        {
          followList[index].status = ['block', 'none', 'block', 'none'];
          break;
        }
      default:
        break
    }
    this.setData({
      followList: followList
    });
  },

  getBookChapter: function(curpage, index) {
    let page = this;
    let followList = this.data.followList;
    followList[index].status = ['block', 'none', 'block', 'none'];
    let chapters = [];
    wx.request({
      url: `https://${config.host}/article/getNovelC?page=${curpage}&id=${followList[index].id}`,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        chapters = res.data.info;
        followList[index].chapters = chapters;
        page.setData({
          followList: followList
        });
      }
    });
  },


  getChapterContent: function (index, cid, url, ctitle) {
    let page = this;
    let followList = this.data.followList;
    let bid = followList[index].id;
    wx.request({
      url: `https://${config.host}/article/getCC?url=${url}&bid=${bid}&cid=${cid}&ct=${ctitle}`,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        followList[index].selectTitle = ctitle;
        followList[index].content = res.data.info;
        page.setData({
          followList: followList
        });
      }
    });
  },




  bookDetail: function (e) {
    let index = e.currentTarget.dataset.index;
    this.getBookChapter(1, index);
  },
  getContent: function (e) {
    let index = e.currentTarget.dataset.index;
    let chapterid = e.currentTarget.dataset.cid;
    let url = e.currentTarget.dataset.url;
    let ct = e.currentTarget.dataset.title;
    this.getChapterContent(index, chapterid, url, ct);
    let followList = this.data.followList;
    followList[index].status = ['block', 'none', 'none', 'block'];
    this.setData({
      followList: followList
    });

  },

  /**
   * Lifecycle function--Called when page load
   */
  genPageArray: function(n) {
    let total = n / 10;
    let arr = [];
    for(let i=0; i<total; i++) {
      arr.push({index:i+1, text:"第"+(i+1)+"页"});
    }
    return arr;
  },
  onLoad: function (options) {
    var page = this;
    wx.request({
      url: `https://${config.host}/article/get46List`,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        var followList = res.data.info;
        followList.forEach(follow => {
          let status = ['none', 'block', 'none', 'none'];
          follow.status = status;
          follow.array = page.genPageArray(parseInt(follow.latest_id));
          follow.new = follow.latest_id - follow.last_id + "章" ;
          follow.content = "";
        });
        page.setData({
          followList: followList
        })
      }
    });
  },
  bindPickerChange: function (e) {
    let bid = e.currentTarget.dataset.index;
    this.setData({
      pageSelect: e.detail.value
    });
    this.getBookChapter(e.detail.value, bid);
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