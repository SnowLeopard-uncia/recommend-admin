$(function () {
  //在页面加载完，自动执行定义js代码（function）
  // 获取url
  // console.log(window.location.href);

  //获取url中的参数
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
  }

  // 接收URL中的参数msg
  var msg = getUrlParam('msg');
  console.log('msg:' + msg);
});

/**
 * 登录
 */
function login() {
  const username = $("#floatingUsername").val();
  const password = $("#floatingPassword").val();

  if (username === "") {
    alert("用户名不能为空！");
  } else if (password === "") {
    alert("密码不能为空！");
  } else if (username !== "" && password !== "") {
    const params = {
      usersName: username,
      usersPassword: password
    }
    $.ajax({
      type: 'post',
      url: 'http://localhost:8080/api/v1/uesr/login',   //TAG
      // 登录接口
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(params),
      async: true,
      success: function (res) {
        // console.log(res);
        if (res.resultCode === 200) {
          console.log('登录成功！');
          Toast('登录成功！');
            // 返回当前页面的 URL
            window.location.href = `./admin.html?usersId=${res.data.usersId}&usersName=${res.data.usersName}`;
          // window.location.href = './index.html?msg="login success"'; 
        } else {
          console.log(`登录失败！${res.message}！`);
          Toast('登录失败！用户名或密码错误！')
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus);
      }
    });
  }
}

/**
 * 封装Toast提示
 * @param {提示信息} msg 
 * @param {延迟时间} duration 
 */
function Toast(msg, duration) {
  duration = isNaN(duration) ? 3000 : duration;
  var m = document.createElement('div');
  m.innerHTML = msg;
  m.style.cssText = "font-family:siyuan;max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
  document.body.appendChild(m);
  setTimeout(function () {
    var d = 0.5;
    m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
    m.style.opacity = '0';
    setTimeout(function () {
      document.body.removeChild(m)
    }, d * 1000);
  }, duration);
}