import React, {Component} from 'react';
import RenderRouter from '@/components/RenderRouter/';

class FormPage extends Component {
  render () {
    const {routers} = this.props;
    return (
      <div className="form-page">
        <h3>表单页</h3>
        <div>
          <RenderRouter routers={routers}></RenderRouter>
        </div>
      </div>
    );
  }
}

export default FormPage;