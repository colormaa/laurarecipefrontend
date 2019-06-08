import * as types from '../actions/actionType';
import isEmpty from '../isEmpty';
const initializedState= {
    isAuthenticated: false,
    user: {}
}
export default function(state = initializedState, action){
    switch(action.type)
    {
        case types.SET_CURRENT_USER: 
        return{
            ...state, 
            isAuthenticated: !isEmpty(action.payload),
            user: action.payload
        }
        default: return state
    }
}