import React, { useReducer, useRef } from 'react';
import fancyTimeFormat from './utils';
import { Hotspot } from './Component/hotspot';

const initialState = {
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

const reducer = (state, action) => {
	return { ...state, ...action.payload };
};

const Video = props => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const vid1 = useRef(null);
	const vid2 = useRef(null);
	const canvas = useRef(null);
	const noneVid = useRef(null);

	const onLoadedMetadata = () => {
		dispatch({
			payload: {
				duration: noneVid.current.duration,
				videoWidth: noneVid.current.videoWidth,
				videoHeight: noneVid.current.videoHeight,
			},
		});
	};

	const onTimeUpdate = () => {
		const { duration } = state;
		if (state.currentplayer === 'vid1') {
			const progress = (vid1.current.currentTime / duration) * 100;
			dispatch({
				payload: {
					progress,
				},
			});
		}

		if (state.currentplayer === 'vid2') {
			const progress = (vid2.current.currentTime / duration) * 100;
			dispatch({
				payload: {
					progress,
				},
			});
		}
	};

	const onHotspotClick = percent => {
		const currentTime = state.duration * (percent / 100);
		if (!state.playing) {
			if (state.currentplayer === 'vid1')
				vid1.current.currentTime = currentTime;

			if (state.currentplayer === 'vid2')
				vid2.current.currentTime = currentTime;
		} else {
			if (state.currentplayer === 'vid1') {
				dispatch({
					payload: {
						currentplayer: 'vid2',
						visibility: '',
					},
				});
				vid2.current.currentTime = currentTime;
				vid2.current.play();
				setTimeout(() => {
					vid1.current.load();
					// vid1.current.currentTime = 0;
				}, 2000);
			}

			if (state.currentplayer === 'vid2') {
				dispatch({
					payload: {
						currentplayer: 'vid1',
						visibility: 'opaque',
					},
				});
				vid1.current.currentTime = currentTime;
				vid1.current.play();
				setTimeout(() => {
					vid2.current.load();
					//vid2.current.currentTime = 0;
				}, 3000);
			}
		}
	};

	const onTimeUpdateForScreenshot = () => {
		grabScreenshot();
	};

	const grabScreenshot = () => {
		let ctx = canvas.current.getContext('2d');
		ctx.drawImage(
			noneVid.current,
			0,
			0,
			state.videoWidth,
			state.videoHeight
		);
		var img = new Image();
		img.src = canvas.current.toDataURL('image/png');
		dispatch({
			payload: {
				imgSrc: canvas.current.toDataURL('image/png'),
				modal: '',
			},
		});
		img.width = state.videoWidth;
	};

	const onHotspotOver = percent => {
		const currentTime = state.duration * (percent / 100);
		noneVid.current.currentTime = currentTime;
		dispatch({
			payload: {
				modalLocation: percent,
				hotspotDuration: fancyTimeFormat(currentTime).split('.')[0],
			},
		});
	};

	const onHotspotLeave = () => {
		dispatch({
			payload: {
				modal: 'None',
			},
		});
	};

	const Play = () => {
		if (state.currentplayer === 'vid1') vid1.current.play();

		if (state.currentplayer === 'vid2') vid2.current.play();
	};

	const Pause = () => {
		if (state.currentplayer === 'vid1') vid1.current.pause();

		if (state.currentplayer === 'vid2') vid2.current.pause();
	};

	return (
		<div className="appChild">
			<div className="VID">
				<video
					className="video1"
					ref={vid1}
					onSeeked={grabScreenshot}
					onTimeUpdate={onTimeUpdate}
					onPlay={() =>
						dispatch({
							payload: { playing: true },
						})
					}
					onPause={() =>
						dispatch({
							payload: { playing: false },
						})
					}
				>
					<source src={props.src} type={props.type} />
					Your browser does not support the video tag.
				</video>
				<video
					className={`video2 ${state.visibility}`}
					name="media"
					ref={vid2}
					onTimeUpdate={onTimeUpdate}
					onSeeked={grabScreenshot}
					onPlay={() =>
						dispatch({
							payload: { playing: true },
						})
					}
					onPause={() =>
						dispatch({
							payload: { playing: false },
						})
					}
				>
					<source src={props.src} type={props.type} />
					Your browser does not support the video tag.
				</video>
			</div>
			<div className="storyLine">
				<span
					className={`modal ${state.modal}`}
					style={{ left: `${state.modalLocation}%` }}
				>
					<img
						src={state.imgSrc}
						className="imgSource"
						alt="Hotspot"
					/>
					<p>Time: {state.hotspotDuration} Minutes</p>
				</span>
				<span
					className="progressColor"
					style={{ width: `${state.progress}%` }}
				/>
				<span
					className="progress"
					style={{ left: `${state.progress}%` }}
				/>
				<Hotspot
					left={10}
					onClick={n => onHotspotClick(n)}
					onMouseOver={n => onHotspotOver(n)}
					onMouseLeave={n => onHotspotLeave(n)}
					hotspotDuration={state.hotspotDuration}
				/>
				<Hotspot
					left={30}
					onClick={n => onHotspotClick(n)}
					onMouseOver={n => onHotspotOver(n)}
					onMouseLeave={n => onHotspotLeave(n)}
					hotspotDuration={state.hotspotDuration}
				/>
				<Hotspot
					left={50}
					onClick={n => onHotspotClick(n)}
					onMouseOver={n => onHotspotOver(n)}
					onMouseLeave={n => onHotspotLeave(n)}
					hotspotDuration={state.hotspotDuration}
				/>
				<Hotspot
					left={75}
					onClick={n => onHotspotClick(n)}
					onMouseOver={n => onHotspotOver(n)}
					onMouseLeave={n => onHotspotLeave(n)}
					hotspotDuration={state.hotspotDuration}
				/>
				<Hotspot
					left={90}
					onClick={n => onHotspotClick(n)}
					onMouseOver={n => onHotspotOver(n)}
					onMouseLeave={n => onHotspotLeave(n)}
					hotspotDuration={state.hotspotDuration}
				/>
			</div>
			<div>
				<button className="actionButton" onClick={Play}>
					Play
				</button>
				<button className="actionButton" onClick={Pause}>
					Pause
				</button>
			</div>
			<canvas
				width="1120"
				height="720"
				ref={canvas}
				className="canvas None"
			/>
			<video
				className="None"
				ref={noneVid}
				onLoadedMetadata={onLoadedMetadata}
				onTimeUpdate={onTimeUpdateForScreenshot}
				controls
			>
				<source src={props.src} type={props.type} />
				Your browser does not support the video tag.
			</video>
		</div>
	);
};
export default Video;
