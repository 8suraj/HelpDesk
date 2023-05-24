import styled, { keyframes } from 'styled-components';

export const NotifcationModal = styled.div`
	position: fixed;
	top: 7%;
	right: 10%;
	width: 46rem;
	padding: 2rem;
	height: max-content;
	background: #1e222d;
	box-shadow: 6px 4px 42px -21px rgba(224, 224, 224, 0.53);
	border-radius: 14px;
	z-index: 2;

	h1 {
		margin: 3rem 0;
		text-align: center;
		font-weight: 400;
		font-size: 22px;
		line-height: 27px;
		color: #2ec4b6;
	}
`;
export const NotificationHeader = styled.div`
	display: flex;
	justify-content: space-between;
	img {
		width: 2rem;
		cursor: pointer;
	}
	h2 {
		text-align: left;
		cursor: pointer;
	}
	div {
		display: flex;
		gap: 1rem;
		align-items: center;
	}
`;
export const Notifications = styled.div`
	display: flex;
	gap: 1rem;
	font-size: 1.5rem;
	color: #b0b3b8;
	text-align: left;
	padding: 1rem 0;
	border-radius: 4px;
	cursor: pointer;
	strong {
		padding: 0.5rem;
		font-size: 1.7rem;
	}

	div {
		display: -webkit-box;
		overflow: hidden;
		font-size: 1.5rem;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		max-height: calc(
			4 * 1.2em
		); /* assuming line height of 1.2em */
		overflow: hidden;
		// white-space: nowrap;
		text-overflow: ellipsis;
	}
	&:hover {
		background-color: #3a3b3c;
		border-radius: 4px;
		cursor: pointer;
	}
`;

// .slide-out-right{animation:slide-out-right .5s cubic-bezier(.55,.085,.68,.53) both}
const slideRight = keyframes`{0%{transform:translateX(0);opacity:1;}100%{transform:translateX(1000px);opacity:0;}}`;
export const Slideright = styled.div`
	-webkit-animation: ${slideRight} 0.8s
		cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
	animation: ${slideRight} 0.8s
		cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
	// display: none;
`;
