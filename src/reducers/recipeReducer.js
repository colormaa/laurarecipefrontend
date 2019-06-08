import * as types from '../actions/actionType';
import isEmpty from '../isEmpty';
const initializedState= {
    recipes: [], 
    page: 1, 
    total: 0, 
    search: '', 
    popularrecipe: [], 
    category: '', 
    loading: false
}
export default function(state = initializedState, action){
    switch(action.type)
    {
        case types.GET_RECIPES: {
            console.log("cateogry redux", action.payload);
        return{
            ...state, 
            recipes: action.payload.recipe, 
            total: action.payload.count, 
            page: action.payload.page
        }
    }
        case types.GET_RECIPES_POPULAR: {
            return{
                ...state, 
                popularrecipe: action.payload
            }
        }   
        case types.SET_CATEGORY: {
            return{
                ...state, 
                category: action.payload
            }
        } 
        case types.SET_SEARCH: {
            return{
                ...state, 
                search: action.payload
            }
        }
        case types.DELETE_RECIPE:{
            const drecipe = state.recipes.filter(rec=>rec._id !== action.payload);
            return{
                ...state, 
                recipes: drecipe
            }
        }
        case types.UPDATE_RECIPE:{
            const drecipe = state.recipes.map(rec=>{
                if(rec._id === action.payload._id){
                    return(action.payload);
                }else{
                    return rec
                }
            });
            return {
                ...state, 
                recipes: drecipe
            }
        }
        case types.ADD_RECIPE:{
            const adrecipe = action.payload;
            console.log("addr ecipe", adrecipe);
            return{
                ...state, 
                recipes: [
                    ...state.recipes, 
                    adrecipe
                ]
            }
        }
        case types.SET_RECIPE_LOADING:{
            console.log("set recipe loading ", action.payload)
            return{
                ...state, 
                loading: action.payload
            }
        }
        default: return state
    }
}