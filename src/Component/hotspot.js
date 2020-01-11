import React from 'react';

export const Hotspot = props => {
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
				<path d="M26 10.109c0 0.281-0.203 0.547-0.406 0.75l-5.672 5.531 1.344 7.812c0.016 0.109 0.016 0.203 0.016 0.313 0 0.406-0.187 0.781-0.641 0.781-0.219 0-0.438-0.078-0.625-0.187l-7.016-3.687-7.016 3.687c-0.203 0.109-0.406 0.187-0.625 0.187-0.453 0-0.656-0.375-0.656-0.781 0-0.109 0.016-0.203 0.031-0.313l1.344-7.812-5.688-5.531c-0.187-0.203-0.391-0.469-0.391-0.75 0-0.469 0.484-0.656 0.875-0.719l7.844-1.141 3.516-7.109c0.141-0.297 0.406-0.641 0.766-0.641s0.625 0.344 0.766 0.641l3.516 7.109 7.844 1.141c0.375 0.063 0.875 0.25 0.875 0.719z" />
			</svg>
		</a>
	);
};
