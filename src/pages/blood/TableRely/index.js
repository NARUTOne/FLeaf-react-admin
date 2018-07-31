import React, {Component} from 'react';
import {Spin, Input, Select, Modal, message} from 'antd';
import BloodChart from 'components/BloodChart';
// import uniq from 'lodash/uniq';
// import uniqBy from 'lodash/uniqBy';
import cloneDeep from 'lodash/cloneDeep';
import jsonData from './data';
import './index.less';

const Option = Select.Option;
const Search = Input.Search;

class TableRely extends Component {
	constructor() {
		super();
		
		this.state = {
			nodes: [],
			links: [],
			chartData: {
				nodes: [],
				links: []
			},
			treeData: {
				nodes: [],
				links: []
			},
			isLoading: true,
			findType: 'db',
			visible: false
		};
	}

	componentDidMount() {
		this.init();
	}

	init = () => {
		this.setState({chartData: jsonData, isLoading: false});
	}

	handleSearch = (value) => {
		const {findType, chartData} = this.state;
		const {nodes, links} = chartData;

		const newNodes = nodes.map(item => {
			item.isActive = false;
			if(item.type == findType) {
				if(item.name.indexOf(value) > -1) {
					item.isActive = true;
				}
			}
			return item;
		});

		chartData.nodes = cloneDeep(newNodes);
		chartData.links = this.initLinks(links, newNodes);

		this.setState({chartData});
	}

	selectBefore () {
		return 	<Select value={this.state.findType} onChange={value => this.setState({findType: value})} style={{ width: 90 }}>
			<Option value="db">数据库</Option>
			<Option value="table">数据表</Option>
		</Select>;
	}

	initLinks(newLinks, newNodes) {
		function getNodeIndex(nodes, nodeId) {
			var index;			
			for(let i = 0; i < nodes.length; i++) {
				if(nodes[i].nodeId == nodeId) {
					index = i;
					break;
				}
			}
			return index;
		}

		const links = [];
		
		newLinks.forEach(item => {
			const obj = {};
			obj.source = getNodeIndex(newNodes, item.source.nodeId);
			obj.target = getNodeIndex(newNodes, item.target.nodeId);
			links.push(obj);
		});

		return links;
	}

	handleNodeClick = (d) => {
		const {chartData} = this.state;
		const {links} = chartData;

		const newNodes = [];
		const newLinks = links.filter(item => {
			if(item.source.nodeId == d.nodeId) {
				newNodes.push(item.target);
				return true;
			}

			if(item.target.nodeId == d.nodeId) {
				newNodes.push(item.source);
				return true;
			}

			return false;
		});
		newNodes.push(d);

		const treeData = {nodes: newNodes, links: newLinks};

		this.setState({visible: true, treeData: cloneDeep(treeData)});
	}

	handleBloodClick = (d) => {
		const {chartData, treeData} = this.state;
		const {links} = chartData;
		const {nodes} = treeData;

		const ids = nodes.map(item => item.nodeId);

		const addNodes = [];
		const addLinks = links.filter(item => {
			if(item.source.nodeId == d.nodeId && ids.indexOf(item.target.nodeId) < 0) {
				addNodes.push(item.target);
				return true;
			}
			if(item.target.nodeId == d.nodeId && ids.indexOf(item.source.nodeId) < 0) {
				addNodes.push(item.source);
				return true;
			}
			if(item.target.nodeId == item.source.nodeId) {
				return true;
			}

			return false;
		});

		if(!addNodes.length) {
			message.warning(`${d.name}没有子系血缘！`);
			return false;
		}

		const newNodes = [...addNodes, ...treeData.nodes];
		const newAddLinks = [...addLinks, ...treeData.links];

		const newLinks = this.initLinks(newAddLinks, newNodes);

		const newTreeData = {nodes: newNodes, links: newLinks};
		this.setState({treeData: cloneDeep(newTreeData)});
	}

	render() {
		const {chartData, isLoading, treeData} = this.state;

		return (
			<div className='blood-table-rely'>
				<div className="blood-search">
					<Search
						addonBefore={this.selectBefore()}
						placeholder="节点名称查询"
						onSearch={this.handleSearch}
						enterButton
					/>
				</div>
				{isLoading? <div className='spin-box'><Spin/></div> :<BloodChart data={chartData} onNodeClick={this.handleNodeClick}/>}
				<Modal
					title="库表血缘关系树"
					style={{top: 30}}
					width={1000}
					visible={this.state.visible}
					footer={null}
					onCancel={() => this.setState({visible: false})}
				>
					<div style={{height: 500}}>
						<BloodChart data={treeData} options={{isClickBlood: true}} onBloodClick={this.handleBloodClick}/>
					</div>
				</Modal>
			</div>
		);
	}
}

export default TableRely;