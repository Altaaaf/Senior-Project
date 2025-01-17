import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import toastr from 'toastr';
import axios from 'axios';
import Total from './OrderTotal';
import './OrdersCss.css';

import { FiEdit } from 'react-icons/fi';
class OrdersPage extends Component {
	constructor() {
		super();
		this.onSaveForm = this.onSaveForm.bind(this);
	}
	onSaveForm(event) {
		event.preventDefault();
		const { Order } = this.props.location.state;
		axios
			.post('http://localhost:5000/Api/Orders/Create', { Order: Order })
			.then((res) => {
				if (res.status == 200) {
					const data = res.data;
					toastr.success('Successfully created order');
					this.props.history.replace('/');
				} else {
					toastr.error('Unexpected failure occured');
				}
			})
			.catch((err) => {
				toastr.error(err.response.data.status);
			});
	}

	// add a loading page while retrieving data from back end
	render() {
		const { Order } = this.props.location.state;

		return (
			<div className='container'>
				<h2>Your Orders</h2>
				<Link to='/customer/menus'>
					<FiEdit size={16} color='#0c71c3' />
					Add more to your cart
				</Link>
				<br />

				<h2 className='extras-heading'>Order Detail</h2>
				<table className='order-table'>
					<tr>
						<th style={{ width: '80px' }}>Name</th>
						<th style={{ width: '60px' }}>Quantity</th>
						<th style={{ width: '60px' }}>Price</th>
						<th style={{ width: '46px' }}>Total</th>
					</tr>

					{Order.map((Item, index) => (
						<tr key={index}>
							<td>{Item.Name}</td>
							<td>{Item.Quantity}</td>
							<td>{Item.Price}</td>
							<td>{Item.Total}</td>
						</tr>
					))}
				</table>

				<Total data={this.props.location.state.Order} />

				<div className='col s6 center-align'>
					<Link
						to=''
						style={{
							width: '140px',
							borderRadius: '3px',
							letterSpacing: '1.5px',
							marginTop: '3rem',
							textSize: '12px',
						}}
						onClick={this.onSaveForm}
						className='btn small waves-effect waves-light hoverable navy accent-3'>
						Submit
					</Link>
				</div>
			</div>
		);
	}
}
export default OrdersPage;
