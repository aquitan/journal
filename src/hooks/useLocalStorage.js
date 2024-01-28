import { useEffect, useState } from 'react';

export const useLocalStorage = (key) => {
	const [data, setData] = useState();

	useEffect(() => {
		if (localStorage.getItem(key)) {
			const res = JSON.parse(localStorage.getItem(key));
			setData(res);
		} else {
			return;
		}
	}, []);

	const saveData = (newData) => {
		localStorage.setItem(key, JSON.stringify(newData));
		setData(newData);
	};

	return [data, saveData];
};