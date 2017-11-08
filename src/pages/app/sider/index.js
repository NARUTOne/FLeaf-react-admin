/**
 *  sider 
 */
import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import classnames from 'classnames'
import { Link } from 'react-router';
import './index.less'

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SiderCustom extends Component {
  state = {
    collapsed: false,
    mode: 'inline',
    openKey: '',
    selectedKey: ''
  };
  componentDidMount() {
    this.setMenuOpen(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if(this.state.collapsed != nextProps.collapsed) {
      console.log(nextProps);
      this.onCollapse(nextProps.collapsed);
      this.setMenuOpen(nextProps)
    }
  }
  setMenuOpen = props => {
    const {path} = props;
    this.setState({
      openKey: path.substr(0, path.lastIndexOf('/')),
      selectedKey: path
    });
  };
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  };
  menuClick = e => {
    this.setState({
      selectedKey: e.key
    });
    console.log(this.state);

  };
  openMenu = v => {
    console.log(v);
    this.setState({
      openKey: v[v.length - 1]
    })
  };
  render() {
    return (
      <Sider
        trigger={null}
        breakpoint="lg"
        collapsed={this.props.collapsed}
        style={{overflowY: 'auto'}}
        className='sider'
      >
        <div className={classnames('logo',{"logo-max": !this.state.collapsed, 'logo-min': !!this.state.collapsed})} />
        <Menu
          onClick={this.menuClick}
          theme="dark"
          mode={this.state.mode}
          selectedKeys={[this.state.selectedKey]}
          openKeys={[this.state.openKey]}
          onOpenChange={this.openMenu}
        >
          <Menu.Item key="/home">
            <Link to={'/home'}><Icon type="home" /><span className="nav-text">home</span></Link>
          </Menu.Item>
          <Menu.Item key="/todo">
            <Link to={'/todo'}><Icon type="bars" /><span className="nav-text">todo</span></Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

export default SiderCustom;