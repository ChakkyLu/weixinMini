//index.js
//获取应用实例
const lab = require('../../lib/lab');

const app = getApp()

Page({
  data: {
    labs: [
      { id: 'main', title: '主 页', icon: 'icon-home'},
      { id: 'function', title: '功 能', icon: 'icon-cog'},
      { id: 'mine', title: '我 的', icon: 'icon-sitemap'}
    ],
  },
  onLoad: function (options) {
  },
  onShow() {

  },

  clear() {
  }
})
