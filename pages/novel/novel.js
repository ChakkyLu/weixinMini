// pages/main/main.js
const app = getApp();
const config = app.config;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: 0,
    notice: false,
    task:[],
    showModal: false,
    wordList: [],
    modal: {
      title: "",
      status: 1,
      notice: ""
    },
    inputWord: ""
  },
  curWord: "",
  genTask: function(e) {
    let amount = e.target.dataset.amount;
    var myPage = this;
    myPage.setData({notice: true});
    wx.request({
      url: `https://${config.host}/word/genTask?amount=${amount}`,
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        let data = res.data;
        let words = data.info;
        words.forEach((word) => {
          word.status = 1;
        });
        myPage.setData({ 
          notice: false,
          task: words
        });

      }
    });
  },
  changeWordStatus: function(e) {
    let tasks = this.data.task;
    let changeStatus = this.data.task[e.currentTarget.dataset.index];
    changeStatus.status = !changeStatus.status;
    tasks[e.currentTarget.dataset.index] = changeStatus;
    this.setData({
      task: tasks
    });
  },
  testWord: function(e) {
    let tasks = this.data.task;
    let wid = e.currentTarget.dataset.id;
    let word = tasks[wid].word;
    let myPage = this;
    let status = tasks[wid].status;
    if (!status) {
      myPage.curWord = word;
      myPage.setData({
        modal: {
          title: "验证单词",
          status: 1,
          notice: ""
        },
        showModal: true
      });
    }
    else {
      wx.request({
        url: `https://${config.host}/word/genS?word=${word}`,
        header: {
          'content-type': 'application/json'
        },
        success(res) {
          let wordList = res.data.info;
          myPage.setData({
            modal: {
              title: "近义词",
              status: 2,
              notice: ""
            },
            wordList: wordList,
            showModal: true
          });
        }
      });
    }

   
  },
  onLoad: function (options) {
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
    this.data.tweets.splice(0, this.data.tweets.length);
    this.callTwit();
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

  },

   preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  inputChange: function(e) {
    this.setData({
      inputWord: e.detail.value
    });
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    let modal = this.data.modal;
    if (modal.status == 1) {
      if (this.data.inputWord != this.curWord) {
        modal.notice = "验证单词失败";
        this.setData({
          modal: modal
        });
      } else {
        this.hideModal();
      }
    } else {
      this.hideModal();
    }

  }
})