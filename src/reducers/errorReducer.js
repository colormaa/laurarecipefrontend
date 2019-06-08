import * as types from '../actions/actionType';
import {registerUser} from '../actions/authActions';
const initializedState= {}
export default function(state = initializedState, action){
    switch(action.type)
    {
        case types.GET_ERRORS: 
        return action.payload;
        default: return state
    }
}