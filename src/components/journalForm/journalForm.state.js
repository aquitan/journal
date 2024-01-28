export const INITIAL_STATE = {
	isValid: {
		title: true,
		date: true,
		post: true
	},
	values: {
		title: '',
		date: '',
		post: '',
		tag: '',
		userId: 1
	},
	isReadyToSubmit: false
};

export const formReducer = (state, action) => {
	switch(action.type) {
	case 'RESET_VALIDITY':
		return {...state, isValid: INITIAL_STATE.isValid};
	case 'SUBMIT': {
		const titlePayload = state.values.title?.trim().length;
		const postPayload = state.values.post?.trim().length;
		const datePayload = state.values.date;

		return {
			...state,
			isValid: {
				title: titlePayload,
				date: datePayload,
				post: postPayload
			},
			isReadyToSubmit: titlePayload && postPayload && datePayload
			
		};
	}
	case 'SET_VALUES':
		return { ...state, values: { ...state.values, ...action.payload }};
	case 'CLEAR': 
		return {
			values: INITIAL_STATE.values,
			isValid: INITIAL_STATE.isValid,
			isReadyToSubmit: false
		};		
	default:
		return state;
	}
};