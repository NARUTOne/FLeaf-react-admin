import React, { Component } from 'react';
import {DatePicker} from 'antd';
import PropTypes from 'prop-types';
import './index.less';

const {MonthPicker} = DatePicker;

class MonthRange extends Component {
  constructor() {
    super();

    this.state = {
      startVal: null,
      endVal: null,
      endOpen: false,
    };
  }

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
      startVal: value ? value[0] : null,
      endVal: value ? value[1] : null
    });
  }

  disabledStartDate = (startVal) => {
    const endVal = this.state.endVal;
    if (!startVal || !endVal) {
      return false;
    }
    return startVal.valueOf() > endVal.valueOf();
  }

  disabledEndDate = (endVal) => {
    const startVal = this.state.startVal;
    if (!endVal || !startVal) {
      return false;
    }
    return endVal.valueOf() <= startVal.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startVal', value);
    this.callback(value, this.state.endVal);
  }

  onEndChange = (value) => {
    this.onChange('endVal', value);
    this.callback(this.state.startVal, value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  callback (startVal, endVal) {
    this.props.onChange && this.props.onChange([startVal, endVal]);
  }

  render() {
    const { startVal, endVal, endOpen } = this.state;
    return (
      <div>
        <div className='month-range-item'>
          <MonthPicker
          disabledDate={this.disabledStartDate}
          format="YYYY-MM"
          placeholder="开始月份"
          value={startVal}
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
          ></MonthPicker>
        </div>
        &nbsp;~&nbsp;
        <div className='month-range-item'>
          <MonthPicker
          disabledDate={this.disabledEndDate}
          format="YYYY-MM"
          placeholder="结束月份"
          value={endVal}
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
          ></MonthPicker>
        </div>
      </div>
    );
  }
}

MonthRange.propTypes = {
  // moment obj
  value: PropTypes.array
};

export default MonthRange;