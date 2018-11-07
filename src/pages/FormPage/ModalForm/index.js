import React, {Component} from 'react';
import {Button, Table, Icon, Modal} from 'antd';
import FormBox from './FormBox';
import './index.less';

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
    return (
      <div>
        <h4>表格表单</h4>
        <div className="table-top-action clear-float">
          <Button className="right" icon="plus" onClick={this.handleAdd}>新增</Button>
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

export default ModalForm;
