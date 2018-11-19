const config = {
  host: "www.rikuki.cn/api"
  };

worker.onMessage(function (res) {
  wx.request({
    url: `https://${config.host}/article/get46List`,
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      console.log(res);
    }
  });
})