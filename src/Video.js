import React, { Component } from 'react'

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

    grabScreenshot = () => {
        let ctx = this.canvas.getContext("2d");
        ctx.drawImage(this.vid, 0, 0, this.vid.videoWidth, this.vid.videoHeight);
        var img = new Image();
        img.src = this.canvas.toDataURL("image/png");
        img.width = this.vid.videoWidth;
        this.ssContainer.appendChild(img);
    }


    render() {
        const { props } = this
        return (
            <div className="appChild">
                <video
                    controls
                    ref={(el => this.vid = el)}
                    onSeeked={this.grabScreenshot}
                >
                    <source src={props.src} type={props.type} />
                    Your browser does not support the video tag.
                </video>

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