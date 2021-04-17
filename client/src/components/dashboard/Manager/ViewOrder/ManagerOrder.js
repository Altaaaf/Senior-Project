import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import axios from 'axios';
import './ManagerOrder.css';
import OrderCard from './OrderCard';
class ManagerOrder extends Component {
	constructor() {
		super();
		this.state = {
			orders: [],
		};
	}
	componentDidMount() {
		axios
			.get('http://localhost:5000/Api/Orders/View')
			.then((res) => {
				const data = res.data;
				//console.log(data);
				this.setState({ orders: data.Orders });
			})
			.catch((err) => this.setState({ error: err }));
	}

	render() {
		const { orders } = this.state;
		return (
			<div className='order_container'>
				
					<h2>All orders</h2>

					<div className="recomendedVideo_video">
					{orders && orders.map((order, index) => {
						console.log('===', order.createdDate)
						return <div key={index}>
							<OrderCard
								orders={order.Order}
								id={index + 1}
								CustomerName= {order.CustomerName}
							/>
						</div>
					})}
				</div>
					<div>
						<Link to='/dashboard/manager/ManagerDashboard'>
							<button> Dashboard</button>
						</Link>
					</div>
				</div>
		
		);
	}
}
export default ManagerOrder;
