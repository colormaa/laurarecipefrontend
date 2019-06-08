import * as types from '../actions/actionType';
import isEmpty from '../isEmpty';
const initializedState= {
    maincategories: []
}
export default function(state = initializedState, action){
    switch(action.type)
    {
        case types.GET_MAINCATEGORIES: {
            console.log("cateogry redux", action.payload);
        return{
            ...state, 
            maincategories: action.payload
        }
    }   
        default: return state
    }
}