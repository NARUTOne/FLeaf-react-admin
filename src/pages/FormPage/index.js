import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import BaseForm from './BaseForm/';
// import RenderRouter from '@/components/RenderRouter/';

class FormPage extends Component {
  render () {
    // const {routers} = this.props;
    console.log(1);
    return (
      <div className="form-page">
        <h3>表单页</h3>
        <div>
          {/* <RenderRouter routers={routers}></RenderRouter> */}
          <Route
            exact
            path='/app/formpage/base'
            render={props => <BaseForm {...props}></BaseForm>}
            key={'/app/formpage/base'}/>;
        </div>
      </div>
    );
  }
}

export default FormPage;