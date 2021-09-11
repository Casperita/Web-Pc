export const initialState = {
    user: null,
    inputText: '',
    userIdChat: '',
    cuponDiscount: null,
    openEdit: false
};

const reducer = (state, action) => {
    console.log(action);

    switch(action.type) {
        
        case 'UPDATE_INPUT':
            return{
                ...state,
                inputText: action.data
            }

        case 'UPDATE_CHAT':
            return{
                ...state,
                userIdChat: action.data
            }

        case 'UPDATE_EDIT':
            return{
                ...state,
                openEdit: action.data
            }

        case 'SET_CUPON':
            return{
                ...state,
                cuponDiscount: action.data
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        default:
            return initialState;
    }
};

export default reducer;