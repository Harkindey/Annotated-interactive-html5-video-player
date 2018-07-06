import React, { Component } from 'react'

class Video extends Component {
    render() {
        return (
            <div className="appChild">
                <video
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