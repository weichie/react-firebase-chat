import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import firebase, {auth, provider} from './firebase.js'

import './index.css';

import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

class AppRouter extends React.Component{
	constructor(props){
		super(props);
		this.state = {user: null}
		this.logOutUser = this.logOutUser.bind(this);
	}
	componentDidMount(){
		auth.onAuthStateChanged(user => {
			if(user){
				this.setState({
					user
				});
			}
		});
	}

	logOutUser = () => {
		firebase.auth().signOut()
			.then(window.location = "/");
	}

	render(){
		return(
			<Router>
				<div className="app">
					<nav className="main-nav">
						{!this.state.user && 
							<div>
								<Link to="/login">Login</Link>
								<Link to="/register">Register</Link>
							</div>
						}

						{this.state.user && 
							<a href="#!" onClick={this.logOutUser}>Logout</a>
						}
					</nav>

					<Switch>
						<Route path="/" exact render={() => <Home user={this.state.user}/>} />
						<Route path="/login" exact component={Login} />
						<Route path="/register" exact component={Register} />
						<Route component={NoMatch} />
					</Switch>
				</div>
			</Router>
		);
	}
}

const NoMatch = ({location}) => <div>No route match for {location.pathname}</div>;

ReactDOM.render(
	<AppRouter />, 
	document.getElementById('root')
);