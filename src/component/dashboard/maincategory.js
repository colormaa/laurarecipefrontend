import React from 'react';
import Modal from '../helper/Modal';
import axios from 'axios';
import {connect} from 'react-redux';
import isEmpty from '../../isEmpty';
import {addMainCategory, getMainCategoryAll,  deleteMainCategory, updateMainCategory} from '../../actions/maincategory';
import {addCategory, allCategory, updateCategory, deleteCategory} from '../../actions/categoryActions';
class MainCategory extends React.Component{
    state = {
        id: '',
        name: '', 
        cats: [],
        categories: '', 
        operation: 'Add', 
        errors: {name: '', msg: ''}
    }
    componentWillReceiveProps(nextProps){
        //console.log("Main category will receive props ===>  ", nextProps.maincategory);
        //console.log("this prosp ", this.props.maincategory);
        
        if(nextProps.maincategory.maincategories !== this.props.maincategory.maincategories){
            this.setState({name: '', cats: [], categories: '', errors: {}});
        }
        
        if(!isEmpty(nextProps.errors)){
            console.log("err ", nextProps.errors);
            this.setState({errors: nextProps.errors.err})
        }
        
    }
    componentWillMount(){
        console.log("compoene id mount");
       this.props.getMainCategoryAll();
       this.props.allCategory();
    }
    componentDidMount(){
        
    }
    onChange=(e)=>{
        e.preventDefault();
        if(e.target.type === 'text'){
            this.setState({[e.target.name]: e.target.value});
        }else if(e.target.type === 'checkbox'){
            this.setState({[e.target.name]: e.target.checked});
        }else if(e.target.type === 'select-one'){
            console.log("e. ", e.target.name);
            // cats = this.state[e.target.name];
            //console.log("cats", cats);
            this.setState({[e.target.name]: e.target.value});
        }
       

    }
    onSubmit=()=>{
        //e.preventDefault();
        if(this.state.operation === 'Add'){
            const cat = {
                name: this.state.name, 
                categories: this.state.cats.map(cc => cc._id)
            }
            this.props.addMainCategory(cat);
        }else{
            const cat = {
                _id: this.state.id,
                name: this.state.name, 
                categories: this.state.cats.map(cc =>(cc._id))
            }
            this.props.updateMainCategory(cat);
        }
        console.log("onSubmit");
        
        console.log("this ", this.state);
    };
    AddClicked=()=>{
        this.setState({operation: 'Add'})
    }
    categorySelected=()=>{
        let catt = [...this.state.cats];
        if(this.state.categories === 'None'){

        }else{
            let ctt = this.props.category.categories.filter(cat => cat._id === this.state.categories)[0];
            if(!catt.includes(ctt)){
                console.log("not includes");
                catt.push(ctt);
                this.setState({cats: catt});
            }
            
        }
        //this.props.category.categories.
        console.log("cattt ", catt);
        
        
       
    }
    render(){
        const dataschema = {
            _id: null, 
            name: '', 
            special: false, 
            
        }
        const errors = this.state.errors;
        const maincategories = this.props.maincategory.maincategories;
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
                <Modal onSubmit = {this.onSubmit} operation = {this.state.operation} header = "Main Category " toggle = "modal" modalid = "myModal">
                    
                        <div className="form-group">
                            <label >Name</label>
                            <input type="text"  onChange = {(e)=>this.onChange(e)} 
                            className={["form-control", !isEmpty(errors.name)?  'is-invalid': ''].join(' ')}
                            name = "name"  value = {this.state.name}
                            placeholder= "Category name"/>
                            <small className="form-text text-muted">Category name</small>
                            {!isEmpty(errors.name) && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                    
                        <div className="form-group mb-0 row p-3">
                            <label  className = "col-sm-12">Categories</label>
                            <select name = "categories" onChange = {e=>this.onChange(e)} className=" col-sm-9 mb-3 form-control">
                                <option>
                                    None
                                </option>
                                {this.props.category.categories.map(cat=>{
                                    return(<option key = {cat._id} value = {cat._id}>{cat.name}</option>);
                                })}
                            </select>
                            <div className = "col-sm-1"></div>
                            <button className = "btn btn-purple col-sm-2 mb-3 " onClick = {()=>this.categorySelected()}>Select</button>
                        </div>
                        <div className = "cat_list">
                            <ul>
                                {this.state.cats.map(cat=>{
                                    return(<li key = {cat._id}>
                                                {cat.name}
                                        </li>);
                                })}
                            </ul>
                        </div>

                    
                </Modal>
               
                <div className = "templateBoard__second">
                <div className="table-responsive">  
                        
                    <table className="table table-hover table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Sub categories</th>
                            <th></th>
                            
                        </tr>
                        </thead>
                        <tbody>
                            {
                                maincategories.map((cat, index) =>{
                                    return(<tr key = {index}>
                                        <td>{index}</td>
                                        <td>{cat.name}</td>
                                        <td>{cat.categories.map(cate => (cate.name+", "))}</td>
                                        <td>
                                            <button className = "btn btn-blue mr-2" data-toggle="modal" onClick={()=>this.setState({id: cat._id, operation: 'Update', name: cat.name, cats: cat.categories, errors: {}})}  data-target="#myModal">Update</button>
                                            <button className = "btn btn-orange" onClick = {()=>this.props.deleteMainCategory(cat._id)} >Delete</button>
                                        </td>
                                        
                                    </tr>)
                                })
                            }
                        
                        
                        </tbody>
                    </table>
                    
                    </div>
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                            <a className="page-link" href="/" >Previous</a>
                            </li>
                            <li className="page-item"><a className="page-link" href="/">1</a></li>
                            <li className="page-item"><a className="page-link" href="/">2</a></li>
                            <li className="page-item"><a className="page-link" href="/">3</a></li>
                            <li className="page-item">
                            <a className="page-link" href="/">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}
const mapStateToProgs =(state)=>({
    auth: state.auth, 
    category: state.category, 
    maincategory: state.maincategory,
    errors: state.errors
});
export default connect(mapStateToProgs, { allCategory, getMainCategoryAll, updateMainCategory, deleteMainCategory, addMainCategory})(MainCategory);