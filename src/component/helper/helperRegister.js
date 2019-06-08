import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {registerUser} from '../../actions/authActions';
class HelperReducer extends React.Component{
    state = {
        email: '', 
        username: '', 
        password: '', 
        errors: {}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
        if(nextProps.auth.isAuthenticated){
            this.setState({email: '', password: '', username: ''});
        }
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state);
    }
    onSubmit(e){
        e.preventDefault();
        const user = {
            username: this.state.username, 
            email: this.state.email, 
            password: this.state.password, 
                
        }
        this.props.registerUser(user, this.props.history);
        console.log("user ", user);
    }
    render(){
        const errors = this.state.errors;
        const {user} = this.props.auth;
        return(
            <form noValidate onSubmit = {(e)=>this.onSubmit(e)}>
                    <h3>Register</h3>
                <div className="form-group">
                  <label >Username</label>
                  <input type="text" className={["form-control", errors.username ? 'is-invalid' : ''].join(' ')} onChange = {(e)=>this.onChange(e)} name = "username" aria-describedby="emailHelp" value = {this.state.username} placeholder="Username "/>
                  {errors.email && (<div className = "invalid-feedback">{errors.username}</div>)}
                </div>
                <div className="form-group">
                  <label >Email address</label>
                  <input type="text" className={["form-control", errors.email ? 'is-invalid' : ''].join(' ')}  aria-describedby="emailHelp" name = "email" onChange = {(e)=>this.onChange(e)} placeholder="Enter email" value = {this.state.email}/>
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                  {errors.email && (<div className = "invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                  <label >Password</label>
                  <input type="password" className={["form-control",errors.password ? 'is-invalid' : ''].join(' ')} onChange = {(e)=>this.onChange(e)} name = "password"  placeholder="Password" value = {this.state.password}/>
                  {errors.email && (<div className = "invalid-feedback">{errors.password}</div>)}
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
              </form>
        );
    }
}
HelperReducer.propTypes={
    registerUser: propTypes.func.isRequired, 
    auth: propTypes.object.isRequired, 
    errors: propTypes.object.isRequired
}
const mapStateToProgs = (state)=>({
    auth: state.auth, 
    errors: state.errors
})
export default connect(mapStateToProgs, {registerUser})(withRouter(HelperReducer));