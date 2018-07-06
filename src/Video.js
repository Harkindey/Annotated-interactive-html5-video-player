import React, { Component } from 'react';
import fancyTimeFormat from './utils';

const Hospot = (props) => {
    return (
        <a href={`#${props.hotspotDuration}`}>
            <svg
                id="icon-star"
                viewBox="0 0 26 28"
                width="15"
                height="15"
                className="hotspot"
                style={{ left: `${props.left}% ` }}
                onClick={() => props.onClick(props.left)}
                onMouseEnter={() => props.onMouseOver(props.left)}
                onMouseLeave={() => props.onMouseLeave(props.left)}
            >
                <title>star</title>
                <path d="M26 10.109c0 0.281-0.203 0.547-0.406 0.75l-5.672 5.531 1.344 7.812c0.016 0.109 0.016 0.203 0.016 0.313 0 0.406-0.187 0.781-0.641 0.781-0.219 0-0.438-0.078-0.625-0.187l-7.016-3.687-7.016 3.687c-0.203 0.109-0.406 0.187-0.625 0.187-0.453 0-0.656-0.375-0.656-0.781 0-0.109 0.016-0.203 0.031-0.313l1.344-7.812-5.688-5.531c-0.187-0.203-0.391-0.469-0.391-0.75 0-0.469 0.484-0.656 0.875-0.719l7.844-1.141 3.516-7.109c0.141-0.297 0.406-0.641 0.766-0.641s0.625 0.344 0.766 0.641l3.516 7.109 7.844 1.141c0.375 0.063 0.875 0.25 0.875 0.719z"></path>
            </svg>
        </a>
    )
}
class Video extends Component {
    constructor(props) {
        super(props);
        this.vid = null;
        this.canvas = null;
        this.ssContainer = null;
        this.noneVid = null
        this.state = {
            duration: 0,
            progress: 0,
            videoWidth: 0,
            videoHeight: 0,
            modalLocation: 0,
            modal: "None",
            imgSrc: "",
            hotspotDuration: "",
            currentplayer: "vid2",
            playing: false,
        }
    }

    onLoadedMetadata = () => {
        this.setState({
            duration: this.noneVid.duration,
            videoWidth: this.noneVid.videoWidth,
            videoHeight: this.noneVid.videoHeight,
        })
    }

    onTimeUpdate = () => {
        const { duration } = this.state;
        if (this.state.currentplayer === "vid1") {
            const progress = ((this.vid1.currentTime) / duration) * 100;
            this.setState({
                progress
            })
        }

        if (this.state.currentplayer === "vid2") {
            const progress = ((this.vid2.currentTime) / duration) * 100;
            this.setState({
                progress
            })
        }
    }

    onHotspotClick = (percent) => {
        console.log(this.state);
        const currentTime = this.state.duration * (percent / 100)
        if (!this.state.playing) {
            console.log("enter")
            if (this.state.currentplayer === "vid1")
                this.vid1.currentTime = currentTime;

            if (this.state.currentplayer === "vid2")
                this.vid2.currentTime = currentTime;
        } else {
            if (this.state.currentplayer === "vid1") {
                console.log("work")
                this.setState({
                    currentplayer: "vid2",
                })
                this.vid2.currentTime = currentTime;
                this.vid2.play()
                setTimeout(() => {
                    this.vid1.load();
                    // this.vid1.currentTime = 0;
                }, 2000)
            }

            if (this.state.currentplayer === "vid2") {
                console.log("work2")
                this.setState({
                    currentplayer: "vid1",
                })
                this.vid1.currentTime = currentTime;
                this.vid1.play()
                setTimeout(() => {
                    this.vid2.load();
                    //this.vid2.currentTime = 0;
                }, 3000)
            }
        }
    }

    onTimeUpdateForScreenshot = () => {
        this.grabScreenshot();
    }

    grabScreenshot = () => {
        let ctx = this.canvas.getContext("2d");
        ctx.drawImage(this.noneVid, 0, 0, this.state.videoWidth, this.state.videoHeight);
        var img = new Image();
        img.src = this.canvas.toDataURL("image/png");
        this.setState({
            imgSrc: this.canvas.toDataURL("image/png"),
            modal: ""
        })
        img.width = this.state.videoWidth;
    }

