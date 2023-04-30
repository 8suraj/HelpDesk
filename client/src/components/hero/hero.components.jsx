import React from 'react';
import './hero.styles.scss';
import hero from './hero.svg';
export default function Hero() {
	return (
		<div className='hero'>
			<div className='hero__container'>
				<div className='hero__text'>
					Welcome To
					<p>Helpdesk</p>
					<div className='hero__box' />
				</div>
				<div className='hero__svg'>
					<img src={hero} alt='' />
				</div>
			</div>
		</div>
	);
}
