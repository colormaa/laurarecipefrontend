import * as types from '../actions/actionType';
import isEmpty from '../isEmpty';
const initializedState= {
    array: [], 
    loading: false, 
    completed: 0

}
export default function(state = initializedState, action){
    switch(action.type)
    {
        case types.PARSE_ALL: {
            return{
                ...state, 
                loading: true, 
                array: action.payload, 
                completed: 0
            }
        }
        
        case types.PARSE_INCREASED_ARRAY: {
            return{
                ...state, 
                loading: true, 
                completed: action.payload
            }
        }   
        default: return state
    }
}