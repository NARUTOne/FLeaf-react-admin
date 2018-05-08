import React, {Component} from 'react';
import TableRely from './TableRely';
import {Icon} from 'antd';
import {Card, CardHead, CardBody} from 'components/Card';
import './index.less';

class Blood extends Component {
	constructor() {
		super();

		this.state = {

		};
	}

	render() {
		return (
			<div className='blood'>
				<Card>
					<CardHead><Icon type='share-alt' className='icon' />血缘关系图</CardHead>
					<CardBody>
						<div className="blood-chart">
							<TableRely />
						</div>
					</CardBody>                
				</Card>
			</div>
		);
	}
}

export default Blood;