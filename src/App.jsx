import './App.css';
import Header from './components/header/Header';
import JournalAddBtn from './components/journalAddBtn/JournalAddBtn';
import JournalForm from './components/journalForm/JournalForm';
import JournalList from './components/journalList/JournalList';
import Body from './layouts/body/Body';
import LeftPanel from './layouts/leftPanel/LeftPanel';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UserContextProvider } from './context/userContext.jsx';
import Select from './components/select/Select';
import { useState } from 'react';


const mapItems = (items) => {
	if (!items) {
		return [];
	}
	return items.map(i => ({
		...i, date: i.date = new Date(i.date)
	}));
};

function App() {
	const [items, setItems] = useLocalStorage('data');
	const [pickedItem, setPickedItem] = useState(null);
	

	const addNewItem = (item) => {
		

		if (!item.id) {
			setItems([...mapItems(items),
				{
					...item,
					id: items?.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
				}]
			);
		} else {
			setItems([...mapItems(items).map(i => {
				if (i.id === item.id) {
					return {...item};
				}
				return i;
			})]);
		}
	};

	const setItem = (item) => {
		setPickedItem(item);
	};

	const onDelete = (id) => {
		setItems([...items.filter(el => el.id !== id)]);
	};

	

	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Select />
					<Header />
					<JournalAddBtn setNewItem={() => setPickedItem(null)} />
					<JournalList setItem={setItem} items={mapItems(items)} />
				</LeftPanel>
				<Body>
					<JournalForm pickedItem={pickedItem} onSubmit={addNewItem} onDelete={onDelete} />
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
