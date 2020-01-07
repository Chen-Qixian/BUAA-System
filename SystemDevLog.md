# 系统开发日志

## 2019.12

### 12.25 开发日志

- 前端基本框架框架搭建
- 代码结构规划与调整
- 代码注释编写
- 构思系统组成要素与大体架构

### 12.26 开发日志

- 侧边导航栏anchor定位功能

  - 对页面布局样式代码进行重构：添加在 custom.css 中

    - 顶部导航栏和侧边导航栏设置位置为

    ```css
    nav#sidebar{
      position: fixed;
    }
    header.header {
      position:fixed;
      width: 100%;
      z-index: 19999;
    }
    ```

    ​		由于position:fixed脱离文档流，因此需要设置宽度，保证导航栏能在顶部覆盖需要设置z-index

    - 为页面内容控制板和侧边栏添加margin隔开相应距离

    ```css
    nav#sidebar {
    	margin-top: 80px;
    }
    .page-content {
    	margin-top: 80px;
    	margin-left: 280px;
    }
    ```

    - 由于需要制作展开收起切换的适配，配合JQ的toggleClass添加active项

    ```css
    .page-content.active {
    	margin-left: 80px;
    }
    ```

  - 添加锚点定位【关键】

    - 使用 a 标签自带的锚点定位功能例如

    ```html
    <a href="#fileUpload">File Upoad</a>
    <!-- 会自动跳转到 -->
    <div id="fileUpload"></div>
    ```

    - a标签定位自身问题

      定位是基于当前网页显示首页的顶部，i.e.点击链接后会将该部分定位至页面顶端，导致顶部80px的内容被顶部导航条遮挡。

    - 方案一：为a标签绑定点击事件，在回调中解决整页偏移量

    ```javascript
      $('#sidebar a').on('click', function() {
          setTimeout(() => {
              let scrolltop = Math.max( $("html").scrollTop(), $("body").scrollTop() );
              console.log(scrolltop);
              $(window).scrollTop(scrolltop - 80);
          } , 0)
      })
    ```

    ​		这个方案有一个明显不足：在回调发生时，a标签的anchor定位尚未执行完scroll事件，因此拿到的scrolltop变量值是不准确的，此外，直接使用document.body.scrollTop属性可能导致取值恒0的尴尬局面。需要使用Math.max( \$("html").scrollTop(), $("body").scrollTop() )代替之。

    - 方案二：使用jquery的animate动画方法进行滚动

    ```javascript
    $('#dashboard-link').click(function() {
          $('html, body').animate(
          {
              scrollTop: $('#dashboard').offset().top + OFFSETTOP
          },
          {
              duration: 500,
              easing: "swing"
          })
          return false;
      })
    ```

    ​		jquery的动画可以对DOM元素的属性进行设置，添加动画效果。

    ​		通过offset().top 属性获取该元素在页面中的位置，添加一个-80px的OFFSETTOP常量进行校正。

### 12.27 开发日志

- 自适应切换显示模式（侧边导航栏收放）

  - 主要应用jquery提供的toggleClass方法。该方法可以对指定DOM元素的class进行监听，若存在则删除该className反之则添加该className。
  - 根据切换自适应模式编写相关样式：展开/收起样式。
  - 对所有相关元素绑定toggleClass方法。
  - 此外对于部分DOM元素还应使用hasClass() / addClass() / removeClass() 相关方法对class进行管理。

- 切换anchor位置后需要动态改变标签active状态

  - 同理采用className切换方式进行管理
  - 将点击事件绑定与链接跳转的click事件整合到一个监听方法中
  - 涉及到DOM树节点的遍历

  ```javascript
  $(this).parent().siblings().removeClass('active')
  $(this).parent().addClass('active')
  ```


### 12.28 开发日志

- 调整布局内容完成板块归类
- 调研文件上传功能
  - 文件上传拟采用Dropzone.js库来实现
  - 功能上支持本地选择文件、拖拽上传文件

### 12.29 开发日志

- 今日摸鱼

### 12.30 开发日志

- 编写设计文档
- 进行需求分析、系统架构设计、数据库设计以及接口设计
- 对模块进行详细设计，其中包括
  - 模块功能
  - 输入输出接口
  - 模块设计图

### 12.31 开发日志

- 欢庆余年

## 2020.1

### 1.1 开发日志

- 迎接新年

### 1.2 开发日志

- 调研node.js文件处理模块fs

  - 主要调研文件读/写功能
  - 文件读写具有同步/异步两种模式
  - 用法：

  ```js
  // readfile.js
  let fs = require('fs')
  // 异步读取
  fs.readFile('test.txt',function(err, data) {
    if(err) {
      return console.error(err)
    }
    else {
      console.log('asynchronous reading file...', data.toString())
    }
  })
  // 同步读取
  let data = fs.readFileSync('test.txt')
  console.log(data.toString())
  ```

  ​	  执行上述js文件

  ```php
  $node readfile.js
  ```


### 1.3 开发日志

- 设计稿原型设计与讨论
  - 根据SDD设计文档的模块运作流程绘制设计稿原型
  - 对设计稿进行样式美化
  - review设计稿，修改

### 1.4 开发日志

- 模块文案确定
- 对照设计稿进行页面结构开发

### 1.5开发日志

- 精读MPIPP论文（身体不适未进行大量开发工作）

### 1.6开发日志

- 推荐模块开发
  - 拟将6种算法按照多个维度进行评价，并为之设计一套评分规则。
  - 按照评分的高低进行推荐排序。
  - 选取算法代表性icon达到对用户的提示效果。
  - 对布局进行设计，突出性能优异算法的位置，以便用户能方便地选取算法。
  - 预留链接位置，\<a>标签，以便后续扩展算法说明使用。
- 参数配置模块开发
  - 在该模块中加入多种输入元素
    - 单选按钮
    - 复选按钮
    - 输入框
    - 下拉框选择
  - 标识算法可用性与相关依赖项提示。
- 控制面板模块开发
  - 将用户配置参数以及当前算法呈现给用户，使用户能最方便地了解到当前系统状态。
  - 呈现系统关键信息
    - 通讯图(Communicaton Graph)状态
    - 系统拓扑图(System Topology Graph)状态
    - 映射状态（呈现目标函数）

### 1.7开发日志

- 导航栏细节调整
  - 语言控制栏
- 数据图表坐标栏设计
  - 按任务执行状态划分
  - 按数据集划分
- 数据可视化区域模块设计
  - 文件传输率
  - 节点占用情况（比例）
  - 进程分配情况（比例）
- 文件上传模块开发
  - 先不考虑服务端实现
  - dropzone点击+拖拽上传+样式
- 设计稿修订
- 调研/部署bootstrap布局/网格系统
  - container-fluid/container
    - row
      - .col-xs- .col-sm- .col-md- .col-lg- 从小到达依次适配





















