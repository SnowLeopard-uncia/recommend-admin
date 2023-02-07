$(document).ready(function () {
  // 获取url
  // console.log(window.location.href);

  // 接收URL中的参数msg
  // const msg = getUrlParam('msg');
  // console.log('msg:' + msg);

  // 接收URL中的参数usersId
  const usersId = getUrlParam('usersId');
  console.log('usersId:' + usersId);

  // 接收URL中的参数usersName
  const usersName = getUrlParam('usersName');
  console.log('usersName:' + usersName);

  if (usersId !== null) {
    // Toast('登录成功！');
    let username = '';
    username += `
        <svg t="1639818963632" class="icon" height="16" width="16" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="719" width="200" height="200"><path d="M800 384c0-160-128-288-288-288s-288 128-288 288c0 108.8 57.6 201.6 147.2 249.6-121.6 48-214.4 153.6-240 288-3.2 16 6.4 35.2 25.6 38.4h6.4c16 0 28.8-9.6 32-25.6 28.8-150.4 160-259.2 313.6-262.4h6.4c156.8 0 284.8-128 284.8-288zM288 384c0-124.8 99.2-224 224-224s224 99.2 224 224c0 121.6-99.2 220.8-220.8 224H505.6C384 604.8 288 505.6 288 384zM723.2 675.2c-16-9.6-35.2-6.4-44.8 9.6-9.6 16-6.4 35.2 9.6 44.8 73.6 51.2 124.8 121.6 140.8 204.8 3.2 16 16 25.6 32 25.6h6.4c16-3.2 28.8-19.2 25.6-38.4-19.2-99.2-80-185.6-169.6-246.4z" fill="#ffffff" p-id="720"></path></svg>
        <small class="text-white">${usersName}</small>
        <a style="color: white; margin-left: 1rem;" href="signin.html"><small>退出</small></a>
      `;
    $('.nav-username').html(username);
  }

  gotoAudit();
});

/**
 * 
 * @param {参数名} name 
 * @returns 
 */
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]); return null; //返回参数值
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

/**
 * 导航栏 - 审核
 */
function gotoAudit() {
  const usersId = getUrlParam('usersId');

  if (usersId !== null) {
    //类 添加属性
    $('.audit').addClass('active');
    $('.articles').removeClass('active');

    if ($(".audit").hasClass('active')) {
      $('.audit-block').attr('style', 'display: block;');

      gotoAllArticles();

      $('.articles-block').attr('style', 'display: none;');
      // $('.categories-block').attr('style', 'display: none;');
      // $('.feedback-block').attr('style', 'display: none;');
    }
  } else {
    $('.audit').addClass('active');
    $('.articles').removeClass('active');

    if ($(".audit").hasClass('active')) {
      $('.audit-block').attr('style', 'display: block;');

      let items = '';
      items += `<div style="text-align: center; margin-top: 3rem;">请先登录！</div>`;
      $(".audit-block").html(items);
      $('.articles-block').attr('style', 'display: none;');

    }
  }
}

/**
 * 子导航栏 - 所有文章
 */
function gotoAllArticles() {
  const usersId = getUrlParam('usersId');

  if (usersId !== null) {
    $('.audit').addClass('active');
    $('.articles').removeClass('active');

    //侧边导航栏
    $('.all').addClass('active');
    $('.wait').removeClass('active');
    $('.audited').removeClass('active');
    $('.nopass').removeClass('active');

    if ($('.audit').hasClass('active')) {
      $('.audit-block').attr('style', 'display: block;');

      getAllWorks(1);

      $('.articles-block').attr('style', 'display: none;');


      if ($('.all').hasClass('active')) {
        $('.all-works').attr('style', 'display: block;');
        $('.wait-audit').attr('style', 'display: none;');
        $('.audited-block').attr('style', 'display: none;');
        $('.no-pass').attr('style', 'display: none;');
      }
    }
  } else {
    $('.audit').addClass('active');
    $('.articles').removeClass('active');

    if ($(".audit").hasClass('active')) {
      $('.audit-block').attr('style', 'display: block;');

      let items = '';
      items += `<div style="text-align: center; margin-top: 3rem;">请先登录！</div>`;
      $(".audit-block").html(items);

      $('.articles-block').attr('style', 'display: none;');
      // $('.categories-block').attr('style', 'display: none;');
      // $('.feedback-block').attr('style', 'display: none;');
    }
  }
}

