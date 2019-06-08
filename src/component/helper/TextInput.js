import React from 'react';

class TextInput extends React.Component{
    render(){
        const errors = this.props.errors;
        const label = this.props.label;
        return(
            <div className="form-group">
            <label >{label}</label>
            <input type="text"  onChange = {(e)=>this.props.onChange(e)} 
            className={["form-control",errors?  'is-invalid': ''].join(' ')}
             name = {this.props.name} id="exampleInputEmail1" aria-describedby="emailHelp" 
             placeholder={this.props.placeholder}/>
            <small id="emailHelp" className="form-text text-muted">{this.props.smallText}</small>
            {errors && <div className = "invalid-feedback">{errors}</div>}
            </div>
        );
    }
}
export default TextInput;