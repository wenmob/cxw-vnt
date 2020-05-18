/* eslint-disable no-console */
import { browser } from "./index";

// import Cookies from "js-cookie";
// const NativeKey = "xlg-native-object";

export function sendMessage(action, data = {}, callback = () => {}) {
  console.log(`sendMessage:${action},data:`, data);
  // console.log("是否<3.2.0", versionCompare(appVersion, "3.2.0"));
  if (typeof data === "function") {
    callback = data;
  }

  // if (callback) {
  window[`fn_${action}`] = callback;
  // }
  if (browser.ios) {
    if (!window.webkit) {
      return console.log("当前浏览器不是内嵌浏览器[IOS]");
    }
    if (!window.webkit.messageHandlers[action]) {
      return console.log("当前API无效[IOS]");
    }
    return window.webkit.messageHandlers[action].postMessage(data);
  }
  if (browser.android) {
    if (!window.messageHandlers) {
      return console.log("当前浏览器不是内嵌浏览器[Android]");
    }
    if (!window.messageHandlers[action]) {
      return console.log("当前API无效[Android]");
    }
    return window.messageHandlers[action](JSON.stringify(data));
  }
}

export function getNativeObject() {
  const ua = window.navigator.userAgent;
  let [, jsonStr] = ua.split("&&");
  // console.log(jsonStr, "jsonStr");
  jsonStr = jsonStr && JSON.parse(jsonStr);
  return jsonStr || {};
}