/**
 * 子导航栏 - 待审核
 */
function gotoWaitAudit() {
  const usersId = getUrlParam('usersId');

  if (usersId !== null) {
    $('.audit').addClass('active');
    $('.articles').removeClass('active');

    $('.all').removeClass('active');
    $('.wait').addClass('active');
    $('.audited').removeClass('active');
    $('.nopass').removeClass('active');

    if ($('.audit').hasClass('active')) {
      $('.audit-block').attr('style', 'display: block;');

      getWaitAuditWorks(1);

      $('.articles-block').attr('style', 'display: none;');


      if ($('.wait').hasClass('active')) {
        $('.all-works').attr('style', 'display: none;');
        $('.wait-audit').attr('style', 'display: block;');
        $('.audited-block').attr('style', 'display: none;');
        $('.no-pass').attr('style', 'display: none;');
      }
    }
  } else {
    $('.audit').addClass('active');
    $('.articles').removeClass('active');


    if ($(".audit").hasClass('active')) {
      $('.audit-block').attr('style', 'display: block;');

      let items = '';
      items += `<div style="text-align: center; margin-top: 3rem;">请先登录！</div>`;
      $(".audit-block").html(items);

      $('.articles-block').attr('style', 'display: none;');

    }
  }
}

/**
 * 子导航栏 - 已通过
 */
function gotoAudited() {
  const usersId = getUrlParam('usersId');

  if (usersId !== null) {
    $('.audit').addClass('active');
    $('.articles').removeClass('active');

    $('.all').removeClass('active');
    $('.wait').removeClass('active');
    $('.audited').addClass('active');
    $('.nopass').removeClass('active');

    if ($('.audit').hasClass('active')) {
      $('.audit-block').attr('style', 'display: block;');

      getAuditedWorks(1);

      $('.articles-block').attr('style', 'display: none;');


      if ($('.audited').hasClass('active')) {
        $('.all-works').attr('style', 'display: none;');
        $('.wait-audit').attr('style', 'display: none;');
        $('.audited-block').attr('style', 'display: block;');
        $('.no-pass').attr('style', 'display: none;');
      }
    }
  } else {
    $('.audit').addClass('active');
    $('.articles').removeClass('active');


    if ($(".audit").hasClass('active')) {
      $('.audit-block').attr('style', 'display: block;');

      let items = '';
      items += `<div style="text-align: center; margin-top: 3rem;">请先登录！</div>`;
      $(".audit-block").html(items);
      $('.articles-block').attr('style', 'display: none;');

    }
  }
}

/**
 * 子导航栏 - 未通过
 */
function gotoNoPass() {
  const usersId = getUrlParam('usersId');

  if (usersId !== null) {
    $('.audit').addClass('active');
    $('.articles').removeClass('active');

    $('.all').removeClass('active');
    $('.wait').removeClass('active');
    $('.audited').removeClass('active');
    $('.nopass').addClass('active');

    if ($('.audit').hasClass('active')) {
      $('.audit-block').attr('style', 'display: block;');

      getFailedWorks(1);

      $('.articles-block').attr('style', 'display: none;');


      if ($('.nopass').hasClass('active')) {
        $('.all-works').attr('style', 'display: none;');
        $('.wait-audit').attr('style', 'display: none;');
        $('.audited-block').attr('style', 'display: none;');
        $('.no-pass').attr('style', 'display: block;');
      }
    }
  } else {
    $('.audit').addClass('active');
    $('.articles').removeClass('active');

    if ($(".audit").hasClass('active')) {
      $('.audit-block').attr('style', 'display: block;');

      let items = '';
      items += `<div style="text-align: center; margin-top: 3rem;">请先登录！</div>`;
      $(".audit-block").html(items);

      $('.articles-block').attr('style', 'display: none;');

    }
  }
}



/**
 * 导航栏 - 文章管理
 */
function gotoArticles() {
  // const usersId = getUrlParam('usersId');
  const usersId = 'a';  //TAG

  if (usersId !== null) {
    $('.audit').removeClass('active');
    $('.articles').addClass('active');

    if ($(".articles").hasClass('active')) {
      $('.articles-block').attr('style', 'display: block;');

      showArticles();

      $('.audit-block').attr('style', 'display: none;');

    }
  } else {
    $('.audit').removeClass('active');
    $('.articles').addClass('active');


    if ($(".articles").hasClass('active')) {
      $('.articles-block').attr('style', 'display: block;');

      let items = '';
      items += `<div style="text-align: center; margin-top: 3rem;">请先登录！</div>`;
      $(".articles-block").html(items);
      $('.audit-block').attr('style', 'display: none;');

    }
  }
}

