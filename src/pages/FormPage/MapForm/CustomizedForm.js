import React from 'react';

import { Form, Input } from 'antd';

const FormItem = Form.Item;

const CustomizedForm = Form.create({
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
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})((props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Form layout="inline">
      <FormItem label="Username">
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Username is required!' }],
        })(<Input />)}
      </FormItem>
    </Form>
  );
});

export default CustomizedForm;
