$(document).ready(function () {
    getDetail()
  });

  /**
 * 提交详情
 */
function getDetail() {
    // 接收URL中的参数
    const articleId = getUrlParam('articleId'); //TAG
    // console.log('worksId:' + worksId);
   
    $.ajax({
      type: 'get',
      url: `http://localhost:8080/api/v1/blogs/detail/${articleId}`, //TAG
      //详情页接口
      async: true,
      success: function (res) {
        // console.log(res);
        const Datas = res.data;
  
        console.log(Datas);
        $("#article-title").text(`${Datas.title}`);
        console.log(Datas.title);
        $("#article-author").text(`${Datas.author}`);
        $("#article-abstract").text(`${Datas.abstract}`);
        $("#article-keyword").text(`${Datas.keyword}`);
        $("#article-link").text(`${Datas.link}`);
        //添加链接
        let link = ''; 
        link = 
        `    <a href="${Datas.link}" target="_blank">${Datas.link}</a>        `
        $('.article-link').html(link);
        // const num = Datas.blogsDescription.indexOf("。");
        // const short = Datas.blogsDescription.substr(0,num+1);
        // $("#blog-short").text(short);
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert(textStatus);
      }
    });
  }

  /**
 * 通过审核
 */
function passArticle() {
  const articleId = getUrlParam('articleId');
  const usersId = getUrlParam('usersId');
  const usersName = getUrlParam('usersName');

  $.ajax({
    type: 'put',
    url: `http://localhost:8080/passWorks/${articleId}`, //接口
    async: true,
    success: function (res) {
      // console.log(res);
      if (res.resultCode === 200) {
        // console.log('审核  通过成功！');
        Toast('审核通过成功！');
        window.location.href=`admin.html?usersId=${usersId}&usersName=${usersName}`;
      } else {
        // console.log('审核  通过失败！');
        Toast(`审核通过失败！${res.message}！`);
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert(textStatus);
    }
  });
}

  /**
 *  不通过审核
 */
function failArticle() {
  const worksId = getUrlParam('articleId');
  const usersId = getUrlParam('usersId');
  const usersName = getUrlParam('usersName');

  $.ajax({
    type: 'put',
    url: `http://localhost:8080/failWorks/${articleId}`, //接口替换
    async: true,
    success: function (res) {
      // console.log(res);
      if (res.resultCode === 200) {
        console.log('不通过审核成功！');
        Toast('不通过审核成功！');
        window.location.href=`admin.html?usersId=${usersId}&usersName=${usersName}`;
      } else {
        // console.log('不通过审核失败！');
        Toast(`不通过审核失败！${res.message}！`);
      }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      alert(textStatus);
    }
  });
}

  /**
 * 获取url中的参数
 * @param {参数名称} name 
 * @returns 
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
  }

  