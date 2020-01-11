import React, { Component, useReducer } from 'react';
import fancyTimeFormat from './utils';
import { Hotspot } from './Component/hotspot';

const intialState = {
	duration: 0,
	progress: 0,
	videoWidth: 0,
	videoHeight: 0,
	modalLocation: 0,
	modal: 'None',
	imgSrc: '',
	hotspotDuration: '',
	currentplayer: 'vid2',
	playing: false,
	visibility: '',
};

reducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_PROGRESS':
			return { ...state, ...action.payload };
	}
};

class Video extends Component {
	constructor(props) {
		super(props);
		this.vid = null;
		this.canvas = null;
		this.ssContainer = null;
		this.noneVid = null;
		this.state = {
			duration: 0,
			progress: 0,
			videoWidth: 0,
			videoHeight: 0,
			modalLocation: 0,
			modal: 'None',
			imgSrc: '',
			hotspotDuration: '',
			currentplayer: 'vid2',
			playing: false,
			visibility: '',
		};
	}

	onLoadedMetadata = () => {
		this.setState({
			duration: this.noneVid.duration,
			videoWidth: this.noneVid.videoWidth,
			videoHeight: this.noneVid.videoHeight,
		});
	};

	onTimeUpdate = () => {
		const { duration } = this.state;
		if (this.state.currentplayer === 'vid1') {
			const progress = (this.vid1.currentTime / duration) * 100;
			this.setState({
				progress,
			});
		}

		if (this.state.currentplayer === 'vid2') {
			const progress = (this.vid2.currentTime / duration) * 100;
			this.setState({
				progress,
			});
		}
	};

	onHotspotClick = percent => {
		const currentTime = this.state.duration * (percent / 100);
		if (!this.state.playing) {
			if (this.state.currentplayer === 'vid1')
				this.vid1.currentTime = currentTime;

			if (this.state.currentplayer === 'vid2')
				this.vid2.currentTime = currentTime;
		} else {
			if (this.state.currentplayer === 'vid1') {
				this.setState({
					currentplayer: 'vid2',
					visibility: '',
				});
				this.vid2.currentTime = currentTime;
				this.vid2.play();
				setTimeout(() => {
					this.vid1.load();
					// this.vid1.currentTime = 0;
				}, 2000);
			}

			if (this.state.currentplayer === 'vid2') {
				this.setState({
					currentplayer: 'vid1',
					visibility: 'opaque',
				});
				this.vid1.currentTime = currentTime;
				this.vid1.play();
				setTimeout(() => {
					this.vid2.load();
					//this.vid2.currentTime = 0;
				}, 3000);
			}
		}
	};

	onTimeUpdateForScreenshot = () => {
		this.grabScreenshot();
	};

	grabScreenshot = () => {
		let ctx = this.canvas.getContext('2d');
		ctx.drawImage(
			this.noneVid,
			0,
			0,
			this.state.videoWidth,
			this.state.videoHeight
		);
		var img = new Image();
		img.src = this.canvas.toDataURL('image/png');
		this.setState({
			imgSrc: this.canvas.toDataURL('image/png'),
			modal: '',
		});
		img.width = this.state.videoWidth;
	};

	onHotspotOver = percent => {
		const currentTime = this.state.duration * (percent / 100);
		this.noneVid.currentTime = currentTime;

		this.setState({
			modalLocation: percent,
			hotspotDuration: fancyTimeFormat(currentTime).split('.')[0],
		});
	};

	onHotspotLeave = () => {
		this.setState({
			modal: 'None',
		});
	};

	Play = () => {
		if (this.state.currentplayer === 'vid1') this.vid1.play();

		if (this.state.currentplayer === 'vid2') this.vid2.play();
	};

	Pause = () => {
		if (this.state.currentplayer === 'vid1') this.vid1.pause();

		if (this.state.currentplayer === 'vid2') this.vid2.pause();
	};

	render() {
		const { props } = this;
		return (
			<div className="appChild">
				<div className="VID">
					<video
						className="video1"
						ref={el => (this.vid1 = el)}
						onSeeked={this.grabScreenshot}
						onTimeUpdate={this.onTimeUpdate}
						onPlay={() => this.setState({ playing: true })}
						onPause={() => this.setState({ playing: false })}
					>
						<source src={props.src} type={props.type} />
						Your browser does not support the video tag.
					</video>
					<video
						className={`video2 ${this.state.visibility}`}
						name="media"
						ref={el => (this.vid2 = el)}
						onTimeUpdate={this.onTimeUpdate}
						onSeeked={this.grabScreenshot}
						onPlay={() => this.setState({ playing: true })}
						onPause={() => this.setState({ playing: false })}
					>
						<source src={props.src} type={props.type} />
						Your browser does not support the video tag.
					</video>
				</div>
				<div className="storyLine">
					<span
						className={`modal ${this.state.modal}`}
						style={{ left: `${this.state.modalLocation}%` }}
					>
						<img
							src={this.state.imgSrc}
							className="imgSource"
							alt="Hotspot"
						/>
						<p>Time: {this.state.hotspotDuration} Minutes</p>
					</span>
					<span
						className="progressColor"
						style={{ width: `${this.state.progress}%` }}
					/>
					<span
						className="progress"
						style={{ left: `${this.state.progress}%` }}
					/>
					<Hotspot
						left={10}
						onClick={n => this.onHotspotClick(n)}
						onMouseOver={n => this.onHotspotOver(n)}
						onMouseLeave={n => this.onHotspotLeave(n)}
						hotspotDuration={this.state.hotspotDuration}
					/>
					<Hotspot
						left={30}
						onClick={n => this.onHotspotClick(n)}
						onMouseOver={n => this.onHotspotOver(n)}
						onMouseLeave={n => this.onHotspotLeave(n)}
						hotspotDuration={this.state.hotspotDuration}
					/>
					<Hotspot
						left={50}
						onClick={n => this.onHotspotClick(n)}
						onMouseOver={n => this.onHotspotOver(n)}
						onMouseLeave={n => this.onHotspotLeave(n)}
						hotspotDuration={this.state.hotspotDuration}
					/>
					<Hotspot
						left={75}
						onClick={n => this.onHotspotClick(n)}
						onMouseOver={n => this.onHotspotOver(n)}
						onMouseLeave={n => this.onHotspotLeave(n)}
						hotspotDuration={this.state.hotspotDuration}
					/>
					<Hotspot
						left={90}
						onClick={n => this.onHotspotClick(n)}
						onMouseOver={n => this.onHotspotOver(n)}
						onMouseLeave={n => this.onHotspotLeave(n)}
						hotspotDuration={this.state.hotspotDuration}
					/>
				</div>
				<div>
					<button className="actionButton" onClick={this.Play}>
						Play
					</button>
					<button className="actionButton" onClick={this.Pause}>
						Pause
					</button>
				</div>
				<canvas
					width="1120"
					height="720"
					ref={el => (this.canvas = el)}
					className="canvas None"
				/>
				<video
					className="None"
					ref={el => (this.noneVid = el)}
					onLoadedMetadata={this.onLoadedMetadata}
					onTimeUpdate={this.onTimeUpdateForScreenshot}
					controls
				>
					<source src={props.src} type={props.type} />
					Your browser does not support the video tag.
				</video>
			</div>
		);
	}
}
export default Video;
