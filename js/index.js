// 轮播图
var mySwiper = new Swiper(".swiper", {
  loop: true, // 循环模式选项
  autoplay: true, // 自动切换
  // 如果需要分页器
  pagination: {
    el: ".swiper-pagination",
  },
});

// 动态渲染数据
// 1.客户端给服务端发送请求
// 2.服务端接受并处理请求，给前端响应数据
// 3.前端拿到数据并渲染到页面

let num = 0;
renderPage(num);
// 渲染页面封装成函数
function renderPage(num) {
  // 1.发送请求渲染页面
  $.ajax({
    type: "get",
    url: "./php/index.php",
    data: {
      num,
    },
    success(res) {
      setList(res);
    },
    error(err) {
      console.log(err);
    },
  });
}

// 2.点击按钮，加载更多
$(".showMore").click(function () {
  num++;
  renderPage(num);
});

// 3.底线提示

// 封装渲染页面的函数
function setList(res) {
  //   console.log(JSON.parse(res));
  // 判断是否还有没有数据
  if (!JSON.parse(res).show_more) {
    // 如果没有数据了
    $(".showMore").html("没有更多数据了，我是有底线的...");
    return; // 结束
  }
  //   解析数据
  let arr = JSON.parse(res).data.list;
  //   console.log(arr);
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += `
            <div class="list">
              <h4>${arr[i].data.title}</h4>
              <div class="info">
              <img src="${arr[i].data.image}" alt="" />
              <div class="msg">
                  <p>${arr[i].data.content}</p>
                  <p>
                  <span>${arr[i].data_source.pv}浏览</span>
                  <span>
                      ${arr[i].data_source.user.name}
                      <img src="${arr[i].data.bottom.user.logo}" alt="" />
                  </span>
                  </p>
              </div>
              </div>
          </div>
            `;
  }
  $(".container").append(str);
}

// 3.返回页面顶部
$(window).scroll(function () {
  let top = $(window).scrollTop();
  // console.log(top);
  // 判断
  if (top >= 600) {
    $(".backTop").css("display", "block");
  } else {
    $(".backTop").css("display", "none");
  }
});

// 回到顶部
$(".backTop").click(function () {
  $(window).scrollTop(0);
});
