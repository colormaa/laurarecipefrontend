import React from 'react';
import Modal from '../helper/Modal';
import axios from 'axios';
import {connect} from 'react-redux';
import isEmpty from '../../isEmpty';
import {addCategory, allCategory, updateCategory, deleteCategory} from '../../actions/categoryActions';
class Category extends React.Component{
    state = {
        id: '',
        name: '', 
        special: false, 
        operation: 'Add', 
        errors: {name: '', msg: ''}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.category.categories !== this.props.category.categories){
            this.setState({name: '', special: false, errors: {}});
        }
        if(!isEmpty(nextProps.errors)){
            console.log("err ", nextProps.errors);
            this.setState({errors: nextProps.errors})
        }
        
    }
    componentWillMount(){
        console.log("compoene id mount");
       this.props.allCategory();
    }
    componentDidMount(){
        
    }
    onChange=(e)=>{
        e.preventDefault();
        if(e.target.type === 'text'){
            this.setState({[e.target.name]: e.target.value});
        }else{
            this.setState({[e.target.name]: e.target.checked});
        }
       

    }
    onSubmit=()=>{
        //e.preventDefault();
        if(this.state.operation === 'Add'){
            const cat = {
                name: this.state.name, 
                special: this.state.special
            }
            this.props.addCategory(cat);
        }else{
            const cat = {
                _id: this.state.id,
                name: this.state.name, 
                special: this.state.special
            }
            this.props.updateCategory(cat);
        }
        console.log("onSubmit");
        
        console.log("this ", this.state);
    };
    AddClicked=()=>{
        this.setState({operation: 'Add'})
    }
    render(){
        const dataschema = {
            _id: null, 
            name: '', 
            special: false, 
            
        }
        const errors = this.state.errors;
        const categories = this.props.category.categories;
        return(
            <div className = "templateBoard">
                <div className = "templateBoard__first">
                    <button type="button" className="btn btn-info" onClick ={()=>this.setState({operation: 'Add', name: '', special: false, errors: {}})} data-toggle="modal" data-target="#myModal">Add</button>
                    <div className = "searchHolder">
                        <input type = "text" placeholder = "search"/>
                    </div>
                    <div className = "buttonsearch">
                        <i className="material-icons">search</i>
                    </div>

                </div>
                <Modal onSubmit = {this.onSubmit} operation = {this.state.operation} header = "Category" toggle = "modal" modalid = "myModal">
                    
                        <div className="form-group">
                            <label >Name</label>
                            <input type="text" onChange = {(e)=>this.onChange(e)} 
                            className={["form-control", errors.name?  'is-invalid': ''].join(' ')}
                            name = "name"  value = {this.state.name}
                            placeholder= "Category name"/>
                            <small className="form-text text-muted">Category name</small>
                            {!isEmpty(errors.name) && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                        <div className="form-check form-check-inline">
                            
                            <input type="checkbox"  onChange = {(e)=>this.onChange(e)} 
                            className='form-check-input'
                            name = "special" 
                            checked = {this.state.special}
                            placeholder={this.props.placeholder}/>
                            <label className = "form-check-label" >Special</label>

                        </div>
                    
                </Modal>
               
                <div className = "templateBoard__second">
                <div className="table-responsive">          
                    <table className="table table-hover table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Special</th>
                            <th></th>
                            
                        </tr>
                        </thead>
                        <tbody>
                            {
                                categories.map((cat, index) =>{
                                    return(<tr key = {index}>
                                        <td>{index}</td>
                                        <td>{cat.name}</td>
                                        <td>{cat.special ? 'yes': 'no'}</td>
                                        <td>
                                            <button className = "btn btn-blue mr-2" data-toggle="modal" onClick={()=>this.setState({id: cat._id, operation: 'Update', name: cat.name, special: cat.special, errors: {}})}  data-target="#myModal">Update</button>
                                            <button className = "btn btn-orange" onClick = {()=>this.props.deleteCategory(cat._id)} >Delete</button>
                                        </td>
                                        
                                    </tr>)
                                })
                            }
                        
                        
                        </tbody>
                    </table>
                    
                    </div>
                    
                </div>
            </div>
        )
    }
}
const mapStateToProgs =(state)=>({
    auth: state.auth, 
    category: state.category, 
    errors: state.errors
});
export default connect(mapStateToProgs, {addCategory, allCategory, updateCategory, deleteCategory})(Category);