import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: '',
			errors: {},
		};
	}

	componentDidMount() {
		// If logged in and user navigates to Login page, should redirect them to dashboard
		if (this.props.auth.isAuthenticated) {
			if (this.props.auth.user.accountType == 'Manager') {
				console.log('Role type is manager');
				this.props.history.push('/dashboard/manager/ManagerDashboard');
			} else {
				console.log('not a manager - means customer!');
				this.props.history.push('/dashboard/customer/Dashboards');
			}
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isAuthenticated) {
			if (nextProps.auth.user.accountType == 'Manager') {
				console.log('Role type is manager');
				nextProps.history.push('/dashboard/manager/ManagerDashboard');
			} else {
				console.log('not a manager - means customer!');
				nextProps.history.push('/dashboard/customer/Dashboards');
			}
		}
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors,
			});
		}
	}

	onChange = (e) => {
		this.setState({ [e.target.id]: e.target.value });
	};

	onSubmit = (e) => {
		e.preventDefault();

		const userData = {
			Username: this.state.name,
			Email: this.state.email,
			Password: this.state.password,
		};

		this.props.loginUser(userData);
	};

	render() {
		const { errors } = this.state;

		console.log(this.state.errors.status);

		return (
			<div className='container'>
				<div style={{ marginTop: '4rem' }} className='row'>
					<div className='col s8 offset-s2'>
						<Link to='/' className='btn-flat waves-effect'>
							<i className='material-icons left'>keyboard_backspace</i> Back to home
						</Link>
						<div className='col s12 dark-text' style={{ paddingLeft: '11.250px' }}>
							<h4>
								<b>Login</b> below
							</h4>
							<p className='dark-text text-darken-1'>
								Don't have an account? <Link to='/register'>Register</Link>
							</p>
							
						</div>
						<form noValidate onSubmit={this.onSubmit}>
							<p className='red-text text-darken-1 col s12'> {this.state.errors.status}</p>
							<div className='input-field col s12'>
								<input
									onChange={this.onChange}
									value={this.state.email}
									error={errors.email}
									id='email'
									type='email'
									className={classnames('', {
										invalid: errors.email || errors.emailnotfound,
									})}
								/>
								<label className='dark-text' htmlFor='username'>
									Email
								</label>
								<span className='red-text'>
									{errors.email}
									{errors.emailnotfound}
								</span>
							</div>
							<div className='input-field col s12'>
								<input
									onChange={this.onChange}
									value={this.state.password}
									error={errors.password}
									id='password'
									type='password'
									className={classnames('', {
										invalid: errors.password || errors.passwordincorrect,
									})}
								/>
								<label className='dark-text' htmlFor='password'>
									Password
								</label>
								<span className='red-text'>
									{errors.password}
									{errors.passwordincorrect}
								</span>
							</div>
							<p className='col s12 dark-text text-darken-1'>
								Need help? <Link to='/ForgotPassword'>Forgot Password</Link>
							</p>
							<div className='col s12' style={{ paddingLeft: '11.250px' }}>
								<button
									style={{
										width: '150px',
										borderRadius: '3px',
										letterSpacing: '1.5px',
										marginTop: '1rem',
									}}
									type='submit'
									className='btn btn-large waves-effect waves-light hoverable navy accent-3'>
									Login
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

Login.propTypes = {
	loginUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
