import { useContext } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import styles from './Select.module.css';

const Select = ({...attrs}) => {
	const {user, setUser} = useContext(UserContext);

	const values = [
		{title: 'Вася', value: 1},
		{title: 'Петя', value: 2}
	];

	const changeUser = (e) => {
		setUser(Number(e.target.value));
	};

	return(
		<select className={styles.select} onChange={changeUser} value={user} {...attrs}>
			{values.map(value => (
				<option key={value.value} value={value.value}>{value.title}</option>
			))}
		</select>
	);
};

export default Select;