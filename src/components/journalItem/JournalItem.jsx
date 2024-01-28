import styles from './JournalItem.module.css';

const JournalItem = ({title, post, date}) => {

	const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);

	return(
		<>
			<h2 className={styles.title}>{title}</h2>
			<div className={styles.info}>
				<div className={styles.date}>
					{formatedDate}
				</div>
				<div className={styles.post}>
					{post}
				</div>
			</div>
		</>
	);
};

export default JournalItem;