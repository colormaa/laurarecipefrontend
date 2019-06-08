import React from 'react';
import {withRouter} from 'react-router-dom';
import {getRecipeAll, getRecipeCategory} from '../actions/recipeActions';
import {connect} from 'react-redux';
import isEmpty from '../isEmpty';
class Pagination extends React.Component{
    itemSelected =(item)=>{
        if(isEmpty(this.props.recipe.category)){
            this.props.getRecipeAll(item, 20, this.props.recipe.search)
        }else{
            this.props.getRecipeCategory(this.props.recipe.category, item)
        }
        
    }
    render(){
        const total = this.props.total;
        const page = this.props.page;
        const count =Math.ceil(total/20);
        const array =[];
        for(var i = 1; i<=count; i++){
            array.push(i);
            //console.log("arr ", i);
        }
        return(
            <div className="pagination">
                <div className="pagination__container">
                    <div className="pagination__item__start" onClick = {()=>this.itemSelected(page-1)}><i className="fas fa-backward"></i></div>
                    <div className = "pagination__inner">
                        {array.map(arr =>{
                            return(
                                <div onClick = {()=> this.itemSelected(arr)} key = {arr} className={["pagination__item",  arr === page ? "pagination__item__active" :  arr === page+1 || arr === page+2 || arr === page+3 || arr === page-1 || arr === page-2 || arr === page-3? 'pagination__item__sibling': ''].join(' ')}>{arr}</div>
                            );
                        })}
                        
                    </div>
                    <div className="pagination__item__end" onClick = {()=>this.itemSelected(page+1)}><i className="fas fa-forward"></i></div>
                    
                </div>
            </div>
        );
    }
}
const mapStateToProps =(state)=>({
    recipe: state.recipe
})
export default connect(mapStateToProps, {getRecipeAll, getRecipeCategory})(withRouter(Pagination));