/**
 * 子导航栏 - 一级分类
 */
function showArticles() {
  const usersId = getUrlParam('usersId');

  if (usersId !== null) {
    $('.audit').removeClass('active');

    $('.articles').addClass('active');


    // $('.cate1').addClass('active');
    // $('.cate2').removeClass('active');

    if ($('.categories').hasClass('active')) {
      $('.categories-block').attr('style', 'display: block;');

      getArticles(1);

      $('.audit-block').attr('style', 'display: none;');

      // if ($('.cate1').hasClass('active')) {
      //   $('.cate1-block').attr('style', 'display: block;');
      //   $('.cate2-block').attr('style', 'display: none;');
      // }
    }
  } else {
    $('.audit').removeClass('active');

    $('.articles').addClass('active');


    if ($(".articles").hasClass('active')) {
      $('.articles-block').attr('style', 'display: block;');

      let items = '';
      items += `<div style="text-align: center; margin-top: 3rem;">请先登录！</div>`;
      $(".articles-block").html(items);

      $('.audit-block').attr('style', 'display: none;');

    }
  }
}


/**
 * 获取所有文章
 * @param {页码} n 
 */
function getAllWorks(n) {
  const pageNum = n !== null ? n : 1;
  const pageSize = 6;

  $.ajax({
    type: 'get',
    url: "http://localhost:8080/getworks",  //TAG
    data: {
      pageNum: pageNum,
      pageSize: pageSize
    },
    async: true,
    success: function (res) {
      // console.log(res);
      const Datas = res.data;
      // console.log(Datas);
      const totalPage = Datas.totalPage;
      const currPage = Datas.currPage;
      const list = Datas.list;

      var items = '';
      if (list.length === 0) {
        let items = '';
        items += `<div style="text-align: center;">暂无文章</div>`;
        $(".all-articles-list").html(items);
      } else {
        for (let i = 0; i < list.length; i++) {
          items += `
          <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
          <div class="d-flex gap-2 w-100 justify-content-between">
            <div>
              <h6 class="mb-0">${list[i].articles.title}</h6>
              <small class="opacity-50 text-nowrap">${list[i].articles.author}</small>
            </div>

          </div>
          <div class="auditType${i}" style="width: 10%;"> </div>
          <script>
          if (${list[i].works.isAudit} === 0) {
            $('.auditType${i}').html('<div class="wait-for-audit">待审核</div>');
          } else if (${list[i].works.isAudit} === 1) {
            $('.auditType${i}').html('<div class="Audited">已通过</div>');
          } else if (${list[i].works.isAudit} === 2) {
            $('.auditType${i}').html('<div class="not-audit">未通过</div>');
          }
        </script>   
        </a>
        `;
        }
        $(".all-articles-list").html(items);
      }

      let pagelist = '';
      for (let j = 1; j <= totalPage; j++) {
        if (j === currPage) {
          pagelist += `
          <li class="page-item active" aria-current="page"><a class="page-link" href="#" onclick="getAllWorks(${j})">${j}</a></li>
          `;
        } else {
          pagelist += `
          <li class="page-item"><a class="page-link" href="#" onclick="getAllWorks(${j})">${j}</a></li>
          `;
        }
      }
      $('.page-list').html(pagelist);
    }
  });
}

/**
 * 获取所有待审核文章
 * @param {页码} n 
 */
