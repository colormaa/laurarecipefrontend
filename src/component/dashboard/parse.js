import React from 'react';
import {connect} from 'react-redux';
import {startParseAll, parseTitle} from '../../actions/parseActions';
import {allCategory} from '../../actions/categoryActions';
class Parse extends React.Component{
    state={current:''}
    /*
    1. loading spinner hii 
    2. pagination in recipe
    3. search all fields  full text search 
    4. parse title iin update-iig link, categories  oldvol category-gaas busad update hii 
    5. oldoogui bol linktei recipe oldvol  categorytai ni update hii push category 
    6. linktei oldoogui bol new  add 
    7. parse hiih tovchiig reducertei ni tus tusdaa parse hiideg bolgo.fix bug or resolve it 
    8. users show  dashboard 
    9. recipe full parse hiihdee  recipe status false iig ni buu parse-l 
    ///// usertei heseg 
    login register 
    get recipes 
    search recipes 
    like recipes //show like number on specific recipe
    comment recipes. 
     
    */
    componentDidMount(){
        this.props.allCategory();
    }
    parseAll(){
        this.props.startParseAll();
        this.setState({current:""})
    }
    parseTitle(categoryitem){
        console.log("categoryItem clicked " , categoryitem);
        
        this.props.parseTitle(categoryitem);
        this.setState({current:categoryitem})
    }
    render(){
        const completed = this.props.parse.completed;
        const total = this.props.parse.array.length;
        console.log("compelted", completed, total);
        let percent = 0;
        if(total === 0){
            percent = 0;
        }
        else{
            percent = (completed * 100)/total;
        }
        return(
            <div>
                <div className="flexbox-row align-items-center">
                    <button className="btn btn-purple " onClick = {()=>this.parseAll()}>Parse All Category</button>
                    
                </div>
                <div className="progress mx-3 mb-5" style={{}}>
                    <div className="progress-bar" role="progressbar" aria-valuenow={percent}
                    aria-valuemin="0" aria-valuemax="100" style={{width: percent+"%"}}>
                        <span>{percent.toFixed(2)}% Complete</span>
                    </div>
                </div>
                {
                    this.props.category.categories.map(cat=>{
                        return(
                            <div key={cat.name} className="card mb-4 mx-3 pt-2">
                                <div className="d-flex justify-content-between align-items-center px-1">
                                    <p className="card-subtitle" style={{fontSize:12, textTransform:"capitalize"}}>{cat.name}</p>
                                <a href="#" className="card-link" style={{fontSize:12}} onClick = {()=>this.parseTitle(cat.name)}>Parse</a>
                                </div>
                            <div key = {cat._id} className="px-1 mb-3">
                                <div className="progress">
                                    <div className="progress-bar progress-bar-striped" role="progressbar" aria-valuenow={cat.name==this.state.current?percent:0}
                                    aria-valuemin="0" aria-valuemax="100" style={{width: `${this.state.current==cat.name?percent:0}%`, textAlign:"center"}}>
                                        <span> {cat.name==this.state.current?parseFloat(percent).toFixed(2):0}% Complete</span>
                                    </div>
                                </div>
                            </div>
                            </div>
                        );
                    })
                }
                
                
                
            </div>
        );
    }
}
const mapStateToProps = (state)=>({
    parse: state.parse, 
    category: state.category
})
export default connect(mapStateToProps , {startParseAll, parseTitle, allCategory})(Parse);