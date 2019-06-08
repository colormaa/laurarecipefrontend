import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import  {logoutUser} from '../../actions/authActions';
import {getRecipeAll} from '../../actions/recipeActions';
class Navbar extends React.Component{
    state = {
        search: ''
    }
logoutUser(e){
    e.preventDefault();
    console.log("logout user");
    this.props.logoutUser();
    this.props.history.push('/login');
}
searchSubmit=(e)=>{
    e.preventDefault();
    console.log(" serach  ", this.state.search);
    
    this.props.getRecipeAll(1, 20, this.state.search);
    this.props.history.push('/');
}

    render(){
        const {isAuthenticated, user} = this.props.auth;

    const authLinks = (<li className="nav-item"><Link className="nav-link" to = "/login">Login</Link></li>);
        const userLinks = (<li className="nav-item dropdown">
        <Link className="nav-link dropdown-toggle" to="/product" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            User
        </Link>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            
            <p className="dropdown-item" onClick = {(e)=>this.logoutUser(e)}>Logout</p>
        </div>
        </li>);
        return( <div className  ="container">
        <nav className="navbar mynavbar fixed-top navbar-expand-lg navbar-dark btn-purple">
                <Link className="navbar-brand" to="home">Laura Recipe </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                        <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                        </li>
                       
                        {isAuthenticated ? userLinks: authLinks}
                    </ul>
                    <form className="form-inline my-2 my-lg-0 mynav-form " onSubmit = {(e)=>this.searchSubmit(e)}>
                        <input className="form-control mr-sm-2 mr-md-2" onChange = {(e)=>{this.setState({search : e.target.value})}} type="search" name ="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-purple my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
          </nav>
          </div>
        );
    } 
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired, 
    auth: PropTypes.object.isRequired   
}
const mapStateToProps = (state)=>({
    auth: state.auth
})
export default  connect(mapStateToProps, {logoutUser, getRecipeAll})(withRouter(Navbar));