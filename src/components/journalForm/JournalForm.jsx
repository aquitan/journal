import styles from './JournalForm.module.css';
import Button from '../button/Button';
import { useContext, useEffect, useReducer, useRef } from 'react';
import Input from '../input/Input';
import Textarea from '../textarea/Textarea';
import { INITIAL_STATE, formReducer } from './journalForm.state';
import { UserContext } from '../../context/userContext';


const JournalForm = ({ onSubmit, pickedItem, onDelete }) => {	
	const { user } = useContext(UserContext);
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const titleRef = useRef();
	const dateRef = useRef();
	const postRef = useRef();

	const { isValid, values, isReadyToSubmit } = formState;

	const focusValid = (isValid) => {
		switch(true) {
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.post:
			postRef.current.focus();
			break;
		}
	};
	

	useEffect(() => {
		if (!pickedItem) {
			dispatchForm({ type: 'CLEAR' });
			dispatchForm({ type: 'SET_VALUES', payload: { userId: user } });
		}
		dispatchForm({ type: 'SET_VALUES', payload: pickedItem });
	}, [pickedItem]);


	useEffect(() => {
		let timeId;
		if (!isValid.date || !isValid.post || !isValid.title) {

			focusValid(isValid);

			timeId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => { clearTimeout(timeId); };
	}, [isValid]);

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUES', payload: { userId: user } });
	}, [user]);

	useEffect(() => { 
		if (isReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
			dispatchForm({ type: 'SET_VALUES', payload: { userId: user } });
		}
	}, [isReadyToSubmit, values, onSubmit, user]);

	const onJournalAdd = (e) => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT'});
	};

	const onInputChange = (e) => {
		dispatchForm({ type: 'SET_VALUES', payload: {[e.target.name]: e.target.value}});
	};

	const onDeleteItem = () => {
		onDelete(values.id);
		dispatchForm({ type: 'CLEAR' });
		dispatchForm({ type: 'SET_VALUES', payload: { userId: user } });
	};
	
	return (
		<form className={styles.form} onSubmit={onJournalAdd}>
			<div className={styles.heading}>
				<Input onChange={onInputChange} ref={titleRef} value={values.title} name={'title'} type={'text'} error={!isValid.title} cls={'title'} placeholder={'Введите заголовок'} />
				{
					pickedItem ?
						<Button type='button' transparrent onClick={onDeleteItem}>
							<img src="/delete.svg" alt="Удалить" />
						</Button>
						: null
				}
			</div>
			<Input onChange={onInputChange} ref={dateRef} value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''} name={'date'} type={'date'} error={!isValid.date} wrapped placeholder={'Введите дату'}>
				<img src="/date.svg" alt="Дата" />
				Дата
			</Input>
			<Input onChange={onInputChange} value={values.tag} name={'tag'} type={'text'} wrapped placeholder={'Укажите метку'}>
				<img src="/tags.svg" alt="Тэг" />
				Метки
			</Input>

			<Textarea onChange={onInputChange} ref={postRef} value={values.post} name={'post'} error={!isValid.post} placeholder={'Введите текст'} />
			<Button>{'Сохранить'}</Button>
		</form>
	);
};

export default JournalForm;