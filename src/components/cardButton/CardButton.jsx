import styles from './CardButton.module.css';
import classNames from 'classnames';

const CardButton = ({ children, add, ...attrs }) => {
	const cx = classNames.bind(styles);
	const cls = cx(styles.item, { [styles.add]: add });

	//ну или так - cls = styles.item + (className ? ' ' + styles.add : '')

	return (
		<button {...attrs} className={cls}>
			{children}
		</button>
	);
};

export default CardButton;