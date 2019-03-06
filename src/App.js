import React, { Component } from 'react'
import Video from './Video'
import './App.css'

class App extends Component {
	render() {
		return (
			<div className="App">
				{/* <Video src="./atlanta.mp4" type="video/mp4" controls></Video> */}
				<Video src="./anderson.mp4" typ="video/mp4" />
			</div>
		)
	}
}

export default App
