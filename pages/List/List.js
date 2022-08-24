// pages/List/List.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0, //0.全部 1.未完成 2.已完成
    taskList:[], //任务列表
    show:false //展示page
  },
  //切换标签
  onChange(event) {
    console.log(event);
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
    this.setData({
      index:event.detail.index
    })
  },
  //点击添加按钮
  addTask(){
    this.setData({
      show:true
    })
  },
  //添加任务面板
  onClose() {
    this.setData({ show: false });
  },

  onGetUserInfo(e) {
    console.log(e.detail);
  },
  //点击确认添加
  addConfirm(){
    this.setData({
      show:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})