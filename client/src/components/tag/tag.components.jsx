import React from 'react';
import './tag.styles.scss';
export default function Tag({ text, className }) {
	return (
		<span className={`tag ${className}`}> {text}</span>
	);
}
