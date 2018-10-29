const app = getApp();
const config = app.config;

worker.onMessage(function (res) {
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
})