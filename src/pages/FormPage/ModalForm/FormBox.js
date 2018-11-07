import React, {Component} from 'react';
import {Button, Form, Input} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

class FormBox extends Component {
  constructor () {
    super();
    this.state = {

    };
  }

  handleCancel = () => {
    this.props.form.resetFields();
    this.props.onCancel && this.props.onCancel();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(!err) {
        this.props.onOk && this.props.onOk(values);
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="姓名">
            {getFieldDecorator('name', {
                rules: [{ type: 'string', required: true, message: '请输入姓名' }]
              })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="年龄">
            {getFieldDecorator('age', {
                rules: [{ type: 'string', required: true, message: '请输入年龄' }]
              })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="地址"
          >
            {getFieldDecorator('address', {
              initialValue: ''
            })(
              <TextArea rows={4} />
            )}
          </FormItem>
          <FormItem className="btns-margin t-center">
            <Button type="primary" htmlType="submit">确认</Button>&nbsp;
            <Button onClick={this.handleCancel}>取消</Button>
          </FormItem>
         </Form>
      </div>
    );
  }
}

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    const {data} = props;
    const keys = Object.keys(data);
    const obj = {};

    keys.forEach(key => {
      obj[key] = Form.createFormField({
        ...data[key],
        value: data[key].value
      });
    });

    return obj;
  }
})(FormBox);
