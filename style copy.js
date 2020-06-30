class baseDialog {
  constructor() {
    this.info = {
      dragable: true, //是否可拖拽
      maskable: true, //是否有遮罩
      width: "300px", // 定义弹框宽度
      height: "auto",
      content: "默认的测试内容", //
      title: "标题",
      btn: ["确定"], // 弹框按钮
    };

    this.that = this;

    this.succ = function () {
      console.log("默认的确定函数");
    };

    this.fail = function () {
      console.log("默认的取消函数");
    };
  }

  // 设置元素可以被拖动
  dragable() {
    let isDown = false; // 是否已经按下
    let cx = null; // 鼠标点击时距离左侧距离
    let cy = null; // 鼠标点击时距离顶部距离
    let [offX, offY] = [0, 0];
    let [tempX, tempY] = [0, 0];
    let that = this;

    that.elem.addEventListener("mousedown", function (e) {
      cx = e.clientX;
      cy = e.clientY;
      isDown = true;
    });

    window.addEventListener("mousemove", function (e) {
      if (isDown) {
        let nx = e.clientX;
        let ny = e.clientY;
        [tempX, tempY] = [offX + nx - cx, offY + ny - cy];
        that.elem.style.transform = `translate(${tempX}px,${tempY}px)`;
      }
    });

    window.addEventListener("mouseup", function (e) {
      isDown = false;
      [offX, offY] = [tempX, tempY];
    });
  }

  // 关闭弹框
  close() {
    this.that.elem.parentNode.removeChild(this.that.elem); //.style = "display:none";
    document.querySelector("body").style.background = "";
  }

  //  遮罩
  maskable() {
    document.querySelector("body").style.background = "rgba(0,0,0,0.3)";
  }

  // 渲染
  render(contentDom) {
    let dialog = document.getElementsByClassName("biaoer-dialog")[0];
    dialog && dialog.parentNode.removeChild(dialog);
    document.body.appendChild(contentDom);
  }
}

// 一般弹窗
class Alert extends baseDialog {
  constructor(...opts) {
    super();
    let info = Object.assign({}, this.info, opts[0]);

    this.elem = this.init(info);
    this.handle(info, opts);

    this.render(this.elem);
  }

  handle(info, opts) {
    let that = this;
    this.elem
      .getElementsByClassName("biaoer-x")[0]
      .addEventListener("click", function () {
        that.close();
      });

    this.elem.getElementsByClassName("biaoer-succBtn")[0]
      ? this.elem
          .getElementsByClassName("biaoer-succBtn")[0]
          .addEventListener("click", function () {
            opts[1] ? opts[1]() : that.succ();

            that.close();
          })
      : null;

    this.elem.getElementsByClassName("biaoer-failBtn")[0]
      ? this.elem
          .getElementsByClassName("biaoer-failBtn")[0]
          .addEventListener("click", function () {
            opts[2] ? opts[2]() : that.fail();
            that.close();
          })
      : null;

    if (info.dragable) {
      this.dragable();
    }
    if (info.maskable) {
      this.maskable();
    }
  }

  init(info) {
    // 创建弹框
    let dialog = document.createElement("div");
    let title = document.createElement("div"); // 标题区域
    let content = document.createElement("div"); // 内容区域
    let x = document.createElement("div"); // x 按钮
    let btnGroup = document.createElement("div"); // 按钮组
    let succBtn = document.createElement("button"); // 定义按钮
    let failBtn = document.createElement("button"); // 定义按钮

    dialog.classList.add("biaoer-dialog");
    if (info.width) {
      dialog.style.width = info.width;
      dialog.style.marginLeft = -parseInt(info.width) / 2 + "px";
    }
    if (info.height) {
      dialog.style.height = info.height;
    }

    title.classList.add("biaoer-title");
    content.classList.add("biaoer-content");
    x.classList.add("biaoer-x");
    btnGroup.classList.add("biaoer-btnGroup");
    succBtn.classList.add("biaoer-succBtn");
    failBtn.classList.add("biaoer-failBtn");

    title.innerText = info.title;
    content.innerHTML = info.content;
    x.innerText = "x";
    info.btn[0] ? (succBtn.innerText = info.btn[0]) : null;
    info.btn[1] ? (failBtn.innerText = info.btn[1]) : null;

    info.btn[0] ? btnGroup.appendChild(succBtn) : null;
    info.btn[1] ? btnGroup.appendChild(failBtn) : null;

    content.appendChild(btnGroup);
    dialog.appendChild(title);
    dialog.appendChild(content);
    title.appendChild(x);

    return dialog;
  }
}

// 提示框
class Msg {
  constructor(...opts) {
    this.info = Object.assign(
      {},
      {
        width: "200px", // 定义弹框宽度
        height: "auto",
        content: "默认的测试内容",
        time: 3, // 提示框自动消失的时间
      },
      opts[0]
    );
    let elem = this.init();
    opts[1] ? (this.succ = opts[1]) : null;
    document.body.appendChild(elem);
  }
  init() {
    this.close();
    setTimeout(() => {
      this.close();
      this.succ();
    }, this.info.time * 1000);
    let msg = document.createElement("div");
    msg.classList.add("biaoer-msg");
    msg.style.width = this.info.width;
    msg.style.marginLeft = -parseInt(this.info.width) / 2 + "px";
    msg.style.height = this.info.height;
    msg.innerText = this.info.content;
    return msg;
  }
  close() {
    let lastMsg = document.getElementsByClassName("biaoer-msg")[0];
    lastMsg && lastMsg.parentNode.removeChild(lastMsg);
  }
}

// 内嵌层
class IframeDialog extends Alert {
  constructor(...opts) {
    super(...opts);

    let info = Object.assign({}, this.info, opts[0]);
    this.elem = this.init(info); // 先拿到父类的弹框【这里已经继承父类的一系列处理函数】

    let iframe = document.createElement("iframe");
    iframe.classList.add("biaoer-iframe");
    iframe.src = info.content;
    this.elem.getElementsByClassName("biaoer-content")[0].style.padding = 0;
    this.elem.getElementsByClassName("biaoer-content")[0].innerHTML = "";
    this.elem.getElementsByClassName("biaoer-content")[0].appendChild(iframe);

    this.handle(info, opts);
    this.render(this.elem);
  }
}

class Biaoer {
  constructor() {
    // 初始化代码
    this.init();
  }
  init() {
    // 分模块.
    this.alert = function (...opts) {
      new Alert(...opts);
    };

    this.msg = function (...opts) {
      new Msg(...opts);
    };
    this.iframe = function (...opts) {
      new IframeDialog(...opts);
    };
  }
}

window.biaoer = new Biaoer();
