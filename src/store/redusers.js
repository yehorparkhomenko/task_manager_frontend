
export const initialState = {
	developerName: "Yehor",
	username: "",
	token: "",
}

export const rootReducer = (state = initialState, action) => {
    switch(action.type) {
		case "CHANGE_DEVELOPER_NAME":
			return {
				...state,
				developerName: action.developerName
			}     
		
		case "CHANGE_USERNAME":
			return {
				...state,
				username: action.username
			}
	
		case "CHANGE_TOKEN":
			return {
				...state,
				token: action.token
			}
		
		default:
			return state;
    }
}

