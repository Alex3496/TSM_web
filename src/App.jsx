import React, { Component } from 'react';
import './App.scss'

import axios from "axios";

//Componentes
import RoutesAll from "./Routes.jsx"
import { User, SetUser } from './Hooks/logged';


axios.defaults.baseURL = "http://localhost:4030"
axios.defaults.withCredentials = true
axios.defaults.headers.common["Content-Type"] = "application/json";

/**
 * 
 * @class App
 * @extends {Component}
 */
class App extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	      user: 0,
	    }
	}

	componentDidMount() {
	    axios.get('/user/logged', {
	      headers: { Authorization: sessionStorage.getItem('token') }
	    }).then(({ data }) => {
	    	console.log(data)
	      this.setUser(data.data)
	    }).catch((error) => {
	      console.log('error', error.response)
	    })
	  }

	setUser = (user) => this.setState({ user })

	render() {

		const { setUser } = this;
    	const { user } = this.state;

		return (
			<>
				<User.Provider value={user}>
                	<SetUser.Provider value={setUser}>
						<RoutesAll/>
					</SetUser.Provider>
              	</User.Provider>
			</>
		)
	}
}

export default App
