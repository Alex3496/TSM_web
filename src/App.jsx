import { useState } from 'react'
import './App.scss'

import axios from "axios";

import RoutesAll from "./Routes.jsx"


axios.defaults.baseURL = "http://localhost:4030"
axios.defaults.withCredentials = true
axios.defaults.headers.common["Content-Type"] = "application/json";

function App() {

	return (
		<>
			<RoutesAll/>
		</>
	)
}

export default App
