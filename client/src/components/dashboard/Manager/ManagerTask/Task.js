import React, { Component } from 'react';
import './Task.css';
import List from './List';
import InputForm from './InputForm';
import Header from './Header';
import { Link } from 'react-router-dom';

class Task extends Component {
	// getInitialState
	state = {
		list: [],
		pendingItem: '',
	};

	lastItemId = 0;

	newItemId = () => {
		const id = this.lastItemId;
		this.lastItemId += 1;
		return id;
	};

	// Flips isEditing bool
	toggleIsEditingAt = (id) => {
		console.log('isEditingAt', id);
		this.setState({
			list: this.state.list.map((item) => {
				if (id === item.id) {
					return {
						...item,
						isEditing: !item['isEditing'],
					};
				}
				return item;
			}),
		});
	};

	removeItemAt = (id) => {
		this.setState({ list: this.state.list.filter((item) => id !== item.id) });
	};

	handleItemInput = (e) => this.setState({ pendingItem: e.target.value });

	// handle editing items
	setNameAt = (name, id) => {
		this.setState({
			list: this.state.list.map((item) => {
				if (id === item.id) {
					return {
						...item,
						name,
					};
				}
				return item;
			}),
		});
	};

	newItemSubmitHandler = (e) => {
		e.preventDefault();
		const id = this.newItemId();
		this.setState({
			list: [
				{
					name: this.state.pendingItem,
					isEditing: false,
					id,
				},
				...this.state.list,
			],
			pendingItem: '',
		});
	};

	render() {
		return (
			<div className='admin-home-main-container'>
				<div className='admin-home-main-content center-align'>
					<div className='wrapper'>
						<Header />
						<InputForm
							newItemSubmitHandler={this.newItemSubmitHandler}
							handleItemInput={this.handleItemInput}
							pendingItem={this.state.pendingItem}
						/>

						<List
							list={this.state.list}
							removeItemAt={this.removeItemAt}
							toggleIsEditingAt={this.toggleIsEditingAt}
							setNameAt={this.setNameAt}
						/>
						<div>
							<Link to='/dashboard/manager/ManagerDashboard'>
								<button>Dashboard</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Task;
