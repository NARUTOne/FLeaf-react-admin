import React, {Component} from 'react'
import Chart from './main.js'
import shouldComponentUpdate from 'utils/shouldComponentUpdate'
import './index.less'

class BloodChart extends Component {
	constructor() {
		super()

		this.state = {}
	}

	componentDidMount() {
		this.renderChart(this.props)
	}

	componentWillReceiveProps(nextProps) {
		nextProps.data && this.renderChart(nextProps)
	}

	shouldComponentUpdate = shouldComponentUpdate

	renderChart(props) {
		const {data, ...others} = props;
		const config = {
			container: this.refs.chart,
			data: this.editData(props.data),
			options: props.options || {},
			...others
		}

		const chart = new Chart(config)
	}

	editData(data) {
		data.nodes.forEach((item, i) => {
			item.nodeId = item.nodeId || 'node' + i
		})

		return data
	}

	render() {
		return (
			<div className='blood-chart' ref='chart'>
			</div>
		)
	}
}

export default BloodChart