function getWaitAuditWorks(n) {
  const usersId = getUrlParam('usersId');
  const usersName = getUrlParam('usersName');

  const pageNum = n !== null ? n : 1;
  const pageSize = 6;

  $.ajax({
    type: 'get',
    url: "http://localhost:8080/gettoauditworks", //TAG
    data: {
      pageNum: pageNum,
      pageSize: pageSize
    },
    async: true,
    success: function (res) {
      // console.log(res);
      const Datas = res.data;
      // console.log(Datas);
      const totalPage = Datas.totalPage;
      const currPage = Datas.currPage;
      const list = Datas.list;

      var items = '';
      if (Datas.length === 0) {
        let items = '';
        items += `<div style="text-align: center;">待审核文章为空！</div>`;
        $(".wait-articles-list").html(items);
      } else {
        for (let i = 0; i < list.length; i++) {
          items += `
          <div class="list-group item">
          <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
            <div class="d-flex gap-2 w-100 justify-content-between"
              onclick="window.location='detail.html?worksId=${list[i].articles.articleId}&usersId=${usersId}&usersName=${usersName}'">
              <div>
                <h6 class="mb-0">${list[i].articles.title}</h6>
                <small class="opacity-50 text-nowrap">${list[i].articles.author}</small>
              </div>
            </div>
            <div class="check-box">
              <input type="checkbox" class="form-check-input" id="same-address" value="${list[i].articles.articleId}">
            </div>
          </a>
        </div>
        `;
        }
        $(".wait-articles-list").html(items);
      }

      let pagelist = '';
      for (let j = 1; j <= totalPage; j++) {
        if (j === currPage) {
          pagelist += `
          <li class="page-item active" aria-current="page"><a class="page-link" href="#" onclick="getAllWorks(${j})">${j}</a></li>
          `;
        } else {
          pagelist += `
          <li class="page-item"><a class="page-link" href="#" onclick="getAllWorks(${j})">${j}</a></li>
          `;
        }
      }
      $('.page-list').html(pagelist);
    }
  });
}

/**
 * 批量文章通过审核
 */
function passArticlesBatch() {
  let checked = [];
  //$('input:checkbox:checked') 等同于 $('input[type=checkbox]:checked')
  //意思是选择被选中的checkbox
  $.each($('input:checkbox:checked'), function () {
    checked.push(parseInt($(this).val()));
  });
  // console.log('checkedList', checked);
  if (checked.length === 0) {
    alert("请选择审批的文章！");
  } else {
    const params = checked;
    $.ajax({
      type: 'put',
      url: 'http://localhost:8080/passArticlesBatch',  //TAG
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(params),
      async: true,
      success: function (res) {
        // console.log(res);
        if (res.resultCode === 200) {
          // console.log('批量审核文章通过成功！');
          Toast('批量审核文章通过成功！');
          getWaitAuditWorks(1);
        } else {
          // console.log('批量审核文章通过失败！');
          Toast(`批量审核文章通过失败！${res.message}！`);
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus);
      }
    });
  }
}

/**
 * 批量文章不予通过审核
 */
function failWorksBatch() {
  let checked = [];

  //$('input:checkbox:checked') 等同于 $('input[type=checkbox]:checked')
  //意思是选择被选中的checkbox
  $.each($('input:checkbox:checked'), function () {
    checked.push(parseInt($(this).val()));
  });
  // console.log('checkedList', checked);
  if (checked.length === 0) {
    alert("请选择审批的文章！");
  } else {
    const params = checked;
    $.ajax({
      type: 'put',
      url: 'http://localhost:8080/failWorksBatch', //TAG
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(params),
      async: true,
      success: function (res) {
        // console.log(res);
        if (res.resultCode === 200) {
          console.log('批量审核文章不予通过成功！');
          Toast('批量审核文章不予通过成功！');
          getWaitAuditWorks(1);
        } else {
          // console.log('批量审核文章不予通过失败！');
          Toast(`批量审核文章不予通过失败！${res.message}！`);
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus);
      }
    });
  }
}

/**
 * 获取所有已通过审核文章
 * @param {页码} n 
 */
function getAuditedWorks(n) {
  const pageNum = n !== null ? n : 1;
  const pageSize = 6;

  $.ajax({
    type: 'get',
    url: "http://localhost:8080/getpassedworks", //TAG
    data: {
      pageNum: pageNum,
      pageSize: pageSize
    },
    async: true,
    success: function (res) {
      // console.log(res);
      const Datas = res.data;
      // console.log(Datas);
      const totalPage = Datas.totalPage;
      const currPage = Datas.currPage;
      const list = Datas.list;

      var items = '';
      if (list.length === 0) {
        let items = '';
        items += `<div style="text-align: center;">已通过审核的文章为空！</div>`;
        $(".audited-works-list").html(items);
      } else {
        for (let i = 0; i < list.length; i++) {
          items += `
          <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
            <div class="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 class="mb-0">${list[i].article.title}</h6>
                <small class="opacity-50 text-nowrap">${list[i].article.author}</small>
              </div>
            </div>
          </a>
        </div>
        `;
        }
        $(".audited-works-list").html(items);
      }

      let pagelist = '';
      for (let j = 1; j <= totalPage; j++) {
        if (j === currPage) {
          pagelist += `
          <li class="page-item active" aria-current="page"><a class="page-link" href="#" onclick="getAllWorks(${j})">${j}</a></li>
          `;
        } else {
          pagelist += `
          <li class="page-item"><a class="page-link" href="#" onclick="getAllWorks(${j})">${j}</a></li>
          `;
        }
      }
      $('.page-list').html(pagelist);
    }
  });
}

