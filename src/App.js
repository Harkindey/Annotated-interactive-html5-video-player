import React from 'react';
import Video from './Video';
import './App.css';

const App = () => {
	return (
		<div className="App">
			{/* <Video src="./atlanta.mp4" type="video/mp4" controls></Video> */}
			<Video src="./JordanPeterson.mp4" typ="video/mp4" />
		</div>
	);
};

export default App;
