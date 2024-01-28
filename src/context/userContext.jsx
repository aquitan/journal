import { createContext, useState } from 'react';

export const UserContext = createContext({
	userId: 1
});


export const UserContextProvider = ({children}) => {
	const [user, setUser] = useState(1);

	return(
		<UserContext.Provider value={{ user, setUser}}>
			{children}
		</UserContext.Provider>
	);
};