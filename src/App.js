import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PrivateRoute from './PrivateRoute';
import Navbar from './component/layout/Navbar';
import Footer from './component/layout/Footer';
import Landing from './component/layout/Landing';
import LoginRegister from './component/Login';
import ProductContainer from './component/customerpages/ProductContainer';
import Dashboard from './component/Dashboard';
import Category from './component/dashboard/category';
import MainCategory from './component/dashboard/maincategory';
import RecipeCategory from './component/dashboard/recipe';
import Parse from './component/dashboard/parse';
import ProductDetail from './component/customerpages/ProductDetail';
import {getRecipeCategory, setCategory} from './actions/recipeActions';
import {allCategory} from './actions/categoryActions';
import {withRouter} from 'react-router-dom';
class App extends React.Component { 
  componentDidMount(){
    this.props.allCategory();
  }
  categorySelected=(name)=>{
    console.log("category selected", name);
    this.props.setCategory(name);
    //window.location.href = "/";
    console.log("window.loation.href", window.location)
    if(window.location.pathname ==='/'){
      console.log("path /");
      this.props.getRecipeCategory(name, 1)
    }else{
    this.props.history.push('/');
    }
  }
  render(){
//console.log("category list ", this.props.category.categories)
  const AdminRoute = (
    <Dashboard>
        <Switch>
            <PrivateRoute path = "/admin/maincategory" component = {MainCategory}/>
        </Switch> 
        <Switch>
            <PrivateRoute path = "/admin/recipecategory" component = {RecipeCategory}/>
        </Switch> 
        <Switch>
            <PrivateRoute path = "/admin/parse" component = {Parse}/>
        </Switch>
        <div className="container midpage">
        <Switch>
        
          <PrivateRoute path = "/admin/category" component = {Category}/>
          </Switch>
        
        </div>
        <Switch>
          <Route path = "/" exact component = {ProductContainer}/>
          <Route path = "/product/:id" exact component = {ProductDetail}/>
        </Switch>
    </Dashboard>
  );
  const UserRoute = (
    <div className = "container ">
      <div className="usercategorytab">
        {this.props.category.categories.map(categor=>{
          if(categor.special===false && window.location.pathname !== '/login'){
            return(
              <div className="usercategorytab__item" key = {categor._id} onClick = {()=>this.categorySelected(categor.name)}>
                <div className="usercategorytab__item__icon">{categor.name.substring(1, 0)}</div>
                <div className="usercategorytab__item__text">{categor.name.substring(1)}</div>
              </div>
            );
          }else{
            return null;
          }
          
        })}
        
      </div>
      <Switch>
        <Route path = "/" exact component = {ProductContainer}/>
        <Route path = "/product/:id" exact component = {ProductDetail}/>
        
      </Switch>
    </div>
  );
  const GuestRoute = (
    <div className = "midpage">
      <div className="usercategorytab">
        {this.props.category.categories.map(categor=>{
          if(categor.special===false && window.location.pathname !== '/login'){
            return(
              <div className="usercategorytab__item" key = {categor._id} onClick = {()=>this.categorySelected(categor.name)}>
                <div className="usercategorytab__item__icon">{categor.name.substring(1, 0)}</div>
                <div className="usercategorytab__item__text">{categor.name.substring(1)}</div>
              </div>
            );
          }else{
            return null;
          }
          
        })}
        
      </div>
      <Switch>
        <Route path = "/login" component = {LoginRegister}/>
      </Switch>
      <div className = " container">
        <Switch>
        <Route path = "/" exact component = {ProductContainer}/>
        <Route path = "/product/:id" exact component = {ProductDetail}/>
        </Switch>
      </div>
    </div>
  );
  const auth = this.props.auth;
  return (
    
      <div className="App">
          <Navbar />
          <div className="bodydiv">
          {auth.isAuthenticated ? ( auth.user.role === 'user' ? UserRoute : AdminRoute)  : GuestRoute}
          </div>
          
          <Footer />
      </div>
      
  );
}
}
const mapStateToProps =(state)=>({
  auth: state.auth, 
  recipe: state.recipe, 
  category: state.category
})
export default connect(mapStateToProps, {getRecipeCategory, allCategory, setCategory})(withRouter(App));
