import React, {Component} from 'react';
import {Row, Col, Button, Table, Icon, Modal, Form} from 'antd';
import FormBox from './FormBox';
import MonthRange from '@/components/MonthRange';
import Quarter from '@/components/Quarter';
import './index.less';

const FormItem = Form.Item;

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: '32',
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: '42',
  address: '西湖区湖底公园1号'
}];

class ModalForm extends Component {
  constructor () {
    super();

    this.state = {
      modalType: 'add',
      visiable: false,
      tableData: [],
      editData: {}
    };

    this.columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <a href="javascript:;" onClick={() => {this.handleEdit(record);}}><Icon type="edit"/></a>
        );
      }
    }];
  }

  componentDidMount () {
    this.setState({tableData: dataSource});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = this.props.form.getFieldsValue();
    console.log(formData);
  }

  handleResetForm = () => {
    this.props.form.resetFields();
  }

  handleAdd = () => {
    this.setState({
      editData: {},
      visiable: true
    });
  }

  formatRecord (record) {
    const keys = Object.keys(record);
    const obj = {};

    keys.forEach((key) => {
      obj[key] = {};
      obj[key].value = record[key];
    });
    return obj;
  }

  handleEdit (record) {
    const newRecord = this.formatRecord(record);
    this.setState({
      editData: newRecord,
      visiable: true
    });
  }

  handleConfigChange = (changedFields) => {
    this.setState(({ editData }) => ({
      editData: { ...editData, ...changedFields },
    }));
  }

  handleOk = () => {
    this.handleReset();
  }

  handleCancel = () => {
    this.handleReset();
  }

  handleReset () {
    this.setState({
      visiable: false,
      editData: {},
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
        <h4>表格表单</h4>
        <div className="table-top-form">
          <Form onSubmit={this.handleSubmit}>
            <Row gutter={16}>
              <Col md={12} xs={24}>
                <FormItem  {...formItemLayout} label="统计月份">
                {getFieldDecorator('months', {

                })(
                  <MonthRange></MonthRange>
                )}
                </FormItem>
              </Col>
              <Col md={6} xs={24}>
                <FormItem  {...formItemLayout} label="统计季度">
                {getFieldDecorator('quarter', {

                })(
                  <Quarter></Quarter>
                )}
                </FormItem>
              </Col>
              <Col md={6} xs={24}>
                <FormItem className="btns-margin t-right">
                  <Button type="primary" htmlType="submit">查询</Button>
                  <Button onClick={this.handleResetForm}>重置</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <hr/>
        <div className="table-top-action clear-float">
          <Button className="right" icon="plus" type="primary" onClick={this.handleAdd}>新增</Button>
        </div>
        <Table dataSource={this.state.tableData} columns={this.columns} />
        <Modal
          title={this.state.modalType === 'add' ? '新增' : '编辑'}
          maskClosable={false}
          visible={this.state.visiable}
          footer={null}
          onCancel={this.handleCancel}>
          <FormBox data={this.state.editData} onChange={this.handleConfigChange} onCancel={this.handleCancel} onOk={this.handleOk}/>
        </Modal>
      </div>
    );
  }
}

export default Form.create()(ModalForm);
