import React, { Component } from 'react';
import List from './List';
import {Input, Button, Modal } from 'antd';
import './index.less';

class Todos extends Component {

  constructor() {
    super();
    this.state = {
      text: '',
      list: [],
      visible: false
    };
  }

  componentDidMount() {
    this.setState({visible: true});
  }

  handleListChange = (type, index) => {
    const {list} = this.state;

    list.splice(index, 1);    
    this.setState({list});
  }

  handleAdd() {
    const {list, text} = this.state;
    
    list.push(text);
    this.setState({list});
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  render() {
    const {state } = this;
    const { list } = state;
    return (
      <div className="todos" id='todos'>
        <div className='todo-box'>
          <Input style={{width: 200}} addonBefore='/' onChange={e => this.setState({'text': e.target.value})}/>
          <Button onClick={() => {this.handleAdd();}} type="primary">添加</Button>
        </div>        
        <List data={list} onChange={this.handleListChange} />
        <Button type="primary" onClick={this.showModal}>Open</Button>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          getContainer={() => document.getElementById('todos')}
          maskStyle={{position: 'absolute'}}
          wrapClassName={'todo-modal'}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default Todos;