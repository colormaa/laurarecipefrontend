import React from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authActions';
class HelperLogin extends React.Component{
    state={
        email: '', 
        password: '', 
        errors: {}
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
        if(nextProps.auth.isAuthenticated){
            this.setState({email: '', password: ''});
            
        }
        
    }
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    onSubmit(e)
    {
        e.preventDefault();
        const login ={
            email: this.state.email, 
            password :this.state.password
        }
        console.log("login ", login);
        this.props.loginUser(login, this.props.history);
    }
    render(){
        const errors = this.state.errors;
        return(<form noValidate onSubmit = {(e)=> this.onSubmit(e)}>
            <h3>Login</h3>
        <div className="form-group">
          <label >Email address</label>
          <input type="text"  onChange = {(e)=>this.onChange(e)} className={["form-control",errors.email ?  'is-invalid': ''].join(' ')} name = "email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          {errors.email && <div className = "invalid-feedback">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" onChange = {(e)=>this.onChange(e)}  className={["form-control", errors.password ? 'is-invalid': ''].join(' ')} name = "password" id="exampleInputPassword1" placeholder="Password"/>
            {errors.password && <div className = "invalid-feedback">{errors.password}</div>}
        </div>
        {errors.msg && <div className = "invalid-feedback">{errors.msg}</div>}
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>);
    }
}
HelperLogin.propTypes ={

}
const matStateToProps =(state)=>({
    auth: state.auth, 
    errors: state.errors
})
export default connect(matStateToProps, {loginUser})(withRouter(HelperLogin));