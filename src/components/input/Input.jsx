import { forwardRef } from 'react';
import styles from './Input.module.css';
import classNames from 'classnames/bind';

const Input = forwardRef(function Input({ name, type, placeholder, cls, wrapped, children, error, value, onChange }, ref) {

	const cx = classNames.bind(styles);
	const classes = cx('input', cls);

	return (
		<div className={cx({ ['input-wrap']: wrapped, 'error': error })}>
			{wrapped && <label htmlFor={name}>
				{children}
			</label>}
			<input ref={ref} onChange={onChange} value={value} placeholder={placeholder} className={classes} id={name} type={type} name={name} />
		</div>
	);
});

export default Input;