import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {DatePicker} from 'antd';

const {RangePicker} = DatePicker;

class Quarter extends Component {
  state = {
    mode: ['month', 'month'],
    value: [],
  };
  componentDidMount() {
    this.init(this.props);
  }

  componentWillReceiveProps (nextProps) {
    if ('value' in nextProps) {
      this.init(nextProps);
    }
  }

  init (props) {
    const {value} = props;

    this.setState({
      value: value || []
    });
  }
  handlePanelChange = (value, mode) => {
    this.callback(value);
    this.setState({
      value,
      mode: [
        mode[0] === 'date' ? 'month' : mode[0],
        mode[1] === 'date' ? 'month' : mode[1],
      ],
    });
  }
  callback (dates) {
    this.props.onChange && this.props.onChange(dates);
  }
  render() {
    return (
      <div>
        <RangePicker
          ranges={{ 'This Month': [moment().startOf('month'), moment().endOf('month')] }}
          format="YYYY-Qo"
          mode={this.state.mode}
          placeholder={["开始月份", "结束月份"]}
          value={this.state.value}
          onPanelChange={this.handlePanelChange}
        ></RangePicker >
      </div>
    );
  }
}

Quarter.propTypes = {
  // moment
  value: PropTypes.array
};

export default Quarter;