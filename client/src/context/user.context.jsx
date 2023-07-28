import React, { createContext, useState } from 'react';

export const UserContext = createContext({
	setCurrentUserToken: () => null,
	currentUserToken: null,
});

export function UserProvider({ children }) {
	const [currentUserToken, setCurrentUserToken] =
		useState(null);
	const value = { currentUserToken, setCurrentUserToken };
	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
}
// export const USER_ACTION_TYPES = {
//   SET_CURRENT_
// }
// const userReducer = (state, action) => {
// 	const { type, payload } = action;
// 	switch (type) {
// 		case 'SET_CURRENT_USER':
// 			return {
// 				...state,
// 				currentUser: payload,
// 			};
// 		default:
// 			throw new Error(``);
// 	}
// };
