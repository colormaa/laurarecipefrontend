import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers/index';
import {loadState, saveState} from './localStorage';
import thunk from 'redux-thunk';
import throttle from 'lodash.throttle';
const middleware = [thunk];

const initialState = {};

const persistedState = loadState();

const store =  createStore(rootReducer, 
    persistedState, 
    compose(applyMiddleware(...middleware), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    );
store.subscribe(
    throttle(
        ()=>{
            saveState(store.getState())
        }
        , 1000)
    );

export default store;