/**
 *  sider 
 */
import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import classnames from 'classnames'
import { Link, browserHistory } from 'react-router';
import { systemName, navList, PName } from 'utils/config';
import './index.less';

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
    browserHistory.push(PName + '/');
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
      collapsedWidth={70}
      className='sider'
    >
      <Link onClick={this.handleJump} className={classnames('logo',{"logo-max": !this.state.collapsed, 'logo-min': !!this.state.collapsed})}>
        {!this.state.collapsed ? systemName : null}
      </Link>
      <Menu
        onClick={this.menuClick}
        theme="dark"
        mode={this.state.mode}
        selectedKeys={[this.state.selectedKey]}
        openKeys={[this.state.openKey]}
        onOpenChange={this.openMenu}
      >
        {navList.map((item, i) => {
          if(item.children && item.children.length) {
            return <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span className="nav-text">{item.name}</span></span>}>
              {item.children.map((list, n) => {
                  return <Menu.Item key={list.key}>
                    <Link to={list.href}><Icon type={list.icon} /><span className="nav-text">{list.name}</span></Link>
                  </Menu.Item>
              })}
            </SubMenu>
          }
          else {
            return <Menu.Item key={item.key}>
            <Link to={item.href}><Icon type={item.icon} /><span className="nav-text">{item.name}</span></Link>
          </Menu.Item>
          }
        })}        
      </Menu>
    </Sider>

    )
  }
}

export default SiderCustom;