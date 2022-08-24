// pages/List/List.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0, //0.全部 1.未完成 2.已完成
    taskList:[
      {
        id:1,
        title:'first',
        remarks:233,
        creatTime:'2022/8/24上午10:29:23',
        finishTime:'2022/8/24上午10:29:23',
        finished:false
      }
    ], //任务列表
    show:false, //展示page
    title:'',
    remarks:''
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
    let creatTime=new Date().toLocaleString();
    let task ={
      id:this.data.taskList.length+1,
      title:this.data.title,
      remarks:this.data.remarks,
      creatTime,
      finishTime:'',
      finished:false
    }
    this.setData({
      taskList:[...this.data.taskList,task],
      title:'',
      remarks:''
    })
  },
  //点击任务的勾选按钮，切换完成/未完成
  changeStatus(e){
    console.log(e);
    let id=e.currentTarget.id;
    this.setData({
      ['taskList['+(id-1)+'].finished']:!this.data.taskList[id-1].finished
    })
  },
  //点击任务右上角的叉叉，删除任务
  deleteTask(e){
    console.log(e) 
    let id=e.currentTarget.id 
    this.data.taskList.splice(id-1,1)
    for(let i=id-1;i<this.data.taskList.length;i++){
      console.log(i);
      this.setData({
        ['taskList['+i+'].id']:i+1
      })
    }
    this.setData({
      taskList:this.data.taskList
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