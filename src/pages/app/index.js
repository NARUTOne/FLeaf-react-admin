import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { loginAction } from 'src/action/'

import Head from './header/'
import SiderCustom from './sider/'
import Body from './body/'
import Foot from './footer/'
import {Layout, Breadcrumb} from 'antd'
import auth from 'src/utils/auth'
import './index.less'

const {
  logoutSuccess,
  loginSuccess
} = loginAction

class App extends Component {
  constructor(props) {
    super(props)
  }
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    if (!!auth.isLoginIn()) {
      const data = auth.user

      this.props.loginSuccess(data)
    }
  }

  render() {
    const { children, routes, params, location, user, logoutSuccess } = this.props
    // console.log(routes)
    let comment = <Layout  key="layout" className='layout-row'>
      <SiderCustom  key="sider" path={this.props.location.pathname} collapsed={this.state.collapsed} />
      <Layout  key="layout-content">
        <Head key="header" location={location} toggle={this.toggle} open={this.state.collapsed} user={user} logout={logoutSuccess}/>
        <Body key="body">
          <Breadcrumb routes={routes} params={params} separator=">" />
          {children}
        </Body>
        <Foot  key="footer"/>
      </Layout>
    </Layout>

    let main = [comment]

    // 登录页和 404 页不渲染 Header
    if (routes[1]) {
      const path = routes[1].path
      if (path === 'login' || path === '*') {
        main = [<Body key="body">
        {children}
      </Body>, <Foot  key="footer"/>]
      }
    }

    return (
      <div className="wrapper">
        <Layout>
          {main}
        </Layout>          
      </div>
    )
  }
}

App.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = (state) => {
  const { login } = state;
  console.log(login)
  return {
    user: login.user || null
  };
};

function mapDispatchToProps(dispatch) {
  return {
    logoutSuccess: bindActionCreators(logoutSuccess, dispatch),
    loginSuccess: bindActionCreators(loginSuccess, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
