import React, {Component} from 'react'
import ReactDM from 'react-dom'
import classnames from 'classnames'
import Chart from './main'
import './index.less'
import tools from 'src/utils/tools'
import shouldComponentUpdate from 'src/utils/shouldComponentUpdate'

class EchatsChart extends Component {
	constructor(props) {
		super();
		this.state = {
			options:null
		}	
	}

	componentDidMount() {
		this.container = ReactDM.findDOMNode(this.refs.echarts)
		if(this.props.options && !tools.emptyObj(this.props.options)) {
			this.renderChart(this.props)
			this.setState({options: this.props.options})
		}
	}

	componentWillReceiveProps(nextProps) {
		if('options' in nextProps && nextProps.options != this.props.options) {			
			this.renderChart(nextProps)
			this.setState({options: nextProps.options})
		}
		
	}

	shouldComponentUpdate = shouldComponentUpdate

	renderChart(props) {
		new Chart({
			container:this.container,
			...props
		})
	}

	resize() {
		const props = this.props
		var chart = new Chart({
			container:this.container,
			...props
		})
	
		chart.resize()
	}

	render() {
		const {className, options,  ...other} = this.props
		return (
			<div className={classnames('echarts_chart', className)} {...other}>
				<div className='echarts_chart_box' ref='echarts'></div>
			</div>
		)
	}
}

export default EchatsChart;