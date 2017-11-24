import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link, browserHistory } from 'react-router'
import { Layout, Icon, Popover } from 'antd'
import './index.less'

const { Header } = Layout;

class Head extends Component {

  constructor() {
    super()

    this.state = {
      
    }
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    
  }

  handleLogout = e => {
    e.preventDefault()

    const {logout} = this.props
    const msg = '已登出！'

    logout(msg)

    browserHistory.push({
      pathname: '/login',
      state: {
        referrer: this.props.location.pathname
      }
    })
  }

  handleLogin = e => {
    e.preventDefault()
   
    browserHistory.push({
      pathname: '/login',
      state: {
        referrer: this.props.location.pathname
      }
    })
  }

  renderNav() {
    return <ul className='header__nav'>
      <li className='header-nav-list'>
        <Link to='/'>home</Link> 
      </li>
      <li className='header-nav-list'>
        <Link to='/todo'>todo</Link>
      </li>
    </ul>
  }

  render() {
    const {user} = this.props;
    const headNav = this.renderNav();

    return (
      <Header className="header" >
        <header className='clear-float'>
          <div className='left' >
            <Link to="/" className="header__logo">
              SYSTEM NAME
            </Link>
          </div>
          <div className="left header__left_nav">
            {headNav}
          </div>
          <div className="header__right right" >
            <Popover content={<div className='popover__nav'>{headNav}</div>} title="导航Nav">
              <Icon type="bars" className='header__nav-toggle '/>
            </Popover>
            {user ? 
            <span>{user.userName} &nbsp; <span className="ant-divider" /> &nbsp; <Icon type='logout' title='登出' onClick={this.handleLogout}/></span>:
            <Icon type='login' onClick={this.handleLogin} title='登录'/> }
          </div>
        </header>
      </Header>
    )
  }
}

Head.propTypes = {
  location: PropTypes.object.isRequired
}

export default Head