    onHotspotOver = (percent) => {
        const currentTime = this.state.duration * (percent / 100)
        this.noneVid.currentTime = currentTime;

        this.setState({
            modalLocation: percent,
            hotspotDuration: fancyTimeFormat(currentTime).split(".")[0]
        })
    }

    onHotspotLeave = () => {
        this.setState({
            modal: "None"
        })
    }

    Play = () => {
        if (this.state.currentplayer === "vid1")
            this.vid1.play();

        if (this.state.currentplayer === "vid2")
            this.vid2.play();
    }

    Pause = () => {
        if (this.state.currentplayer === "vid1")
            this.vid1.pause();

        if (this.state.currentplayer === "vid2")
            this.vid2.pause();
    }


    render() {
        const { props } = this
        return (
            <div className="appChild">
                <div className="VID">
                    <video
                        className="video1"
                        ref={(el => this.vid1 = el)}
                        onSeeked={this.grabScreenshot}
                        onTimeUpdate={this.onTimeUpdate}
                        onPlay={() => this.setState({ playing: true })}
                        onPause={() => this.setState({ playing: false })}
                    >
                        <source src={props.src} type={props.type} />
                        Your browser does not support the video tag.
                </video>
                    <video
                        className="video2"
                        name="media"
                        ref={(el) => this.vid2 = el}
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
                    <span className={`modal ${this.state.modal}`} style={{ left: `${this.state.modalLocation}%` }}>
                        <img src={this.state.imgSrc} className="imgSource" alt="hospot" />
                        <p>Time: {this.state.hotspotDuration} Minutes</p>
                    </span>
                    <span className="progressColor" style={{ width: `${this.state.progress}%` }}></span>
                    <span className="progress" style={{ left: `${this.state.progress}%` }}></span>
                    <Hospot
                        left={10}
                        onClick={(n) => this.onHotspotClick(n)}
                        onMouseOver={(n) => this.onHotspotOver(n)}
                        onMouseLeave={(n) => this.onHotspotLeave(n)}
                        hotspotDuration={this.state.hotspotDuration}
                    />
                    <Hospot
                        left={30}
                        onClick={(n) => this.onHotspotClick(n)}
                        onMouseOver={(n) => this.onHotspotOver(n)}
                        onMouseLeave={(n) => this.onHotspotLeave(n)}
                        hotspotDuration={this.state.hotspotDuration}
                    />
                    <Hospot
                        left={50}
                        onClick={(n) => this.onHotspotClick(n)}
                        onMouseOver={(n) => this.onHotspotOver(n)}
                        onMouseLeave={(n) => this.onHotspotLeave(n)}
                        hotspotDuration={this.state.hotspotDuration}
                    />
                    <Hospot
                        left={70}
                        onClick={(n) => this.onHotspotClick(n)}
                        onMouseOver={(n) => this.onHotspotOver(n)}
                        onMouseLeave={(n) => this.onHotspotLeave(n)}
                        hotspotDuration={this.state.hotspotDuration}
                    />
                    <Hospot
                        left={90}
                        onClick={(n) => this.onHotspotClick(n)}
                        onMouseOver={(n) => this.onHotspotOver(n)}
                        onMouseLeave={(n) => this.onHotspotLeave(n)}
                        hotspotDuration={this.state.hotspotDuration}
                    />
                </div>
                <div>
                    <button onClick={this.Play}>Play</button>
                    <button onClick={this.Pause}>Pause</button>
                </div>
                <canvas
                    width="1120"
                    height="720"
                    ref={(el => this.canvas = el)}
                    className="canvas None"
                >
                </canvas>
                <video
                    className="None"
                    ref={(el) => this.noneVid = el}
                    onLoadedMetadata={this.onLoadedMetadata}
                    onTimeUpdate={this.onTimeUpdateForScreenshot}
                    controls
                >
                    <source src={props.src} type={props.type} />
                    Your browser does not support the video tag.
                </video>
            </div>
        )
    }
}
export default Video