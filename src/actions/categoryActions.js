import axios from 'axios';
import * as types from './actionType';
export const addCategory=(cat)=>dispatch=>{
    axios.post('/api/categories/add', cat)
    .then(res=>{
        //console.log("red add categories ", res.data);
        dispatch({type: types.GET_CATEGORIES, 
        payload: res.data.data});
        dispatch({type: types.GET_ERRORS, 
            payload: null
        });
    })
    .catch(err=>{
        if(err.response.status === 400){
            dispatch({type: types.GET_ERRORS, 
                payload: err.response.data
            });
            console.log("res error add cat ", err.response);
        }
       
    })
}
export const allCategory=()=>dispatch=>{
    axios.get('/api/categories/all')
    .then(res=>{
        console.log("category all ", res.data.data);
        
        dispatch({type: types.GET_CATEGORIES, 
            payload: res.data.data
        })
        
        console.log("console.log   ");  
    })
    .catch(err=>{
        console.log("err ", err.response);
        console.log("res error all cat ", err.response);
        /*if(err.response && err.response.status === 400){
            dispatch({type: types.GET_ERRORS, 
                payload: err.response.data
            });
        }
        */
        
        
    });
}
export const deleteCategory=(catid)=>dispatch=>{
    axios.delete(`/api/categories/delete/${catid}`)
    .then(res=>{
        //console.log("res", res);
        dispatch({type: types.GET_CATEGORIES, 
            payload: res.data.data});
        dispatch({type: types.GET_ERRORS, 
            payload: null
        });
    })
    .catch(err=>{
        console.log("err ", err.response);
        if(err.response){
            dispatch({type: types.GET_ERRORS, 
                payload: err.response.data
            });
        }
        
        //console.log("res error update cat ", err.response.data);
        
    });
}
export const updateCategory=(cat)=>dispatch=>{
    axios.post('/api/categories/update', cat)
    .then(res=>{
        console.log("red update categories ", res.data);
        dispatch({type: types.GET_CATEGORIES, 
        payload: res.data.data});
        dispatch({type: types.GET_ERRORS, 
            payload: null
        });
    })
    .catch(err=>{
        if(err.response){
            dispatch({type: types.GET_ERRORS, 
                payload: err.response.data
            });
        }
        
        //console.log("res error update cat ", err.response.data);
    })
}