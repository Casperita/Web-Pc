import React, { Component, createContext, useContext, useReducer } from 'react';
import { auth, /*generateUserDocument */} from './firebase';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const UserContext = createContext({ user: null });

export const EditContext = createContext({ openEdit: false });

export const CuponContext = createContext({ cuponDiscount: null })

/*class UserProvider extends Component {
    state = {
        user: null
    };

    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
            const user = await generateUserDocument(userAuth);
            this.setState({ user });
        });
    };

    render() {

        const { user } = this.state;

        return (
            <UserContext.Provider value={user}> 
                {this.props.children}
            </UserContext.Provider>
        );
    }
}*/

//export default UserProvider;
export const useStateValue = () => useContext(StateContext);