import {combineReducers} from 'redux';
import errorReducers from './errorReducer';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import mainCategoryReducer from './mainCategoryReducer';
import recipeReducer from './recipeReducer';
import parseReducer from './parseReducer';
export default combineReducers({
    auth: authReducer, 
    errors: errorReducers, 
    category: categoryReducer, 
    maincategory: mainCategoryReducer, 
    recipe: recipeReducer, 
    parse: parseReducer
})