/**
 * 获取所有未通过审核文章
 * @param {页码} n 
 */
function getFailedWorks(n) {
  const pageNum = n !== null ? n : 1;
  const pageSize = 6;

  $.ajax({
    type: 'get',
    url: "http://localhost:8080/getnopassedworks", //TAG
    data: {
      pageNum: pageNum,
      pageSize: pageSize
    },
    async: true,
    success: function (res) {
      // console.log(res);
      const Datas = res.data;
      // console.log(Datas);
      const totalPage = Datas.totalPage;
      const currPage = Datas.currPage;
      const list = Datas.list;

      var items = '';
      if (list.length === 0) {
        let items = '';
        items += `<div style="text-align: center;">未通过审核的文章为空！</div>`;
        $(".failed-works-list").html(items);
      } else {
        for (let i = 0; i < list.length; i++) {
          items += `
          <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
            <div class="d-flex gap-2 w-100 justify-content-between">
              <div>
                <h6 class="mb-0">${list[i].article.title}</h6>
                <small class="opacity-50 text-nowrap">${list[i].article.author}</small>
              </div>
            </div>
          </a>
        </div>
        `;
        }
        $(".failed-works-list").html(items);
      }

      let pagelist = '';
      for (let j = 1; j <= totalPage; j++) {
        if (j === currPage) {
          pagelist += `
          <li class="page-item active" aria-current="page"><a class="page-link" href="#" onclick="getAllWorks(${j})">${j}</a></li>
          `;
        } else {
          pagelist += `
          <li class="page-item"><a class="page-link" href="#" onclick="getAllWorks(${j})">${j}</a></li>
          `;
        }
      }
      $('.page-list').html(pagelist);
    }
  });
}


/**
 * 获取所有文章
 * @param {页码} n 
 */
function getArticles(n) {
  const pageNum = n !== null ? n : 1;
  const pageSize = 10;

  $.ajax({
    type: 'get',
    url: "http://localhost:8080/manage-api/v1/getPrimaryCategoriesList", //TAG
    data: {
      pageNum: pageNum,
      pageSize: pageSize
    },
    async: true,
    success: function (res) {
      console.log(res);
      const Datas = res.data;
      // console.log(Datas);
      const totalPage = Datas.totalPage;
      const currPage = Datas.currPage;
      const list = Datas.list;

      var items = '';
      if (list.length === 0) {
        let items = '';
        items += `<div style="text-align: center;">暂无文章</div>`;
        $(".articles-block").html(items);
      } else {
        for (let i = 0; i < list.length; i++) {
          items += `
          <a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
          <div class="d-flex gap-2 justify-content-between">
              <div>
                  <h6 class="mb-0">${list[i].articles.title}</h6>
                  <small class="opacity-50 text-nowrap">${list[i].articles.author}</small>
              </div>
          </div>

          <div style="margin: auto;">

          </div>

          <div class="article-btn-group">
              <!-- 对应删除哪个条目 -->
              <button type="button" class="btn btn-warning" data-bs-target="#update2" aria-current="true"
                  data-bs-whatever="@mdo" onclick="showUpdateArticleModal(${list[i].articles.articleId})" 
                  style="margin-right: 1rem;"
                  >修改</button>
              <input class="btn  input-text btn-danger" type="submit" value="删除"
                  onclick="deleteCate(${list[i].articles.articleId})">
          </div>
      </a>

        `;
        }
        $(".article-group").html(items);  //对应的模块加进去
      }

      let pagelist = '';
      for (let j = 1; j <= totalPage; j++) {
        if (j === currPage) {
          pagelist += `
          <li class="page-item active" aria-current="page"><a class="page-link" href="#" onclick="getArticles(${j})">${j}</a></li>
          `;
        } else {
          pagelist += `
          <li class="page-item"><a class="page-link" href="#" onclick="getArticles(${j})">${j}</a></li>
          `;
        }
      }
      $('.page-list').html(pagelist);
    }
  });
}

