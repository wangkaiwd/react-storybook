## `hooks`基础知识
整理相关的学习资料(阅读以下列表中的所有与`react hooks`相关的内容)：
* [`react`官方文档](https://reactjs.org/docs/hooks-intro.html)
* [weekly](https://github.com/dt-fe/weekly)
* [Dan blog](https://overreacted.io/)

可供参考和使用的优秀的`react hooks`库：
* [usehooks](https://github.com/gragland/usehooks)
* [react-use](https://github.com/streamich/react-use)
* [swr](https://github.com/zeit/swr)


### `SCSS`相关知识
* [`partial`](https://sass-lang.com/guide#topic-4)
* [`variable default value`](https://sass-lang.com/documentation/variables#default-values)

你可以创建能在其它`Sass`文件中包含的拥有小段的`CSS`代码片段的局部`Sass`文件。这是你的`CSS`很好的一种模块化方式，可以帮助保持代码更易于维护。

`partial`是一个命名以下划线开头的`Sass`文件。你可能会命名为像`_partial.scss`这样的名字。下划线让`Sass`知道，**那个文件只是一个局部的文件，他不应该被生成一个`CSS`文件**。

### 项目搭建
* 项目目录结构
* `CSS`变量表配置
* `CSS`初始化样式`normalize.css`

### 测试用例
`jest` + [`react-testing-library`](https://github.com/facebook/create-react-app/pull/7881)

* [Running Tests](https://create-react-app.dev/docs/running-tests)

#### 测试相关知识点

##### jest
* matcher(通过`jest-dom`进行了加强)
* mock
  * mock function
  
##### react-testing-library
* simulate event trigger
  * fireEvent
