import styles from './Button.module.css';
import classNames from 'classnames/bind';

const Button = ({children, transparrent, ...attrs}) => {
	const cx = classNames.bind(styles);

	return(
		<button {...attrs} className={cx(styles.button, {[styles.transparrent]: transparrent})}>{children}</button>
	);
};

export default Button;