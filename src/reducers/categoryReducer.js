import * as types from '../actions/actionType';
import isEmpty from '../isEmpty';
const initializedState= {
    categories: []
}
export default function(state = initializedState, action){
    switch(action.type)
    {
        case types.GET_CATEGORIES: {
            console.log("cateogry redux", action.payload);
        return{
            ...state, 
            categories: action.payload
        }
    }   
        default: return state
    }
}