const { appVersion, net, env, token } = getNativeObject();
// console.log(getNativeObject(), "getNativeObject");
export const native = {
  browser,
  appVersion,
  net,
  env,
  token,

  // 新增跳转
  // 跳银行卡 goBank
  goBank() {
    sendMessage("goBank");
  },
  // 跳认证 goAuth
  goAuth() {
    sendMessage("goAuth");
  },
  // 跳应用宝地址 goAppStore
  goAppStore() {
    sendMessage("goAppStore");
  },
  // 跳web goWeb -- 原 open web
  // options:{
  //     url:String,
  //     title:String,
  //     navigationBar:Boolen
  // }
  goWeb(options) {
    // console.log(options);
    sendMessage("goWeb", options);
  },
  // 跳登录 goLogin -- 原 open app login
  goLogin() {
    sendMessage("goLogin");
  },
  // 跳首页 goHome -- 原 open app home && partnerBackHome
  goHome() {
    sendMessage("goHome");
  },
  // 跳签约 goSign -- 原 sign
  goSign() {
    sendMessage("goSign");
  },
  // 跳转优惠券 goCoupon -- 原 open app coupon
  goCoupon() {
    sendMessage("goCoupon");
  },

  // 新增操作
  // 刷新当前页面 doRefresh -- 原 refresh
  doRefresh() {
    sendMessage("doRefresh");
  },
  // 关闭当前页面 doClose -- 原 close
  doClose() {
    sendMessage("doClose");
  },
  // 打开外部浏览器 goExternalBrowser { url:String}
  goExternalBrowser(url) {
    sendMessage("goExternalBrowser", {
      url,
    });
  },
  // 复制文本 copyText {text:String} callback  -- 原 copyLink
  copyText(text) {
    sendMessage("copyText", {
      text,
    });
  },

  //showNavShare  、hideNavShare   、showNavMore  items   、hideNavMore , setShare

  // 注入右上角分享内容 setShare {title,desc,image} callback
  setShare({ title, desc, imgUrl, link }, cb = () => {}) {
    sendMessage(
      "setShare",
      {
        title,
        desc,
        imgUrl,
        link,
      },
      cb
    );
  },

  showNavShare({ title, desc, imgUrl, link }, cb = () => {}) {
    sendMessage(
      "showNavShare",
      {
        title,
        desc,
        imgUrl,
        link,
      },
      cb
    );
  },

  hideNavShare() {
    sendMessage("hideNavShare");
  },
  //隐藏头部
  hideNav() {
    sendMessage("hideNav");
  },
  showNav() {
    sendMessage("showNav");
  },
  showNavMore(items = [], cb = () => {}) {
    sendMessage(
      "showNavMore",
      {
        // icon:"",
        // text:""
        items: items,
      },
      cb
    );
  },

  hideNavMore() {
    sendMessage("hideNavMore");
  },
  //头部隐藏
  hideHead() {
    sendMessage("hideNav");
  },
  // 安卓系统不兼容的上传图片问题
  uploaderPic(cb = () => {}) {
    if (browser.native) {
      sendMessage("getPictures", "", cb);
    }
  },
  // /**
  //  * 设置右上角菜单
  //  *
  //  * {items:[{title:"分享",icon:"http://.jpg"}]}
  //  * @param {*} items
  //  * @param {*} cb
  //  */
  // setNavMore(items = [], cb = () => {}) {
  //   sendMessage("setNavMore", { items: items }, cb);
  // },

  // 长期保留
  // 点击返回 tapBack
  tapBack(cb = () => {}) {
    sendMessage("tapBack", {}, cb);
  },
  // 保存图片 saveImg { shareImg }
  saveImg(shareImg, cb = () => {}) {
    sendMessage(
      "saveImg",
      {
        shareImg,
      },
      cb
    );
  },

  // 集团预订成功 groupReservationSuccess
  groupReservationSuccess(cb = () => {}) {
    sendMessage("groupReservationSuccess", {}, cb);
  },

  // 闲时共享 startC2C
  startC2C(cb = () => {}) {
    sendMessage("startC2C", {}, cb);
  },
  // 在线咨询 onlineConsultation
  onlineConsultation(cb = () => {}) {
    sendMessage("onlineConsultation", {}, cb);
  },
  // 预约咨询 appointmentConsultation
  appointmentConsultation(options = {}, cb = () => {}) {
    sendMessage("appointmentConsultation", options, cb);
  },
  // 提交预订单 stagOrdersBookSubmit
  stagOrdersBookSubmit(options = {}, cb = () => {}) {
    sendMessage("stagOrdersBookSubmit", options, cb);
  },
  // 我要预定 inspect
  inspect(options = {}, cb = () => {}) {
    sendMessage("inspect", options, cb);
  },
  // 提交订单 submitOrders
  submitOrders(options = {}, cb = () => {}) {
    sendMessage("submitOrders", options, cb);
  },
  // 车辆参数 argumentMore
  argumentMore(options = {}, cb = () => {}) {
    sendMessage("argumentMore", options, cb);
  },
  // 分享微信 shareWechat
  shareWechat(options = {}, cb = () => {}) {
    sendMessage("shareWechat", options, cb);
  },
  // 分享朋友圈 shareCricle shareCircle
  shareCircle(options = {}, cb = () => {}) {
    sendMessage("shareCricle", options, cb);
  },
  // 车型二维码分享 goModelCode
  goModelCode(options = {}, cb = () => {}) {
    sendMessage("goModelCode", options, cb);
  },
  // 车型详情 goCardetails
  goCardetails(options = {}, cb = () => {}) {
    sendMessage("goCardetails", options, cb);
  },
  // 门店二维码分享 goStoreCode
  goStoreCode(options = {}, cb = () => {}) {
    sendMessage("goStoreCode", options, cb);
  },
  // // 合伙人-返回首页 partnerBackHome
  // partnerBackHome(options = {}, cb = () => {}) {
  //   sendMessage("partnerBackHome", options, cb);
  // },
  // 合伙人-分享好友【原生UI】 shareInvitationFriend
  shareInvitationFriend(options = {}, cb = () => {}) {
    sendMessage("shareInvitationFriend", options, cb);
  },
  // 合伙人-分享邀请卡【原生UI】 shareInvitationCard
  shareInvitationCard(options = {}, cb = () => {}) {
    sendMessage("shareInvitationCard", options, cb);
  },
  // 合伙人-分享好友【H5UI】 shareAppMessage
  shareAppMessage(options = {}, cb = () => {}) {
    sendMessage("shareAppMessage", options, cb);
  },
  // 合伙人-分享朋友圈【H5UI】 shareTimeline
  shareTimeline(options = {}, cb = () => {}) {
    // console.log(options);
    sendMessage("shareTimeline", options, cb);
  },
  // 合伙人-分享邀请卡绑定微信 shareCardToWechat
  shareCardToWechat(options = {}, cb = () => {}) {
    sendMessage("shareCardToWechat", options, cb);
  },

  // 合伙人-分享邀请卡绑定微信 shareCardToWechat
  // 参数 { imgUrl }
  shareImageToWechat(options = {}, cb = () => {}) {
    sendMessage("shareImageToWechat", options, cb);
  },
  // 参数 { imgUrl }
  shareImageToCricle(options = {}, cb = () => {}) {
    sendMessage("shareImageToCricle", options, cb);
  },

  setTitle(options) {
    sendMessage("setTitle", options);
  },
  scanQRCode(cb = () => {}) {
    sendMessage(
      "scanQRCode",
      {
        needResult: 1,
        scanType: ["qrCode", "barCode"],
      },
      cb
    );
  },
  openCamera(cb = () => {}) {
    sendMessage(
      "openCamera",
      {
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 指定是原图还是压缩图，默认都有
        scanType: ["album", "camera"],
      },
      cb
    );
  },
};

