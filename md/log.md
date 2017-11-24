# 更新日志 :bug:
> :fire: xj-web-scaffold 更新日志

## v0.3.1

`2017-11-22`

- 更新 `Rechats` 组件，暂时不支持 `map` 展示。

- 更新 `xhr` 交互方式， 创建 `xhr_config.js` 配置文件， 全局设置。

- 修改 `head` 添加导航  `nav` 并支持 响应式

## v0.3

`2017-11-21`

- 新增theme色调修改：`script/theme.js`，采用less 变量的形式，修改 antd 组件主题。
[Errors when importing antd.less using less-loader #7850](https://github.com/ant-design/ant-design/issues/7850)
[定制主题中单独使 webpack 进行 theme 定制的更改步骤补充 #8035](https://github.com/ant-design/ant-design/pull/8035/commits/7fef8e993a0049579d3a00de4691efef255127b6)

- 修改webpack样式配置。

- 抽出公共样式为变量，全局设置 `utils/style`。

- 脚手架设置两种布局方式：
![](https://raw.githubusercontent.com/NARUTOne/resources-github/master/imgs/xj-web-scaffold/layout1.png)
![](https://raw.githubusercontent.com/NARUTOne/resources-github/master/imgs/xj-web-scaffold/layout2.png)

```js
// import HeaderToggle from './headerToggle/'
import Head from './head'

...

let comment = <Layout  key="layout" className='layout-row'>
      {/*<SiderCustom  key="sider" path={routes[1].path} collapsed={this.state.collapsed} />*/}
      <Layout  key="layout-content">
        {/*<HeaderToggle key="header" location={location} toggle={this.toggle} open={this.state.collapsed} user={user} logout={logoutSuccess}/>*/}
        <Head key="header" location={location} toggle={this.toggle} open={this.state.collapsed} user={user} logout={logoutSuccess}/>
        <Body key="body">
          <Breadcrumb routes={routes} params={params} separator=">" style={{padding: '0 8px 8px'}}/>
          {children}
        </Body>
        <Foot  key="footer"/>
      </Layout>
    </Layout>
    
```

## v0.2

`2017-11-08`

- 新增Redux, 对一些公共部分放入 全局store

- 修改登录模式，采用Redux

## v0.1.2

`2017-11-06`

- 添加paths, 用于存储一些公共配置path

- 修改登录flex布局bug

## v0.1.1

`2017-11-03`

- 添加promise，解决IE下的未定义bug

- 修复flex布局，IE下失效问题

## v0.1.0 

`2017-10-31`

- xj-web-scaffold 正式启动，并暂时不进行开源，放入内网gitLab 
  地址: [xj-web-scaffold](http://172.168.0.114:8089/wuzhong/xj-web-scaffold)

- 脚手架默认支持 `fontawesome` 图标 `<IconFont/>`， 补充 `antd` 的 `Icon`

- 脚手架默认自带 `echarts` 支持组件 `<Recharts />`

  