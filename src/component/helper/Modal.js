import React from 'react';
import {connect} from 'react-redux';
class Modal extends React.Component{
  constructor(props){
    super(props);
    this.clearref = React.createRef();
    this.state={
      change: false
    }
  }
  
  componentDidMount(){
    this.setState({change: false});
  }
  componentWillReceiveProps(nextProps){
    //console.log("componene model ", this.props);
    if(nextProps.category.categories !== this.props.category.categories){
        this.setState({change: true});
        //console.log("changed ", nextProps.category.categories, this.props.category);
        this.clearref.current.click();
    }else if(nextProps.maincategory.maincategories !== this.props.maincategory.maincategories){
        this.setState({change: true});
       // console.log("changed ", nextProps.maincategory.maincategories, this.props.maincategory);
        this.clearref.current.click();
    }
    else if(nextProps.recipe.recipes !== this.props.recipe.recipes){
      this.setState({change: true});
     // console.log("changed ", nextProps.maincategory.maincategories, this.props.maincategory);
      this.clearref.current.click();
  }
  }
    render(){
      const category = this.props.category.categories;
     // console.log("this props modalid", category);
        return(
            
            <div className="modal fade" id={this.props.modalid} role="dialog">
              <div className="modal-dialog modal-lg">
              
                
                <div className="modal-content">
                  <div className="modal-header">
                  <h4 className="modal-title">{this.props.header} {this.props.operation === 'Add' ? " Add" : " Update" }</h4>
                    <button type="button" className="close" data-dismiss={this.props.toggle}>&times;</button>
                    
                  </div>
                  <div className="modal-body">
                    {this.props.children}
                  </div>
                  <div className="modal-footer">
                   <button type="button" onClick = {()=>this.props.onSubmit()} 
                        className="btn btn-purple">Save</button>
                    
                    
                    <button type="button" ref = {this.clearref} className="btn btn-purple" data-dismiss={this.props.toggle}>Close</button>
                  </div>
                </div>
                
              </div>
            </div>
        );
    }
}
const mapStateToProgs =(state)=>({
auth: state.auth, 
category: state.category, 
maincategory: state.maincategory, 
recipe: state.recipe
})
export default connect(mapStateToProgs)(Modal);