/**
 *  sider 
 */
import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import classnames from 'classnames'
import { Link, browserHistory } from 'react-router';
import './index.less'

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const DEFAULT_PATH = 'home';

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
      this.onCollapse(nextProps.collapsed);
      this.setMenuOpen(nextProps)
    }
  }
  setMenuOpen = props => {
    const {path} = props;
    this.setState({
      openKey: path,
      selectedKey: path
    });
  };

  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  };
  menuClick = e => {
    this.setState({
      selectedKey: e.key
    });

  };
  openMenu = v => {
    this.setState({
      openKey: v[v.length - 1]
    })
  };

  handleJump = () => {
    browserHistory.push('/');
    this.setState({
      openKey: DEFAULT_PATH,
      selectedKey: DEFAULT_PATH
    });
  }
  render() {
    return (
      <Sider
      trigger={null}
      breakpoint="lg"
      collapsed={this.props.collapsed}
      style={{overflowY: 'auto'}}
      className='sider'
    >
      <Link onClick={this.handleJump} className={classnames('logo',{"logo-max": !this.state.collapsed, 'logo-min': !!this.state.collapsed})}>
        {!this.state.collapsed ? 'SYSTEM NAME' : null}
      </Link>
      <Menu
        onClick={this.menuClick}
        theme="dark"
        mode={this.state.mode}
        selectedKeys={[this.state.selectedKey]}
        openKeys={[this.state.openKey]}
        onOpenChange={this.openMenu}
      >
        <Menu.Item key="home">
          <Link to={'/home'}><Icon type="home" /><span className="nav-text">home</span></Link>
        </Menu.Item>
        <Menu.Item key="todo">
          <Link to={'/todo'}><Icon type="bars" /><span className="nav-text">todo</span></Link>
        </Menu.Item>
      </Menu>
    </Sider>

    )
  }
}

export default SiderCustom;