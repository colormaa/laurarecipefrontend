import * as types from './actionType';
import axios from 'axios';
import { setTimeout } from 'timers';
const link = "https://laurarecipebackend.herokuapp.com";
function mytimeout (item){
    return new Promise(resolve =>{
        axios.get(`${link}/api/recipes/parse/number/${item}`)
        .then(res=>{
            console.log("res ", res);
            resolve(item);
        })
        .catch(err=>{
            console.log("err ", err);
            resolve(item);
        })
    });
    
}
function mytitleparse(item, title){
    return new Promise(resolve=>{
        axios.get(`${link}/api/recipes/parse/titlenum/?number=${item}&title=${title}`)
        .then(res=>{
            
            resolve(item);
        })
        .catch(err=>{
            resolve(item);
        })
    })
}
export const dispatchRecipe =(item)=>{
    console.log("dispatch recipe ", item);
    return{
        type: types.PARSE_INCREASED_ARRAY, 
        payload: item
    }
}   
async function arrayTitle(arr, title){
    console.log("array title ", arr, title)
    const val = await mytitleparse(arr, title);
    return val;
}
async function array(arr){
    const val = await mytimeout(arr);
    return val;
}
export const parseTitle =(title)=>dispatch=>{
    /*dispatch({
        type: types.PARSE_ALL, 
        payload: res.data.data
    });
    */
    axios.get(`${link}/api/recipes/parse/titles/${title}`)
    .then(async res=>{
        
        dispatch({
            type: types.PARSE_ALL, 
            payload: res.data.data
        });
        for(const item of res.data.data){
           const val = await arrayTitle(item, title);
           console.log(" value in for ", val);
           dispatch(dispatchRecipe(val));
        }
    })
    .catch(err=>{
        console.log("titles error ", err);
    })
}
export const startParseAll=()=>dispatch=>{
    console.log("start parse all");
    axios.get(`${link}/api/recipes/parse/recipefull`)
    .then(async res=>{
        console.log("array parsed" );
        dispatch({
            type: types.PARSE_ALL, 
            payload: res.data.data
        });
        for(const item of res.data.data){
           const val = await array(item);
           console.log(" value in for ", val);
           dispatch(dispatchRecipe(val));
        }
        
    })
    .catch(err=>{
        console.log("Error", err);
    })
}
