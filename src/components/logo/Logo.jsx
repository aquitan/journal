import styles from './Logo.module.css';

const Logo = () => {
	return (
		<>
			<img className={styles.logo} src="/logo.svg" alt="Логотип Журнала" />
		</>
	);
};

export default Logo;