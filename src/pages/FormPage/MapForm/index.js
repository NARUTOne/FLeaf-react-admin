import React, {Component} from 'react';
import CustomizedForm from './CustomizedForm';

class MapForm extends Component {
  state = {
    fields: {}
  };

  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }

  render() {
    const fields = this.state.fields;
    return (
      <div>
        <h4>上层数据表单</h4>
        <CustomizedForm data={fields} onChange={this.handleFormChange} />
        <pre className="language-bash">
          {JSON.stringify(fields, null, 2)}
        </pre>
      </div>
    );
  }
}

export default MapForm;
