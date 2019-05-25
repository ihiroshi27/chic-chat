import React from 'react';
import { Link } from 'react-router-dom';
import './resetPassword.css';

const API_URL = process.env.REACT_APP_API_URL;

class ResetPassword extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSubmitFormComplete: true
		}
	}
	onSubmit = (event) => {
		event.preventDefault();
		let password = event.target.password.value;
		let re_password = event.target.re_password.value;
		if (password !== re_password) {
			alert("Password not match");
		} else {
			this.setState({ isSubmitFormComplete: false });
			const params = new URLSearchParams(this.props.location.search); 
			const token = params.get('token');
			fetch(API_URL + '/reset?token=' + token, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ password: password })
			})
			.then(response => response.json().then(body => ({ status: response.status, body: body })))
			.then(response => {
				if (response.status !== 200) {
					alert(response.body.error);
				} else {
					window.location.href = '/';
				}
				this.setState({ isSubmitFormComplete: true });
			});
		}
	}
	render() {
		return (
			<div id="container">
				<div id="reset-password" className="wrapper">
					<div className="section">
						<div className="body">
							<div className="title"><Link to="/"><i className="fas fa-angle-left"></i></Link> Reset your password</div>
							<form onSubmit={ this.onSubmit }>
								<div className="input-icon">
									<i className="fas fa-envelope"></i>
									<input name="password" type="password" placeholder="Password" required />
								</div>
								<div className="input-icon">
									<i className="fas fa-envelope"></i>
									<input name="re_password" type="password" placeholder="Comfirm Password" required />
								</div>
								<button className="button full red" type="submit"><i className="far fa-check-circle"></i> Confirm</button>
							</form>
						</div>
					</div>
				</div>
				<div className="loading-overlay" hidden={ this.state.isSubmitFormComplete }><div className="loading"><div></div><div></div></div></div>
			</div>
		)
	}
}

export default ResetPassword;