import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link, browserHistory } from 'react-router'
import { Layout, Icon, Row, Col, Popover, Menu } from 'antd'
import { systemName, PName, navList } from 'utils/config'
import './index.less'

const { Header } = Layout;
const SubMenu = Menu.SubMenu;

class Head extends Component {
  static contextTypes = {
    isMobile: PropTypes.bool.isRequired,
  }
 
  constructor() {
    super()

    this.state = { 
      menuVisible: false,
    }
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    
  }

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  }

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  }

  onMenuVisibleChange = (visible) => {
    this.setState({
      menuVisible: visible,
    });
  }

  renderNav(menuMode, activeMenuItem) {
    return  <Menu
        selectedKeys={[activeMenuItem]}
        mode={menuMode}
        style={{backgroundColor: 'transparent', color: '#fff', borderBottom: 'none'}}
        className='header-menu-antd'
      >
      {navList.map((item, i) => {
        if(item.children && item.children.length) {
          return <SubMenu key={item.key} title={<Link to={item.href}>{item.name}</Link> }>
            {item.children.map((list, n) => {
                return <Menu.Item key={list.key}>
                  <Link to={list.href}>{list.name}</Link> 
                </Menu.Item>
            })}
          </SubMenu>
        }
        else {
          return <Menu.Item key={item.key}>
            <Link to={item.href}>{item.name}</Link> 
          </Menu.Item>
        }
      })}
    </Menu>
  } 

  render() {
    const { menuVisible } = this.state;
    const { isMobile } = this.context;
    const { location } = this.props;

    const module = location.pathname.replace(/(^\/|\/$)/g, '').split('/').slice(-1).join('');
    let activeMenuItem = module || 'home';
    // console.log(activeMenuItem)
    const menuMode = isMobile ? 'inline' : 'horizontal';

    const headNav = this.renderNav(menuMode, activeMenuItem);

    return (
      <Header className="header" >
        <header>
          <Row>
            <Col xxl={5} xl={6} lg={6} md={7} sm={24} xs={24}>
              <Link to={PName} className="header__logo">
                {systemName}
              </Link>
            </Col>
            <Col xxl={19} xl={18} lg={18} md={17} sm={0} xs={0}>
              <div className="header__nav__box">
                {!isMobile && headNav}
              </div>
            </Col>
          </Row>
          <div className="header__mobile__nav" >
            {isMobile ? <Popover 
              arrowPointAtCenter
              placement="bottomRight"
              trigger="click"
              content={<div className='popover__nav'>{headNav}</div>} 
              title="">
              <Icon type="bars" className='header__nav-toggle '/>
            </Popover> : null}
          </div>
        </header>
      </Header>
    )
  }
}

Head.propTypes = {
  
}

export default Head