import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
///import YouTube from 'react-youtube';
import {getRecipePopular} from '../../actions/recipeActions';
import {connect} from 'react-redux';
import userimage from '../../images/user.png';
//var fs = require('fs');
//var youtubedl = require('youtube-dl');
const link = "https://laurarecipebackend.herokuapp.com";
 
class ProductDetail extends React.Component{
    state = {
        product: null, 
        showmore: false, 
        loading: false, 
        comment: '', 
        error: false
    }
    componentDidMount(){
        this.setState({loading: true});
        console.log("this.props history", this.props.history.location.pathname.split('/')[2]);
        const id = this.props.history.location.pathname.split('/')[2];
        axios.get(`${link}/api/recipes/item/${id}`)
        .then(res=>{
            this.setState({product: res.data.data, loading: false});
        })
        .catch(err=>{
            console.log("err ", err);
            this.setState({loading: false})
        });
        if(this.props.recipe.popularrecipe.length ===0){
            this.props.getRecipePopular();
        }
        console.log("window.location.href", window.location.href)
    }
    onSubmitComment =(e)=>{
        e.preventDefault();
        if(this.props.auth.isAuthenticated && this.state.product !==null){
            console.log("auth ", this.props.auth);
           //this.props.addComment(this.props.auth.user.id, this.state.comment, this.state.product.link);
           axios.post(`${link}/api/recipes/addComment`, {userid: this.props.auth.user.id, text: this.state.comment, recipelink : this.state.product.link})
            .then(re=>{
                console.log("re console comment ", re);
                this.setState({product: re.data.data, comment: '', error: false});
            })
            .catch(err=>{
                console.log("re catch ", err);
            })
        }else{
            this.props.history.push('/login');
        }
        console.log("comment submit", this.state);

    }
    selectElement=(id)=>{
        this.props.history.push(`/product/${id}`);
        axios.get(`${link}/api/recipes/item/${id}`)
        .then(res=>{
            this.setState({product: res.data.data, loading: false});
        })
        .catch(err=>{
            console.log("err ", err);
            this.setState({loading: false})
        });
    }
    changeComment=(e)=>{
        this.setState({comment: e.target.value, error: e.target.value === '' ? true: false});
    }
    downloadVideo=()=>{
        //window.location.href = `http://localhost:4000/download?URL=${URL}`;
        var mywindow = window.open(`${link}/api/recipes/download?url=https://www.youtube.com/watch?v=${this.state.product.youtube}&title=${this.state.product.title}`);
        //mywindow.close();
        //var mywindow = window.open("https://www.google.com");
        setTimeout(()=>{
            mywindow.close();
        }, 2000);
        
        /*var video = youtubedl(`http://www.youtube.com/watch?v=${this.state.product.youtube}`,
        // Optional arguments passed to youtube-dl.
        ['--format=18'],
        // Additional options can be given for calling `child_process.execFile()`.
        { cwd: __dirname });

        // Will be called when the download starts.
        video.on('info', function(info) {
        console.log('Download started');
        console.log('filename: ' + info._filename);
        console.log('size: ' + info.size);
        });

        video.pipe(fs.createWriteStream('myvideo.mp4'));
        */
    }
    render(){
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 1
            }
            ,
          };
          const product = this.state.product;
          console.log("product ", product)
          const popular = this.props.recipe.popularrecipe;
        return(
            <div className="productdetail">
                {this.state.loading ===false ? 
                this.state.product ? 
                <div className="productfull">
                    <h3 className="productfull__title">{product.title}</h3>
                    <iframe  className = "productfull__iframe" src={`https://www.youtube.com/embed/${product.youtube}`} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <div className ="d-flex justify-content-around">
                    <div className="productfull__infobox">
                        <div className="productfull__info">
                            <span>PREParation </span> {product.preparation}
                        </div>
                        <div className="productfull__info">
                            <span>cook time </span> {product.cooktime}
                        </div>
                        <div className="productfull__info">
                            <span>servings </span> {product.serves}
                        </div>
                        <div className="productfull__info">
                            <span>episode </span> {product.episode}
                        </div>
                    </div>
                    <div className ="buttondownload">
                        <button onClick = {()=>this.downloadVideo()}>Download Video</button>
                    </div>
                    </div>
                    <div className="productfull__recipebox">
                        <h3 className="productfull__title">Ingredients</h3>
                        {product.ingredients.map(ingre=>{
                            return( <div key = {ingre.for}>
                                <h3 className="productfull__recipebox__title">{ingre.for}</h3>
                                {ingre.description.map(desc=>{
                                    return( <p className="productfull__recipebox__desc" key = {desc}><input type="checkbox"/>{desc}</p> )
                                })}
                            </div> );
                        })}
                    </div>
                    <div className="productfull__preparation">
                        <div className="productfull__title">Preparation</div>
                        {product.preinstruction.map((instruction, index)=>{
                            return( <p className = "preparation__item" key = {index}>{instruction}</p>  );
                        })}
                    </div>
                    <div className="card mycomment">
                        <div className="card-header">Leave a Comment:</div>
                        <div className="card-body">
                            <form onSubmit={(e)=>this.onSubmitComment(e)}>
                                <div className="form-group">
                                    <textarea rows="3" value = {this.state.comment} 
                                    onChange = {(e)=> this.changeComment(e)} 
                                    name = "comment" className="form-control"></textarea>
                                </div>

                                <div className = {[this.state.error ? "errormsg": 'helpertext'].join(' ')}>{this.state.error ? "Comment can not be empty": "Opinion about recipe"}</div>
                                
                                
                                <button className="btn btn-purple" disabled = {this.state.comment === ''} type = "submit">Submit</button>
                            </form>

                        </div>

                        <div className="mycomment__container">
                            <hr/>
                            <div className="mycomment">
                                {this.state.product.comments.map(com=>{
                                    return(
                                        <div className="media m-4" key = {com._id}>
                                            <img className="d-flex mr-3 rounded-circle" width = "50px" src={userimage} alt=""/>
                                            <div className="media-body">
                                                <h5 className="mt-0">{com.user.username}</h5>
                                                {com.text}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                : <div className = "notFound">Not found</div>
                : <div className="loadingcontainer"><div className="lds-facebook"><div></div><div></div><div></div></div></div> 
                
                }
                
                <div className="popular" style = {this.state.showmore ? {height: 'auto'}: null} ref = "popular">

                    <h3 className="myheader">Popular recipes</h3>
                    {popular.map(ele =>{
                        return(
                            <div className="popular__product" key = {ele.title} onClick={()=>this.selectElement(ele._id)} >
                                <img src={ele.image} alt="" className="popular__product__image"/>
                                <p className="popular__product__title">{ele.title}</p>
                                
                            </div>
                        );
                    })}
                   
                </div>
                
            </div>
        );
    }
}
const mapStateToProgs = (state)=>({
    recipe: state.recipe, 
    auth: state.auth
})
export default connect(mapStateToProgs, {getRecipePopular})(withRouter(ProductDetail));