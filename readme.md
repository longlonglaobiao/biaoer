## 弹框组件

> biaoer 全部采用 “类” 语法糖，所以如果需要用在低端浏览器上面还需要进行转码。为了方便扩展，常用的方法和事件处理都放在基础类中。如果需要进行弹框组件的扩展，请参考 “内嵌层” 弹框源码。


### 使用方式

1. 引入 biaoer.css
2. 引入 biaoer.js

### biaoer.alert

```js
// 普通弹框
biaoer.alert(
  {
    title: "标题内容",
    content: "<h1>一级标题</h1>", // 这里采用的是 innerHTML 插值【所以需要自己信任的内容才进行插值】
    btn: ["确定", "取消"], // 弹框按钮【如果不需要弹框，这里需要传入一个空数组，因为默认选项是有弹框的，这里如果只有一个弹框按钮，那么数组中只传入一项内容】
  },
  // 第一个函数是第一个按钮的点击处理函数
  function () {
    console.log("您点击了确定按钮");
  },
  // 第二个函数是第二个按钮的点击处理函数
  function () {
    console.log("您点击了取消按钮");
  }
);
```

#### 已经提供的可配置项

```js
biaoer.alert({
  /* 配置项 */
});
```

| 配置项   | 说明         | 可选参数                                                       | 默认             |
| -------- | ------------ | -------------------------------------------------------------- | ---------------- |
| dragable | 是否可拖动   | true \| false                                                  | true             |
| maskable | 是否有遮罩   | true \| false                                                  | true             |
| width    | 弹框宽度     | 示例："300px"                                                  | "300px"          |
| height   | 弹框高度     | 示例："auto"                                                   | "auto"           |
| content  | 弹框内容部分 | 任意字符串（包括文档字符串）                                   | "默认的测试内容" |
| title    | 标题         | 任意字符串                                                     | "标题"           |
| btn      | 按钮         | 示例：["确定","取消"](如果不需要按钮，那么传入一个空数组 [ ] ) | ["确定"]         |

### biao.iframe

```js
// 内嵌层弹框【不需要太多的花里胡哨】

biaoer.iframe({
  content: "./remote.html",
});
```

#### 已经提供的可配置项

| 配置项   | 说明         | 可选参数              | 默认    |
| -------- | ------------ | --------------------- | ------- |
| content  | 就是内容路由 | 示例："./remote.html" |         |
| width    | 弹框宽度     | 示例："300px"         | "300px" |
| height   | 弹框高度     | 示例："auto"          | "auto"  |
| title    | 标题         | 任意字符串            | "标题"  |
| dragable | 是否可拖动   | true \| false         | true    |
| maskable | 是否有遮罩   | true \| false         | true    |

### biao.msg

```js
// 消息提示框
biaoer.msg({
  content: "测试内容",
  time: 3, // 提示框自动消失的时间（单位：秒）
});
```

#### 已经提供的可配置项

| 配置项  | 说明         | 可选参数          | 默认             |
| ------- | ------------ | ----------------- | ---------------- |
| content | 内容         | 示例："测试内容"  | "默认的测试内容" |
| width   | 宽度         | 示例："200px"     | "200px"          |
| height  | 高度         | 示例："auto"      | "auto"           |
| time    | 自动消失时间 | 示例(单位：秒)：3 | 3                |
