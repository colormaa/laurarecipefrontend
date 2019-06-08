import * as types from './actionType';
import axios from 'axios';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
const link = "https://laurarecipebackend.herokuapp.com";
export const loginUser =(userData, history)=>dispatch=>{
    axios.post(`${link}/api/users/login`, userData)
    .then(res=>{
        console.log("res data register", res);
            localStorage.setItem('jwtToken', res.data.token);
            setAuthToken(res.data.token );
            const decoded = jwt_decode(res.data.token);
            dispatch(setCurrentUser(decoded));
            history.push('/');
    })
    .catch(err=>{
        if(err.response){
            dispatch({
                type: types.GET_ERRORS, 
                payload: err.response.data.err
            })
        }
        
    })
}
export const logoutUser =()=>dispatch=>{
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}
export const registerUser=(userData, history)=>dispatch=>{
    console.log('dispatch register user', userData);
    
    axios.post(`${link}/api/users/register`, userData)
        .then(res=>{
            console.log("res data register", res);
            localStorage.setItem('jwtToken', res.data.token);
            setAuthToken(res.data.token );
            const decoded = jwt_decode(res.data.token);
            dispatch(setCurrentUser(decoded));
            /*this.setState({errors: {}, 
            username: '', 
            email: '', 
            password: ''
        })*/
        history.push('/');
        })
        .catch(err=>{
            console.log("err ", err.response.data);
            if(err.response){
                dispatch({
                    type: types.GET_ERRORS, 
                    payload: err.response.data.err
                })
            }
           // this.setState({errors: err.response.data.err});
            
        })
    /*{
        type: types.SET_CURRENT_USER, 
        payload: userData
    }*/
}
export const setCurrentUser=(decoded)=>{
    return{
        type: types.SET_CURRENT_USER, 
        payload: decoded
    }
}
/** 
 axios.post('/api/users/login', login)
        .then(res=>{
            console.log(res.data);
            this.setState({errors: {}, 
            email: '', 
            password: ''});
        })
        .catch(err=>{
            this.setState({errors: err.response.data.err});
            console.log("err ", err.response.data.err);
            console.log("this.state ", this.state);
        })
 * */