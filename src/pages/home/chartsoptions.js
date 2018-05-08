/**
 * echarts  options
 */

const lineFun = (data) => {
	if(!data) return null;

	var options = {
		title: {
			text: ''
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: ['预脱贫', '未脱贫', '已脱贫', '返贫困']
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				name: '月',
				boundaryGap: false,
				data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
			}
		],
		yAxis: [
			{
				type: 'value',
				name: '户'
			}
		],
		series: [
			{
				name: '预脱贫',
				type: 'line',
				stack: '总量',
				areaStyle: {normal: {}},
				data: data.expectPoor || []
			},
			{
				name: '未脱贫',
				type: 'line',
				stack: '总量',
				areaStyle: {normal: {}},
				data: data.poor || []
			},
			{
				name: '已脱贫',
				type: 'line',
				stack: '总量',
				areaStyle: {normal: {}},
				data: data.alreadyPoor || []
			},
			{
				name: '返贫困',
				type: 'line',
				stack: '总量',
				areaStyle: {normal: {}},
				data: data.returnPoor || []
			}
		]
	};

	return options;
};

const twoBarFun = (data) => {
	if(!data) return null;

	const option =  {
		title: {
			text: ''
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		legend: {
			data: ['户数', '人口数']
		},
		toolbox: {
			show: true,
			feature: {
				saveAsImage: {show: true}
			}
		},
		calculable: true,
		xAxis: [
			{
				type: 'category',
				data: ['黎母山镇', '湾岭镇', '中平镇', '长征镇', '和平镇', '上安县', '吊罗山乡', '红毛镇']
			}
		],
		yAxis: [
			{
				type: 'value',
				name: '数量',
			}
		],
		series: [
			{
				name: '户数',
				type: 'bar',
				data: data.households || [],
				markPoint: {
					data: [
						{type: 'max', name: '最大值'},
						{type: 'min', name: '最小值'}
					]
				}
			},
			{
				name: '人口数',
				type: 'bar',
				data: data.people || [],
				markPoint: {
					data: [
						{type: 'max', name: '最大值'},
						{type: 'min', name: '最小值'}
					]
				}
			}
		]
	};

	return option;
};

const barFun = (data) => {
	if(!data) return null;

	const option =  {
		color: ['#3398DB'],
		tooltip: {
			trigger: 'axis',
			axisPointer: {            // 坐标轴指示器，坐标轴触发有效
				type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				data: ['一般贫困户', '扶贫户', '五保户', '低保贫户', '低保户'],
				axisTick: {
					alignWithLabel: true
				}
			}
		],
		yAxis: [
			{
				type: 'value',
				name: '数量'
			}
		],
		series: [
			{
				name: '贫困户属性',
				type: 'bar',
				barWidth: '50%',
				data: data.data || []
			}
		]
	};

	return option;
};

const pieFun = (data) => {
	if(!data) return;

	const option = {
		title: {
			text: '',
		},
		tooltip: {
			trigger: 'item',
			formatter: "{a} <br/>{b}: {c} ({d}%)"
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		legend: {
			orient: 'horizontal',
			bottom: 10,
			left: 'center',
			data: ['因病', '因残', '因学', '缺土地', '缺技术', '自身发展动力不足']
		},
		series: [
			{
				name: '占比',
				type: 'pie',
				radius: '55%',
				center: ['50%', '50%'],
				data: [
					{value: 33, name: '因病'},
					{value: 21, name: '因残'},
					{value: 12, name: '因学'},
					{value: 10, name: '缺土地'},
					{value: 8, name: '缺技术'},
					{value: 16, name: '自身发展动力不足'},
				],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};

	return option;
};

export {
	lineFun,
	twoBarFun,
	barFun,
	pieFun
};