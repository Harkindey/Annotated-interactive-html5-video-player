import React, { Component } from 'react'

const Hospot = (props) => {
    return (
        <svg
            id="icon-star"
            viewBox="0 0 26 28"
            width="15"
            height="15"
            className="hotspot"
            style={{ left: `${props.left}% ` }}
            onClick={() => props.onClick(props.left)}>
            <title>star</title>
            <path d="M26 10.109c0 0.281-0.203 0.547-0.406 0.75l-5.672 5.531 1.344 7.812c0.016 0.109 0.016 0.203 0.016 0.313 0 0.406-0.187 0.781-0.641 0.781-0.219 0-0.438-0.078-0.625-0.187l-7.016-3.687-7.016 3.687c-0.203 0.109-0.406 0.187-0.625 0.187-0.453 0-0.656-0.375-0.656-0.781 0-0.109 0.016-0.203 0.031-0.313l1.344-7.812-5.688-5.531c-0.187-0.203-0.391-0.469-0.391-0.75 0-0.469 0.484-0.656 0.875-0.719l7.844-1.141 3.516-7.109c0.141-0.297 0.406-0.641 0.766-0.641s0.625 0.344 0.766 0.641l3.516 7.109 7.844 1.141c0.375 0.063 0.875 0.25 0.875 0.719z"></path>
        </svg>
    )
}
class Video extends Component {
    constructor(props) {
        super(props);
        this.vid = null;
        this.canvas = null;
        this.ssContainer = null;
        this.state = {
            duration: 0,
            progress: 0,
            videoWidth: 0,
            videoHeight: 0
        }
    }

    onLoadedMetadata = () => {
        this.setState({
            duration: this.vid.duration,
            videoWidth: this.vid.videoWidth,
            videoHeight: this.vid.videoHeight,
        })
    }

    onTimeUpdate = () => {
        const { duration } = this.state;
        const progress = ((this.vid.currentTime) / duration) * 100;
        this.setState({
            progress
        })
    }

    grabScreenshot = () => {
        let ctx = this.canvas.getContext("2d");
        ctx.drawImage(this.vid, 0, 0, this.vid.videoWidth, this.vid.videoHeight);
        var img = new Image();
        img.src = this.canvas.toDataURL("image/png");
        img.width = this.vid.videoWidth;
        this.ssContainer.appendChild(img);
    }

    onHotspotClick = (percent) => {
        const currentTime = this.state.duration * (percent / 100)
        this.vid.currentTime = currentTime;
    }


    render() {
        const { props } = this
        return (
            <div className="appChild">
                <video
                    controls
                    ref={(el => this.vid = el)}
                    onSeeked={this.grabScreenshot}
                    onLoadedMetadata={this.onLoadedMetadata}
                    onTimeUpdate={this.onTimeUpdate}
                >
                    <source src={props.src} type={props.type} />
                    Your browser does not support the video tag.
                </video>

                <div className="storyLine">
                    <span className="progressColor" style={{ width: `${this.state.progress}%` }}></span>
                    <span className="progress" style={{ left: `${this.state.progress}%` }}></span>
                    <Hospot left={10} onClick={(n) => this.onHotspotClick(n)} />
                    <Hospot left={30} onClick={(n) => this.onHotspotClick(n)} />
                    <Hospot left={50} onClick={(n) => this.onHotspotClick(n)} />
                    <Hospot left={70} onClick={(n) => this.onHotspotClick(n)} />
                    <Hospot left={90} onClick={(n) => this.onHotspotClick(n)} />
                </div>

                <canvas
                    width="1120"
                    height="720"
                    ref={(el => this.canvas = el)}
                    className="canvas"
                >
                </canvas>
                <div ref={el => this.ssContainer = el}></div>
            </div>
        )
    }
}
export default Video