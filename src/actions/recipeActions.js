import * as types from './actionType';
import axios from 'axios';
const link = "https://laurarecipebackend.herokuapp.com";
export const getRecipeAll=(page, limit, search)=>dispatch=>{
    dispatch({
        type: types.SET_RECIPE_LOADING, 
        payload: true
    })
    axios.get(`${link}/api/recipes/all?page=${page}&limit=${limit}&search=${search}`)
    .then(re=>{
        console.log("Recipe count", re);
        dispatch({
            type: types.GET_RECIPES, 
            payload: {recipe: re.data.data.recipes, count: re.data.data.count, page: page}
        });
        dispatch({
            type: types.SET_CATEGORY, 
            payload: ''
        })
        dispatch({
            type: types.SET_RECIPE_LOADING, 
            payload: false
        })
        dispatch({
            type: types.SET_SEARCH, 
            payload: search
        })
        
    })
    .catch(err=>{
        if(err.response.status === 400){
            dispatch({
                type: types.GET_ERRORS, 
                payload: err.response.data.err
            });
        }
        console.log("err ", err.response);
    })
}

export const getRecipeCategory =(category, page)=>dispatch=>{
    dispatch({
        type: types.SET_RECIPE_LOADING, 
        payload: true
    })
    axios.get(`${link}/api/recipes/getByCategory?category=${category}&page=${page}`)
    .then(re=>{
        console.log("re category ", re);
        dispatch({
            type: types.GET_RECIPES, 
            payload: {recipe: re.data.data.recipes, count: re.data.data.count, page: page}
        });
        dispatch({
            type: types.SET_CATEGORY, 
            payload: category
        })
        dispatch({
            type: types.SET_RECIPE_LOADING, 
            payload: false
        })
        dispatch({
            type: types.SET_SEARCH, 
            payload: ''
        })
    })
    .catch(err=>{
        console.log("err ", err);
    })
}
export const setCategory =(category)=>dispatch=>{
    dispatch({
        type: types.SET_CATEGORY, 
        payload: category
    })
}
export const getRecipePopular =()=>dispatch=>{
    axios.get(`${link}/api/recipes/popular`)
    .then(re=>{
        console.log("popular recipe", re);
        dispatch({
            type: types.GET_RECIPES_POPULAR, 
            payload: re.data.data
        })
    })
    .catch(err=>{
        console.log("err recipe popular", err);
    })
}
export const selectRecipe =(id)=>dispatch=>{
    axios.get(`${link}/api/recipes/item/${id}`)
    .then(re=>{
        console.log("re selected ", re);
    })
    .catch(err=>{
        console.log("catch err ", err);
    })
}

export const addRecipe =(recipe)=>dispatch=>{
    axios.post(`${link}/api/recipes/add`, recipe)
    .then(re=>{
        //console.log(" recipe insert ", re);
        dispatch({
            type: types.ADD_RECIPE, 
            payload: re.data.data
        });
    })
    .catch(err=>{
        if(err.response.status === 400){
            dispatch({
                type: types.GET_ERRORS, 
                payload: err.response.data.err
            });
        }
        console.log("err add recipe ", err.response);
    })
}
export const updateRecipe =(recipe)=>dispatch=>{
    axios.post(`${link}/api/recipes/update`, recipe)
    .then(re=>{
        //console.log(" recipe insert ", re);
        dispatch({
            type: types.UPDATE_RECIPE, 
            payload: re.data.data
        });
    })
    .catch(err=>{
        if(err.response.status === 400){
            dispatch({
                type: types.GET_ERRORS, 
                payload: err.response.data.err
            });
        }
        console.log("err add recipe ", err.response);
    })
}
export const deleteRecipe =(id)=>dispatch=>{
    axios.get(`${link}/api/recipes/delete/${id}`)
    .then(re=>{
        //console.log(" recipe insert ", re);
        dispatch({
            type: types.DELETE_RECIPE, 
            payload: id
        });
    })
    .catch(err=>{
        if(err.response.status === 400){
            dispatch({
                type: types.GET_ERRORS, 
                payload: err.response.data
            });
        }
        console.log("err add recipe ", err);
    })
}