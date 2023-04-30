import React, { useEffect, useState } from 'react';
// import './inputField.styles.scss';
import { useField } from 'formik';
import downArrow from './downArrow.svg';
// export function InputField({
// 	name,
// 	type,
// 	className,
// 	placeholder,
// 	img,
// 	label,
// }) {
// 	const [field, meta] = useField(name);
// 	const [error, setError] = useState(null);
// 	useEffect(() => {
// 		setError(meta.error);
// 	}, [meta.error, meta.touched]);
// 	return (
// 		<div className='inputBoundary'>
// 			<div className={img && 'inputImg'}>
// 				{img && <img src={img} alt='' />}
// 				{label && <label htmlFor='name'>{label}</label>}
// 				<input
// 					{...field}
// 					type={type}
// 					className={` ${className} ${error && 'error'} `}
// 					placeholder={placeholder}
// 					name={name}
// 				/>
// 			</div>
// 			{error && <p>{error}</p>}
// 		</div>
// 	);
// }

export function TextField({
	name,
	type,
	className,
	placeholder,
	img,
	label,
}) {
	const [field, meta] = useField(name);
	const [error, setError] = useState(null);
	useEffect(() => {
		setError(meta.error);
	}, [meta.error, meta.touched]);
	return (
		<div className='input__wrapper'>
			<div className='input__holder'>
				{img && <img src={img} alt='' />}
				{label && <label htmlFor='name'>{label}</label>}
				<textarea
					{...field}
					type={type}
					autoComplete='on'
					className={` input ${error && 'error'} `}
					placeholder={placeholder}
					name={name}
				/>
			</div>
			{error && <p>{error}</p>}
		</div>
	);
}

export function InputField({
	name,
	placeholder,
	img,
	type,
}) {
	const [field, meta] = useField(name);
	const [error, setError] = useState(null);
	useEffect(() => {
		setError(meta.error);
	}, [meta.error, meta.touched]);
	return (
		<div className='input__wrapper'>
			<div className='input__holder'>
				{img && <img src={img} alt='' />}
				<input
					{...field}
					className='input'
					placeholder={placeholder}
					type={type}
				/>
			</div>
			{error && <p>{error}</p>}
		</div>
	);
}

export function Select({ options, onChange, img }) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] =
		useState(null);

	function handleOptionClick(option) {
		setSelectedOption(option);
		setIsOpen(false);
		if (onChange) {
			console.log(option.value);
			onChange(option.value);
		}
	}

	return (
		<div className='select'>
			<img src={img} alt='' className='ticket' />
			<img src={downArrow} alt='' className='downArrow' />
			<div
				className='select-header'
				onClick={() => setIsOpen(!isOpen)}>
				<div className='select__value'>
					{selectedOption
						? selectedOption.label
						: 'Select an option'}
				</div>
			</div>
			{isOpen && (
				<div className='select__options'>
					{options.map((option) => (
						<div
							key={option.value}
							className={`select__option ${
								selectedOption &&
								selectedOption.value === option.value
									? 'selected'
									: ''
							}`}
							onClick={() => handleOptionClick(option)}>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