/**
 * 混合兼容 微信/原生
 */

/**
 * 扫码
 * @param {*} cb
 */
export function scanQRCode(cb) {
  if (browser.wechat) {
    wx.scanQRCode({
      needResult: 1,
      scanType: ["qrCode", "barCode"],
      success: success,
    });
  } else if (browser.native) {
    native.scanQRCode(success);
  }

  function success(res) {
    console.log(("扫码结果", res));
    cb && cb(res);
  }
}
/**
 * 使用摄像头或图片
 * @param {*} cb
 */
export function openCamera(cb) {
  if (browser.wechat) {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ["original", "compressed"], // 指定是原图还是压缩图，默认都有
      sourceType: ["album", "camera"], // 指定来源是相册还是相机，默认都有
      success: function(res) {
        let localId = res.localIds[0];
        wx.getLocalImgData({
          localId: localId, // 图片的localID
          success: function(res) {
            var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
            if (localData.indexOf("data:image") != 0) {
              //判断是否有这样的头部
              localData = "data:image/jpeg;base64," + localData;
            }
            localData = localData
              .replace(/\r|\n/g, "")
              .replace("data:image/jgp", "data:image/jpeg"); // 此处的localData 就是你所需要的base64位
            success(localData);
          },
        });
      },
    });
  } else if (browser.native) {
    native.openCamera(success);
  }
  function success(res) {
    // console.log(("拍照成功", res));
    cb && cb(res);
  }
}

/**
 * 将以base64的图片url数据转换为Blob
 * @param urlData
 *            用url方式表示的base64图片数据
 */
function convertBase64UrlToBlob(urlData) {
  var bytes = window.atob(urlData.split(",")[1]); //去掉url的头，并转换为byte

  //处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }

  return new Blob([ab], { type: "image/png" });
}

/**
 *
 * @param {*} base64Codes
 */

function sumitImageFile(base64Codes) {
  var form = document.forms[0];

  var formData = new FormData(form); //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数

  //convertBase64UrlToBlob函数是将base64编码转换为Blob
  formData.append("imageName", convertBase64UrlToBlob(base64Codes)); //append函数的第一个参数是后台获取数据的参数名,和html标签的input的name属性功能相同

  //ajax 提交form
  $.ajax({
    url: form.action,
    type: "POST",
    data: formData,
    dataType: "text",
    processData: false, // 告诉jQuery不要去处理发送的数据
    contentType: false, // 告诉jQuery不要去设置Content-Type请求头

    success: function(data) {
      window.location.href = "${ctx}" + data;
    },
    xhr: function() {
      //在jquery函数中直接使用ajax的XMLHttpRequest对象
      var xhr = new XMLHttpRequest();

      xhr.upload.addEventListener(
        "progress",
        function(evt) {
          if (evt.lengthComputable) {
            var percentComplete = Math.round((evt.loaded * 100) / evt.total);
            console.log("正在提交." + percentComplete.toString() + "%"); //在控制台打印上传进度
          }
        },
        false
      );

      return xhr;
    },
  });
}
