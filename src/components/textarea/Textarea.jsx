import { forwardRef } from 'react';
import styles from './Textarea.module.css';
import classNames from 'classnames/bind';

const Textarea = forwardRef(function Textarea({ placeholder, error, value, onChange }, ref) {

	const cx = classNames.bind(styles);
	const cls = cx('textarea', { 'error': error });

	return (
		<textarea ref={ref} value={value} onChange={onChange} className={cls} placeholder={placeholder} name="post" id="" cols="30" rows="10"></textarea>
	);
});

export default Textarea;