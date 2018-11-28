import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return (
      <div className="home">
        <h3>Home</h3>
        <Link to="/app/todo">todo</Link><br/>
        <Link to="/app/formpage/base">基础表单</Link>
      </div>
    );
  }
}

export default Home;
