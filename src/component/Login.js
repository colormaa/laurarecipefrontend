import React from 'react';
import HelperRegister from './helper/helperRegister';
import HelperLogin from './helper/helperLogin';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
class LoginRegister extends React.Component{
    state = {
        selected: 'login'
    }
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }
    }
    loginClicked=(e)=>{
        console.log("login clicked");
        this.setState({selected: 'login'});
    }
    registerClicked =(e)=>{
        console.log("register clicked");
        this.setState({selected: 'register'});
    }
    render(){
        let content =null;
        if(this.state.selected === 'login'){
            content = 
            (<HelperLogin />);
        }else{
            content = 
            (<HelperRegister/>);
        }
        return(
            <div className = "loginregister">
                <div className = "loginregister__text">
                    <h3>Recipe <br/></h3>
                </div>
                <div className = "loginregister__main">
                    <div className = "loginregister__header">
                        <div  onClick = {(e)=>this.loginClicked(e)} className = {["loginbutton", this.state.selected ==='login' ? 'loginbutton__active': null].join(' ')}>Login</div>
                        <div onClick = {(e)=>this.registerClicked(e)} className = {["loginbutton", this.state.selected ==='register' ? 'loginbutton__active': null].join(' ')}>Register</div>
                    </div>
                    <div className = "loginregister__content">
                        {content}
                    </div>


                </div>
            </div>
        );
    }
}
const maptStateToProps =(state)=>({
    auth: state.auth
})
export default connect(maptStateToProps)(withRouter(LoginRegister));