/**
 * 显示文章修改弹窗
 * @param {分类id} id 
 */
function showUpdateArticleModal(id) {
  const articleId = id;
  $('.updateModal').modal('show');
  $('.updateBtn').attr('value', articleId);
}

/**
 * 隐藏文章修改弹窗
 */
function hideUpdateModal() {
  $('.updateModal').modal('hide');
}


/**
 * 增加一级分类
 */
function addArticle() {
  const title = $("#addTitleInput").val();
  const author = $("#addAuthorInput").val();
  const abstract  = $("#addAbstractInput").val();
  const keyword = $("#addKeywordInput").val();
  const link = $("#addLinkInput").val();
  // console.log(title)

  if (title === "") {
    alert("标题不能为空！");
  } else if (author === ""){
    alert("作者不能为空！");
  }else if (abstract ===""){
    alert("摘要不能为空")
  } else if(keyword===""){
    alert("关键词不能为空")
  }else if(link === ""){
    alert("链接不能为空")
  }
   else {
    const params = {
      title: title,
      author: author,
      summary: abstract,
      keyword: keyword,
      link: link
    }
    $.ajax({

      type: 'post',
      url: 'http://localhost:8080/manage-api/v1/createCategory',  //TAG
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(params),
      async: true,
      success: function (res) {
        // console.log(res);
        if (res.resultCode === 200) {
          Toast('添加文章成功！');
          $("#addArticleInput").val("");
          $("#addAuthorInput").val("");
          $("#addAbstractInput").val("");
          $("#addKeywordInput").val("");
          $("#addLinkInput").val("");
          $('.addModal').modal('hide');
          showArticles();
          // window.location.reload();
        } else {
          // console.log('添加失败！');
          Toast(`添加文章失败！${res.message}！`);
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus);
      }
    });
  }
}

/**
 * 修改文章
 */
function updateArticle() {
  const articleId = $('.updateBtn').val();
  const title = $("#updateTitleInput").val();
  const author = $("#updateAuthorInput").val();
  const abstract  = $("#updateAbstractInput").val();
  const keyword = $("#updateKeywordInput").val();
  const link = $("#updateLinkInput").val();
  // console.log(title)

  if (title === "") {
    alert("标题不能为空！");
  } else if (author === ""){
    alert("作者不能为空！");
  }else if (abstract ===""){
    alert("摘要不能为空")
  } else if(keyword===""){
    alert("关键词不能为空")
  }else if(link === ""){
    alert("链接不能为空")
  }
 else {
  const params = {
    title: title,
    author: author,
    summary: abstract,
    keyword: keyword,
    link: link
  }
    $.ajax({
      type: 'put',
      url: 'http://localhost:8080/manage-api/v1/changeCategory', //TAG
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(params),
      async: true,
      success: function (res) {
        // console.log(res);
        if (res.resultCode === 200) {
      
          Toast('修改成功！');
          $("#updateTitleInput").val("");
          $("#updateAuthorInput").val("");
          $("#updateAbstractInput").val("");
          $("#updateKeywordInput").val("");
          $("#updateLinkInput").val("");
          $('.updateModal').modal('hide');
          showArticles();
          // window.location.reload();
        } else {
      
          Toast(`修改失败！${res.message}！`);
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus);
      }
    });
  }
}

/**
 * 删除文章
 * @param {文章id} id
 */
function deleteArticle(id) {
  const params = {
    articleId: id
  }; 

  if (confirm("确定要删除该分类吗！")) {
    $.ajax({
      type: 'put',
      url: 'http://localhost:8080/manage-api/v1/deleteCategory', //TAG
      data: params,
      async: true,
      success: function (res) {
        // console.log(res);
        if (res.resultCode === 200) {
          // console.log('删除成功！');
          Toast('删除成功！');
          showArticles();
        } else {
          // console.log('删除失败！');
          Toast(`删除失败！${res.message}！`);
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus);
      }
    });
    // alert("已删除！")
  } else {
    Toast('已取消删除！');
  }
}

