import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import CardButton from '../cardButton/CardButton';
import JournalItem from '../journalItem/JournalItem';
import styles from './JournalList.module.css';

const JournalList = ({ items, setItem }) => {
	const {user} = useContext(UserContext);

	const sortItems = (a, b) => {
		if (a.date < b.date) return 1;
		return -1;
	};


	if (items.length === 0) return <p>Записей пока нет, добавьте новую!</p>;

	if (items.length != 0) return (
		<div className={styles.list}>
			{
				items
					.filter(el => el.userId === user)
					.sort(sortItems)
					.map(item => (
						<CardButton onClick={() => setItem(item)} key={item.id}>
							<JournalItem title={item.title} date={item.date} post={item.post} />
						</CardButton>
					))
			}
		</div>
	);
};

export default JournalList;