// pages/List/List.js

var util = require('../../utils/util.js'); //导入util以便使用时间
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0, //0.全部 1.未完成 2.已完成
    taskList: [{
      id: 1,
      title: '示例任务',
      remarks: "1.点击底部'+'添加任务\n          2.右侧勾选栏完成任务\n          3.右上角'x'删除任务",
      creatTime: '2022/08/24 13:00:47',
      finishTime: '',
      finished: false
    }], //任务列表
    showList: [],
    unfinishedCount: 0,
    finishedCount: 0,
    show: false, //展示添加任务面板
    showEdit: false, //展示修改任务面板
    title: '',
    remarks: '',
    changeTitle:'',
    changeRemarks:'',
    changeIdx:0,
  },
  //切换标签
  onChange(event) {
    console.log(event);
    this.setData({
      index: event.detail.index
    })
    this.updataShowList()
  },
  //点击添加按钮
  addTask() {
    this.setData({
      show: true
    })
  },
  //添加任务面板
  onClose() {
    this.setData({
      show: false
    });
  },

  onGetUserInfo(e) {
    console.log(e.detail);
  },
  //点击确认添加
  addConfirm() {
    if (!this.data.title) {
      wx.showToast({
        title: '请输入任务标题！',
        icon: 'error',
        duration: 1500
      })
      return
    }
    this.setData({
      show: false
    })
    let creatTime = util.formatTime(new Date());
    let task = {
      id: this.data.taskList.length + 1,
      title: this.data.title,
      remarks: this.data.remarks,
      creatTime,
      finishTime: '',
      finished: false
    }
    this.setData({
      taskList: [...this.data.taskList, task],
      title: '',
      remarks: ''
    })
    this.updataShowList()
  },
  //点击任务的勾选按钮，切换完成/未完成
  changeStatus(e) {
    console.log(e);
    let id = e.currentTarget.id;
    let finishTime = util.formatTime(new Date());
    this.setData({
      ['taskList[' + (id - 1) + '].finished']: !this.data.taskList[id - 1].finished,
      ['taskList[' + (id - 1) + '].finishTime']: !this.data.taskList[id - 1].finished ? finishTime : ''
    })
    this.updataShowList()
  },
  //点击任务左上角的叉叉，删除任务
  deleteTask(e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要删除这项任务吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log(e)
          let id = e.currentTarget.id
          that.data.taskList.splice(id - 1, 1)
          for (let i = id - 1; i < that.data.taskList.length; i++) {
            console.log(i);
            that.setData({
              ['taskList[' + i + '].id']: i + 1
            })
          }
          that.setData({
            taskList: that.data.taskList
          })
          that.updataShowList()
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //点击右上角的编辑
  editTask(e) {
    console.log(e)
    let idx = e.currentTarget.id - 1;
    console.log(idx)
    this.setData({
      showEdit: true,
      changeTitle:this.data.taskList[idx].title,
      changeRemarks:this.data.taskList[idx].remarks,
      changeIdx:idx
    })
  },
  // 关闭编辑
  // closeEdit() {
  //   this.setData({
  //     showEdit: false
  //   })
  // },
  editConfitm(e){
    let idx=this.data.changeIdx
    
    this.setData({
      ['taskList['+idx+'].title']:this.data.changeTitle,
      ['taskList['+idx+'].remarks']:this.data.changeRemarks
    })
    this.updataShowList()
  },
  //更新showList()
  updataShowList() {
    let index = this.data.index
    let taskList = this.data.taskList
    let showList = []
    let finishedCount = 0
    let unfinishedCount = 0
    if (index == 0) {
      showList = taskList
    } else if (index == 1) {
      taskList.forEach(task => {
        if (!task.finished) {
          showList.push(task)
        }
      })
    } else if (index == 2) {
      taskList.forEach(task => {
        if (task.finished) {
          showList.push(task)
        }
      })
    }
    taskList.forEach(task => {
      if (task.finished) {
        finishedCount++
      } else {
        unfinishedCount++
      }
    })
    console.log(taskList);
    console.log(showList)
    this.setData({
      showList,
      finishedCount,
      unfinishedCount
    })
    wx.setStorageSync('taskList', this.data.taskList) //储存
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var taskList = wx.getStorageSync('taskList')
    if (taskList) {
      this.setData({
        taskList
      })
    }
    this.updataShowList()
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