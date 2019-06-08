import React from 'react';
import {connect} from 'react-redux';
import Product from './Product';
import {getRecipeAll, selectRecipe, getRecipePopular, getRecipeCategory} from '../../actions/recipeActions';
import Pagination from '../Pagination';
import isEmpty from '../../isEmpty';
import {withRouter} from 'react-router-dom';
//import axios from 'axios';
class ProductContainer extends React.Component{
    state ={
       
    }
    componentDidMount(){
        console.log("this.props.recipe ", this.props.recipe.category);
        //if(isEmpty(this.props.recipe.category)){
            this.props.getRecipeAll(this.props.recipe.page, 20, this.props.recipe.search);
            this.props.getRecipePopular();

        //}else{
           // this.props.getRecipeCategory(this.props.recipe.category, this.props.recipe.page);
        //}
    }
    selectRecipe=(id)=>{
        //this.props.selectRecipe(id);
        this.props.history.push(`/product/${id}`);

    }
    render(){
        
        
        //https://scotch.io/tutorials/build-custom-pagination-with-react
        return(
            this.props.recipe.loading=== false ? this.props.recipe.recipes.length === 0 ?

            <div className="productpage">No product found</div> :
        <div className="productpage">
            
            <div className = "productcontainer">
                
                
                {this.props.recipe.recipes.map(prod =>{
                 return(
                     <Product seen = {prod.seen} key = {prod._id} onClick = {()=> this.selectRecipe(prod._id)}
                      title = {prod.title} serves = {prod.serves} image = {prod.image} />
                 );
            })}
                
            </div>
            <div className="mypagination">
                 <Pagination  total = {this.props.recipe.total} page = {this.props.recipe.page}/>
            </div>
            
        </div>
            : <div className="loadingcontainer"><div className="lds-facebook"><div></div><div></div><div></div></div></div>
        );
    }
}
const mapStateToProps =(state)=>({
    recipe: state.recipe, 
    category: state.category
})
export default connect(mapStateToProps, {getRecipeAll, selectRecipe, getRecipeCategory, getRecipePopular})(withRouter(ProductContainer));