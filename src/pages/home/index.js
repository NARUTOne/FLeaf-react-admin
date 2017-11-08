import React, { Component } from 'react'
import {Link} from 'react-router'
import { Card, Row, Col, Select, Icon  } from 'antd'
import CountUp from 'react-countup'
import EchartsChart from 'src/components/EchartsChart'
import { lineFun, twoBarFun, barFun, pieFun } from './chartsoptions.js'
import {
  homeTotal,
  homeChartLine,
  homeBarTwo,
  homeBar
} from 'src/mock/home.js'
import xhr from 'src/utils/xhr.js'
import './index.less'

const Option = Select.Option;

class Home extends Component {

  constructor() {
    super()
    this.state = {
      totalInfo: null,
      lineOpt: null,
      twoBarOpt: null,
      barOpt: null,
      pieOpt: null
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData() {
    this.getTotal()
    this.getLineAll()
    this.getTwoBar()
    this.getBar()
    this.getPie()
  }

  getTotal() {
    this.setState({
      totalInfo: homeTotal
    })
  }

  getLineAll() {
    const obj = homeChartLine
    
    const lineOpt = lineFun(obj)
    
    this.setState({lineOpt})
  }

  getTwoBar() {
    const obj = homeBarTwo
    
    const twoBarOpt = twoBarFun(obj)
    
    this.setState({twoBarOpt})
  }

  getBar() {
    const obj = homeBar
    
    const barOpt = barFun(obj)
    
    this.setState({barOpt})
  }

  getPie() {
    const obj = {}
    
    const pieOpt = pieFun(obj)
    
    this.setState({pieOpt})
  }

  handleChange = (value) => {
    console.log(value)
  }

  render() {
    const { totalInfo, lineOpt, twoBarOpt, barOpt, pieOpt } = this.state

    return (
      <div className="home">
        <div className="home-select clear-float">
          <div className="right">
            <b>统计年限：</b>&nbsp;
            <Select defaultValue="2017" style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="2017">2017</Option>
              <Option value="2016">2016</Option>
              <Option value="2015">2015</Option>
            </Select>
          </div>  
        </div>
        <div className="home-card">
          <Row gutter={8}>
            <Col xs={24} md={6}>
              <Card title={<span className='default-color'>预脱贫</span>}>
                <Row gutter={8} className='card-content'>
                  <Col xs={24} md={12}>
                    <CountUp
                      start={0}
                      end={totalInfo ? totalInfo.expectPoor.village : 0}
                      duration={2}
                      decimals={0}
                      useEasing
                      useGrouping
                      separator=","
                      className='card-num'
                    /> 村
                  </Col>
                  <Col xs={24} md={12}>
                    <CountUp
                      start={0}
                      end={totalInfo ? totalInfo.expectPoor.people : 0}
                      duration={2}
                      decimals={0}
                      useEasing
                      useGrouping
                      separator=","
                      className='card-num'
                    /> 人
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card title={<span className='success-color'>已脱贫</span>}>
                <Row gutter={8} className='card-content'>
                  <Col xs={24} md={12}>
                    <CountUp
                      start={0}
                      end={totalInfo ? totalInfo.alreadyPoor.village : 0}
                      duration={2}
                      decimals={0}
                      useEasing
                      useGrouping
                      separator=","
                      className='card-num'
                    /> 村
                  </Col>
                  <Col xs={24} md={12}>
                    <CountUp
                      start={0}
                      end={totalInfo ? totalInfo.alreadyPoor.people : 0}
                      duration={2}
                      decimals={0}
                      useEasing
                      useGrouping
                      separator=","
                      className='card-num'
                    /> 人
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card title={<span className='warn-color'>贫困户</span>}>
                <Row gutter={8} className='card-content'>
                  <Col xs={24} md={12}>
                    <CountUp
                      start={0}
                      end={totalInfo ? totalInfo.poor.village : 0}
                      duration={2}
                      decimals={0}
                      useEasing
                      useGrouping
                      separator=","
                      className='card-num'
                    /> 村
                  </Col>
                  <Col xs={24} md={12}>
                    <CountUp
                      start={0}
                      end={totalInfo ? totalInfo.poor.people : 0}
                      duration={2}
                      decimals={0}
                      useEasing
                      useGrouping
                      separator=","
                      className='card-num'
                    /> 人
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={24} md={6}>
              <Card title={<span className='error-color'>返贫户</span>}>
                <Row gutter={8} className='card-content'>
                  <Col xs={24} md={12}>
                    <CountUp
                      start={0}
                      end={totalInfo ? totalInfo.returnPoor.village : 0}
                      duration={2}
                      decimals={0}
                      useEasing
                      useGrouping
                      separator=","
                      className='card-num'
                    /> 村
                  </Col>
                  <Col xs={24} md={12}>
                    <CountUp
                      start={0}
                      end={totalInfo ? totalInfo.returnPoor.people : 0}
                      duration={2}
                      decimals={0}
                      useEasing
                      useGrouping
                      separator=","
                      className='card-num'
                    /> 人
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="home-chart">
          <Row gutter={8}>
            <Col md={12} xs={24} className='home-chart-col'>
              <Card title={<p>脱贫计划统计</p>}>
                <div className="chart-box">
                  <EchartsChart type='line' options={lineOpt}/>
                </div>
              </Card>
            </Col>
            <Col md={12} xs={24} className='home-chart-col'>
              <Card title={<p>贫困户分析图</p>}>
                <div className="chart-box">
                  <EchartsChart type='bar' options={twoBarOpt}/>
                </div>
              </Card>
            </Col>
            <Col md={12} xs={24} className='home-chart-col'>
              <Card title={<p>贫困户属性分析</p>}>
                <div className="chart-box">
                  <EchartsChart type='bar' options={barOpt}/>
                </div>
              </Card>
            </Col>
            <Col md={12} xs={24} className='home-chart-col'>
              <Card title={<p>贫困原因分析</p>}>
                <div className="chart-box">
                  <EchartsChart type='pie' options={pieOpt}/>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default Home