// pages/home_page/study/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabBar: {
      "color": "#699DFD",
      "selectedColor": "#ff0000",
      "backgroundColor": "linear-gradient(90deg,#4e8efc,#38b9fd)",
      "borderStyle": "#ccc",
      "list": [
        {
          "pagePath": "/pages/home_page/teacher/index/index",
          "text": "主页",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: true
        },
        {
          "pagePath": "/pages/wx_leave/show_leaveMessage/show_leaveMessage",
          "text": "请假",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        },
        {
          "pagePath": "/pages/lecture/teacher/index/index",
          "text": "讲座",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        },
        {
          "pagePath": "/pages/curriculum/teacher/index/index",
          "text": "课程",
          "iconPath": "../../../../imges/tabBar_active.png",
          "selectedIconPath": "../../../../imges/tabBar_url.png",
          "selectedColor": "#699DFD",
          active: false
        }
      ],
      "position": "bottom"
    },
    head_img_src: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=547138142,3998729701&fm=27&gp=0.jpg',
    center_box_left: 0,
    activeColor: '#10B5F4',
    backgroundColor: '#cbcbcb',
    loading_key: false,
    no_key_lecture: true,
    no_key_curriculum: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
    var that = this;
    that.setData({
      loading_key: true
    })

    var cache = wx.getStorageSync('user');
    if (cache.user_portrait == '1') {
      that.setData({
        user_message: cache,
        user_name: cache.teacher_name,
        user_portrait_type: '1',
      })
    } else {
      that.setData({
        user_message: cache,
        user_name: cache.teacher_name,
        user_portrait_type: '2',
        head_img_src: cache.user_portrait
      })
    }

    wx.request({
      url: 'https://www.mixvjiezi.xyz/wx/wx_home_page/teacher_homeMessage_Load.php',
      data: {
        teacher_id: that.data.user_message.teacher_id
      },
      success: function (res) {
        if (res.data.lecture_type == '1') {
          var lecture_data = res.data.lecture_data;
        } else {
          var lecture_data = null;
          var key_lecture = false;
        }

        if (res.data.curriculum_type == '1') {
          var curriculum_data = res.data.curriculum_data;
        } else {
          var curriculum_data = null;
          var key_curriculum = false;
        }

        that.setData({
          listData_lecture: lecture_data,
          listData_curriculum: curriculum_data,
          loading_key: false,
          no_key_lecture: key_lecture,
          no_key_curriculum: key_curriculum
        })
      }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //自定义函数们
  //1.头像更换函数
      //从手机获取请假凭证图片
  chose_imges: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success: function (res) {
        if (res.tapIndex == 0) {
          that.getImges('album');
        } else {
          that.getImges('camera');
        }
      }
    })
  },
  getImges: function (type) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: [type],
      success: function (res) {
        that.setData({
          up_img_url: res.tempFilePaths[0],
        })
        wx.uploadFile({
          url: 'https://www.mixvjiezi.xyz/wx/wx_home_page/user_image_up.php',
          filePath: that.data.up_img_url,
          formData: {
            request_type: '2',
            user_key: that.data.user_message.teacher_phone,
            user_portrait_type: that.data.user_portrait_type
          },
          name: 'user_img',
          success: function (res_1) {
            wx.request({
              url: 'https://www.mixvjiezi.xyz/wx/localhost_chaces.php',
              data:{
                request_type:'2',
                user_key: that.data.user_message.teacher_phone

              },
              success:function(res_2){
                wx.setStorage({
                  key: 'user',
                  data: res_2.data.data
                })
              }
            })
          }
        })
        that.setData({
          head_img_src: res.tempFilePaths[0],
        })
      }
    })
  },
  //2.用户信息更改函数
  change_user: function (e) {
  },
  //3.讲座课程切换函数
      //选择讲座
  chose_lecture: function (e) {
    this.setData({
      center_box_left: 0,
      activeColor: '#10B5F4',
      backgroundColor: '#cbcbcb'
    })
  },
      //选择课程
  chose_curriculum: function (e) {
    this.setData({
      center_box_left: -750,
      activeColor: '#cbcbcb',
      backgroundColor: '#82DBA3'
    })
  },

  //4.讲座详情切换函数
  lecture_message:function(e){
    var lecture_id = e.currentTarget.dataset.message.lecture_id;
    var lecture_type = e.currentTarget.dataset.message.lecture_type;
    wx.navigateTo({
      url: "../../../lecture/teacher/lecture_request/lecture_request?lecture_id=" + lecture_id + '&lecture_type=' + lecture_type
    })
  },
  //5.课程详情切换函数
  check_message:function(e){
    var id = e.currentTarget.dataset.message.id;

    wx.navigateTo({
      url: "../../../curriculum/teacher/check_message/check_message?id=" + id
    })
  }
})