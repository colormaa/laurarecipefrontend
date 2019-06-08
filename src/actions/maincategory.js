import axios from 'axios';
import * as types from './actionType';
export const getMainCategoryAll =()=>dispatch=>{
    axios.get('/api/maincategories/all')
    .then(res=>{
        console.log("main category all ", res.data.data);
        dispatch({type: types.GET_MAINCATEGORIES, 
            payload: res.data.data
        });
        console.log("console.log   ");  
    })
    .catch(err=>{
        console.log("err ", err);
        console.log("res error all cat ", err.response);
       /*
        if(err.response.status === 400){
            dispatch({type: types.GET_ERRORS, 
                payload: err.response.data
            });
       }*/
        /*
        if(err.response.status === 500){
            dispatch({type: types.GET_ERRORS, 
                payload: err.response.statusText
            });
        }*/
    });
}
export const addMainCategory =(cats)=>dispatch=>{
    axios.post('/api/maincategories/add', cats)
    .then(res=>{
        console.log("res main category", res);
        dispatch({type: types.GET_MAINCATEGORIES, 
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
        //console.log("err ", err.response.data);
    })
}
export const updateMainCategory =(cats)=>dispatch=>{
    axios.post('/api/maincategories/update', cats)
    .then(res=>{
        console.log("res main category", res);
        dispatch({type: types.GET_MAINCATEGORIES, 
            payload: res.data.data});
        dispatch({type: types.GET_ERRORS, 
                payload: null
            });
    })
    .catch(err=>{
        console.log("err. ", err.response);
        if(err.response && err.response.status === 400){
            dispatch({type: types.GET_ERRORS, 
                payload: err.response.data
            });
        }
        //console.log("err ", err.response.data);
    })
}
export const deleteMainCategory=(catid)=>dispatch=>{
    axios.delete(`/api/maincategories/delete/${catid}`)
    .then(res=>{
        //console.log("res", res);
        dispatch({type: types.GET_MAINCATEGORIES, 
            payload: res.data.data});
        dispatch({type: types.GET_ERRORS, 
            payload: null
        });
    })
    .catch(err=>{
        console.log("err ", err.response);
        if(err.response && err.response.status === 400){
            dispatch({type: types.GET_ERRORS, 
                payload: err.response.data
            });
        }
    });
}