import React from 'react';
import Modal from '../helper/Modal';
import axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import isEmpty from '../../isEmpty';
import {getRecipeAll, addRecipe, updateRecipe, deleteRecipe} from '../../actions/recipeActions';
import {addMainCategory, getMainCategoryAll,  deleteMainCategory, updateMainCategory} from '../../actions/maincategory';
import {addCategory, allCategory, updateCategory, deleteCategory} from '../../actions/categoryActions';
import {storage} from '../../firebase';
import Pagination from '../Pagination';
class MainCategory extends React.Component{
    state = {
        id: '',
        title: '',
        seen: '', 
        serves: '', 
        imagelink: '', 
        preinstruction: [{text: null, update: false}],
        preinstructiontemp: '',
        instruction: '',
        ingredients: [{for: 'empty', description: [{text: null, update: false}]}], 
        ingredientfor: '',
        selectedfor: 'empty',
        ingredient: '',
        preparation: '',
        youtube: '',
        episode: '',
        cooktime: '',
        cats: [],
        categories: '', 
        operation: 'Add',
        errors: {}, 
        image: null, 
        link: ''
    }
    componentWillReceiveProps(nextProps){
        //console.log("Main category will receive props ===>  ", nextProps.maincategory);
        //console.log("this prosp ", this.props.maincategory);
        
        if(nextProps.maincategory.maincategories !== this.props.maincategory.maincategories){
            this.setState({name: '', cats: [], categories: '', errors: {}});
        }
        
        if(!isEmpty(nextProps.errors)){
            console.log("err ", nextProps.errors);
            this.setState({errors: nextProps.errors})
        }
        
    }
    componentWillMount(){
        console.log("compoene id mount");
       //this.props.getMainCategoryAll();
       this.props.allCategory();
       this.props.getRecipeAll(this.props.recipe.page, 20, this.props.recipe.search);
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
            //console.log("e. ", e.target.name);
            // cats = this.state[e.target.name];
            //console.log("cats", cats);
            this.setState({[e.target.name]: e.target.value});
        }
       

    }
    onSubmit=()=>{
        //e.preventDefault();
        const errors = {};
        if(this.state.operation === 'Add'){
            const recipe = {};
            const recipeingred = this.state.ingredients.map(el=>{
                    const descs = el.description.map(des=> {
                        if(des){
                            return des.text;
                        }else{
                            return null;
                        }
                    }).filter(el => el!==null);
                    return {for: el.for, description: descs}
                }).filter(el => !isEmpty(el.description));
            if(!isEmpty(recipeingred)){
                recipe.ingredients = recipeingred;
            }else{
                errors.ingredients = "Ingredients is empty";
            }
            if(!isEmpty(this.state.preinstruction.map(el=>(el.text)).filter(el=> el !==null))){
                recipe.preinstruction = this.state.preinstruction.map(el=>(el.text)).filter(el=> el !==null);
            }else{
                errors.preinstruction = "Preinstruction is empty";
            }
            if(!isEmpty(this.state.seen)){
                if(isNaN(parseInt(this.state.seen))){
                    errors.seen = "Must be integer";
                }else{
                    recipe.seen = this.state.seen;
                }
            }else{
                errors.seen = "Seen is empty";
            }
            if(this.state.image !== null){
                recipe.image = this.state.image.name;
            }else{
                console.log("this image link chec", this.state.image);
                errors.image = "Image link is empty";
            }
            if(!isEmpty(this.state.serves)){
                recipe.serves = this.state.serves;
            }else{
                errors.serves = "Serves is empty";
            }
            if(!isEmpty(this.state.link)){
                recipe.link = this.state.link;
            }else{
                errors.link = "Link is empty";
            }
            if(!isEmpty(this.state.status)){
                recipe.status = this.state.status==="active"  ? true: false;
            }else{
                errors.status = "Status is empty";
            }
            if(!isEmpty(this.state.title)){
                recipe.title = this.state.title;
            }else{
                errors.title = "Title is empty";
            }
            if(!isEmpty(this.state.cats)){
                recipe.category = this.state.cats.map(ele => (ele._id));
            }else{
                errors.category = "Category is empty";
            }
            if(!isEmpty(this.state.cooktime)){
                recipe.cooktime = this.state.cooktime;
            }else{
                errors.cooktime = "Cooktime is empty";
            }
            if(!isEmpty(this.state.preparation)){
                recipe.preparation = this.state.preparation;
            }else{
                errors.preparation = "Preparation is empty";
            }
            if(!isEmpty(this.state.episode)){
                recipe.episode = this.state.episode;
            }else{
                errors.episode = "Episode is empty";
            }
            if(!isEmpty(this.state.youtube)){
                var url = this.state.youtube;
                var VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
                console.log("regex ", url.match(VID_REGEX));
                if(url.match(VID_REGEX)){
                    recipe.youtube = url.match(VID_REGEX)[1];
                }else{
                    errors.youtube = "Youtube video link is not valid";
                }
                //errors.youtube = 
            }else{
                errors.youtube = "Youtube video link is empty";
            }
            if(isEmpty(errors)){
                console.log("submitted");
                const image = this.state.image;
                if(image){
                    const uploadTask = storage.ref(`images/${image.name}`).put(image);
                    uploadTask.on('state_changed', (snapshot)=>{
                        console.log("progress");
                    }, (error)=>{
                        console.log("err ", error);
                        errors.image = "can not upload image";
                        this.setState({errors: errors});
                    }, ()=>{
                        //complete
                        storage.ref('images').child(image.name).getDownloadURL().then(url=>{
                            console.log("url ", url);
                            recipe.image =url;
                            this.props.addRecipe(recipe);
                        });
                    });
                }
                
                
            }else{
                console.log("errors ", errors);
                this.setState({errors: errors});
            }
           
            //this.props.addMainCategory(cat);
        }else{
            const recipe = {};
            const recipeingred = this.state.ingredients.map(el=>{
                    const descs = el.description.map(des=> {
                        if(des){
                            return des.text;
                        }else{
                            return null;
                        }
                    }).filter(el => el!==null);
                    return {for: el.for, description: descs}
                }).filter(el => !isEmpty(el.description));
            if(!isEmpty(recipeingred)){
                recipe.ingredients = recipeingred;
            }else{
                errors.ingredients = "Ingredients is empty";
            }
            if(!isEmpty(this.state.preinstruction.map(el=>(el.text)).filter(el=> el !==null))){
                recipe.preinstruction = this.state.preinstruction.map(el=>(el.text)).filter(el=> el !==null);
            }else{
                errors.preinstruction = "Preinstruction is empty";
            }
            if(!isEmpty(this.state.seen)){
                if(isNaN(parseInt(this.state.seen))){
                    errors.seen = "Must be integer";
                }else{
                    recipe.seen = this.state.seen;
                }
            }else{
                errors.seen = "Seen is empty";
            }
            if(this.state.image !== null){
                recipe.image = this.state.image.name;
            }else{
                console.log("this image link chec", this.state.image);
                if(isEmpty(this.state.imagelink)){
                    errors.image = "Image link is empty";
                    errors.imagelink = "Image link is empty";
                }
                
            }
            if(!isEmpty(this.state.serves)){
                recipe.serves = this.state.serves;
            }else{
                errors.serves = "Serves is empty";
            }
            if(!isEmpty(this.state.link)){
                recipe.link = this.state.link;
            }else{
                errors.link = "Link is empty";
            }
            if(!isEmpty(this.state.status)){
                recipe.status = this.state.status==="active"  ? true: false;
            }else{
                errors.status = "Status is empty";
            }
            if(!isEmpty(this.state.title)){
                recipe.title = this.state.title;
            }else{
                errors.title = "Title is empty";
            }
            if(!isEmpty(this.state.cats)){
                recipe.category = this.state.cats.map(ele => (ele._id));
            }else{
                errors.category = "Category is empty";
            }
            if(!isEmpty(this.state.cooktime)){
                recipe.cooktime = this.state.cooktime;
            }else{
                errors.cooktime = "Cooktime is empty";
            }
            if(!isEmpty(this.state.preparation)){
                recipe.preparation = this.state.preparation;
            }else{
                errors.preparation = "Preparation is empty";
            }
            if(!isEmpty(this.state.episode)){
                recipe.episode = this.state.episode;
            }else{
                errors.episode = "Episode is empty";
            }
            if(!isEmpty(this.state.youtube)){
                var url = this.state.youtube;
                var VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
                console.log("regex ", url.match(VID_REGEX));
                if(url.match(VID_REGEX)){
                    recipe.youtube = url.match(VID_REGEX)[1];
                }else{
                    errors.youtube = "Youtube video link is not valid";
                    console.log("yout not vaid");
                }
                //errors.youtube = 
            }else{
                errors.youtube = "Youtube video link is empty";
            }
            if(isEmpty(errors)){
               // console.log("submitted");
                recipe._id = this.state.id;
                const image = this.state.image;
                if(image){
                    const uploadTask = storage.ref(`images/${image.name}`).put(image);
                    uploadTask.on('state_changed', (snapshot)=>{
                        console.log("progress");
                    }, (error)=>{
                        console.log("err ", error);
                        errors.image = "can not upload image";
                        this.setState({errors: errors});
                    }, ()=>{
                        //complete
                        storage.ref('images').child(image.name).getDownloadURL().then(url=>{
                            console.log("url ", url);
                            recipe.image =url;
                            this.props.updateRecipe(recipe);
                        });
                    });
                }else{
                    console.log(" image null update ");
                    recipe.image = this.state.imagelink;
                    this.props.updateRecipe(recipe);
                }
            
        }else{
            console.log("error is not empty");
            this.setState({errors: errors});
        }
        //console.log("onSubmit");
        
        //console.log("this ", this.state);
    };
}
    setUpdateRecipeValue =(id)=>{
        console.log("setUpdateRecipevalue ", id);
        axios.get(`/api/recipes/item/${id}`)
        .then(res => {
            console.log("res ", res.data.data);
            const obj = res.data.data;
            /*this.setState({
                title: obj.title, 
                seen: obj.seen, 
                serves: obj.serves, 
                youtube: obj.youtube
            })
            */
           const objmy = {
               id: id,
               operation: 'Update',
               errors: {},
               title: obj.title, 
               seen: obj.seen, 
               serves: obj.serves, 
               status: obj ? 'active': 'inactive', 
               link: obj.link, 
               episode: obj.episode ? obj.episode : '',
               imagelink: obj.image,
               youtube: obj.youtube ? obj.youtube : '', 
               cooktime: obj.cooktime ? obj.cooktime: '', 
               preparation: obj.preparation ? obj.preparation : '', 
               preinstruction: obj.preinstruction ? 
                    obj.preinstruction.map(ele =>{
                        return({text: ele , update: false});
                    })  : 
                    [{text: '', update: false}], 
                ingredients: obj.ingredients ? 
                    obj.ingredients.map(ele=>{
                        if(ele.for === ''){
                            ele.for = 'empty';
                            //ele.description.push({text: '', update: false});
                        }
                        ele.description = ele.description.map(eleme => {
                            return({ text: eleme, update: false});
                        });
                        return ele;

                    }) : 
                [{for: 'empty', description: [{text: '', update: false}]}], 
                cats: obj.category ? obj.category : []
           }    
           ;
           this.setState(objmy);

        })
        .catch(err=>{
            console.log("err ", err);
        })
    }
    AddClicked=()=>{
        this.setState({operation: 'Add'})
    }
    categorySelected=()=>{
        let catt = [...this.state.cats];
        if(this.state.categories === 'None'){

        }else{
            let ctt = this.props.category.categories.filter(cat => cat._id === this.state.categories)[0];
            if(!catt.includes(ctt)){
               // console.log("not includes");
                catt.push(ctt);
                this.setState({cats: catt});
            }
            
        }
    }
    instuctionAdded =()=>{
        console.log("instruction added");
        if(isEmpty(this.state.instruction)){
            const errors = this.state.errors;
            errors.instuction = "Instuction is empty";
            this.setState({errors: errors});
        }else{
            const inst = this.state.preinstruction;
            inst.push({text: this.state.instruction, update: false});
            const errors = this.state.errors;
            errors.instuction = null;
            this.setState({preinstruction: inst, instruction: '', errors: errors});

        }
        console.log("instruction ", this.state);        
    }
    ingredientAdded =()=>{
        console.log("instruction added");
        if(isEmpty(this.state.ingredient)){
            const errors = this.state.errors;
            errors.ingredient = "Ingredient is empty";
            this.setState({errors: errors});
        }else{
            let ings = this.state.ingredients;
            const filter = ings.filter(element => element.for === this.state.selectedfor && 
                element.description.find(el=> { return el.text == this.state.ingredient})
                
                );
                
                console.log(" filter ", filter);
            if(isEmpty(filter)){
                let descs = ings.map(element => {
                    if(element.for === this.state.selectedfor){
                        element.description.unshift({text:this.state.ingredient, update: false});
                        this.setState({ingredient: ''});
                    }
                    return(element);
                });
                this.setState({ingredients: descs});
            }else{
                const errors = this.state.errors;
                errors.ingredient = "Ingredient is already existed in this selected for";
                this.setState({errors: errors});
            }
        }
        //console.log("ingredients ", this.state);        
    }
    ingForAdded=()=>{
        if(isEmpty(this.state.ingredientfor)){
            const errors = {};
            errors.ingredientfor = "Ingredient for is empty can not add";
            this.setState({errors: errors});
        }else{
            console.log("ingredient for add ", this.state.ingredientfor)
            const inst = this.state.ingredients;
            const exist = inst.filter(element => {
                console.log(" element ", element)
                return(element.for === this.state.ingredientfor);
            });
            console.log("exist ", exist);
            if(isEmpty(exist)){
                console.log("not exist");
                inst.push({for: this.state.ingredientfor, description: []});
                const errors = {};
                errors.ingredientfor = null;
                this.setState({ingredients: inst, ingredientfor: '', errors: errors});
            }else{
                console.log("exist");
                 const errors = {};
                errors.ingredientfor = 'Already existed.';

                this.setState({ errors: errors});
            }
           
        }
    }
    selectForHandler =(e)=>{
        e.preventDefault();
        this.setState({selectedfor: e.target.value });
    }
    fileUploadHandler =(e)=>{
        console.log(" even ", e.target.files[0]);
        if(e.target.files[0]){

        }
        const file =e.target.files[0];
        const fd = new FormData();
        fd.append('image',file, file.name );
        axios({
            method: 'post',
            url: 'gs://foodordertest1.appspot.com',
            responseType: 'stream'
          }, fd)
        .then(res=>{
            console.log("res file upload ", res);
        })
        .catch(err=>{
            console.log("err ", err);
        })
    }
    updateIngredient=(cat, el)=>{
        console.log("category ", cat, el);
        if(el.update){
            
            let statetemp = [...this.state.ingredients];
            let descs = statetemp.filter(ele=> ele.for == cat)[0];
            console.log("descs", descs.description)
            const changestate = descs.description.map(elem => {
                if(elem.text == el.text){
                    elem.update =false;
                    elem.text = this.state.ingreupdatetemp;
                }
                return elem;
            });
            const change2 = statetemp.map(ele =>{
                if(ele.for ==cat){
                    ele.description = changestate;
                }
                return ele;
            })
            console.log("change state ", changestate);
            this.setState({ingredients: change2, ingreupdatetemp: ''});
        }else{
            let statetemp = [...this.state.ingredients];
            let descs = statetemp.filter(ele=> ele.for == cat)[0];
            console.log("descs", descs.description)
            const changestate = descs.description.map(elem => {
                if(elem.text == el.text){
                    elem.update =true;
                }
                return elem;
            });
            const change2 = statetemp.map(ele =>{
                if(ele.for ==cat){
                    ele.description = changestate;
                }
                return ele;
            })
            console.log("change state ", changestate);
            this.setState({ingredients: change2, ingreupdatetemp: el.text});
        }
        
    }
    fileChangeHandler=(e)=>{
        e.preventDefault();
        if(e.target.files[0]){
            if(e.target.files[0].size<3000000 && e.target.files[0].type === "image/jpeg"){
                let change = this.state.errors;
                change.imagelink = null;
                this.setState({image: e.target.files[0], errors: change });
                //console.log("filena ", e.target.files[0]);  
            }else{
                let change = this.state.errors;
                change.imagelink = "File must be image jpeg format and size must be less than 2.8Mb";
                this.setState({errors: change, image: null});
            }
        }
        else{

        }
    }
    deleteIngredient=(cat, el)=>{
        console.log("category ", cat, el);   
        let statetemp = [...this.state.ingredients];
        let descs = statetemp.filter(ele=> ele.for == cat)[0];
        console.log("descs", descs.description)
        const changestate = descs.description.filter(elem => {
            return elem.text !== el.text;
        });
        const change2 = statetemp.map(ele =>{
            if(ele.for ==cat){
                ele.description = changestate;
            }
            return ele;
        })
        console.log("change delete state ", changestate);
        this.setState({ingredients: change2});
    }
    deleteInstruction(el){
        console.log("desle ")
        //console.log("category ", cat, el);   
        let statetemp = [...this.state.preinstruction];
        //let descs = statetemp.filter(ele=> ele.for == cat)[0];
        //console.log("descs", descs.description)
        const changestate = statetemp.filter(elem => {
            return elem.text !== el.text;
        });
       /* const change2 = statetemp.map(ele =>{
            if(ele.for ==cat){
                ele.description = changestate;
            }
            return ele;
        })
        console.log("change delete state ", changestate);
        */
        this.setState({preinstruction: changestate});
    }
    removeSelectedCategory=(cat)=>{
        console.log("cat ", cat);
        const recats = this.state.cats.filter(ca => ca._id !== cat._id);
        console.log(" recat ", recats);
        this.setState({cats: recats});
    }
    updateInstruction(el){
        //console.log("category ", cat, el);
        //console.log("category ", el, this.state.preinstructiontemp);
        if(el.update){
            
            let statetemp = [...this.state.preinstruction];
            
            //console.log("descs", statetemp)
            const changestate = statetemp.map(elem => {
                if(elem.text == el.text){
                    elem.update =false;
                    elem.text = this.state.preinstructiontemp;
                }
                return elem;
            });
            /*const change2 = statetemp.map(ele =>{
                if(ele.for ==cat){
                    ele.description = changestate;
                }
                return ele;
            })
            */
            //console.log("change state ", changestate);
            this.setState({preinstruction: changestate, preinstructiontemp: ''});
        }else{
            let statetemp = [...this.state.preinstruction];
            //let descs = statetemp.filter(ele=> ele.for == cat)[0];
            //console.log("descs", descs.description)
            const changestate = statetemp.map(elem => {
                if(elem.text == el.text){
                    elem.update =true;
                }
                return elem;
            });
            /*const change2 = statetemp.map(ele =>{
                if(ele.for ==cat){
                    ele.description = changestate;
                }
                return ele;
            })*/
            console.log("change state ", changestate);
            this.setState({preinstruction: changestate, preinstructiontemp: el.text});
        }
        
    }
    onChangeRadio=(e)=>{
        e.preventDefault();
        console.log("onChangeRadio ", e.target.value);
        this.setState({status: e.target.value});
    }
    render(){
        
        const dataschema = {
            _id: null, 
            name: '', 
            special: false, 
        }
        const errors = this.state.errors;
        const maincategories = this.props.maincategory.maincategories;
        const recipes = this.props.recipe.recipes;
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
                            <label >Title</label>
                            <input type="text"  onChange = {(e)=>this.onChange(e)} 
                            className={["form-control", !isEmpty(errors.title)?  'is-invalid': ''].join(' ')}
                            name = "title"  value = {this.state.title}
                            placeholder= "Recipe title"/>
                            <small className="form-text text-muted">Recipe title</small>
                            {!isEmpty(errors.title) && <div className="invalid-feedback">{errors.title}</div>}
                        </div>
                        <div className="form-group">
                            <div className="imagediv">
                                <img src={this.state.image ? URL.createObjectURL(this.state.image) : this.state.imagelink ? this.state.imagelink :  "http://www.laramiejubileedays.net/images/100x100.gif"} alt="altdd"/> 
                                <div className="imagediv__desc">
                                    <input type = "file" name = "name" accept="image/jpeg" onChange = {(e)=>this.fileChangeHandler(e)} />
                                    <p className = "myerror">{errors.imagelink ?  errors.imagelink : ' '}</p>
                                    {this.state.image ?<p>Image Name: {this.state.image ? this.state.image.name: 'no image'}</p> : null } 
                                    {this.state.image ?<p>Image Size: {this.state.image ? this.state.image.size: '0'}</p>: null}
                                    {this.state.image ?<p>Image Type: {this.state.image ? this.state.image.type: ''}</p> : null}
                                </div>
                                
                            </div>    
                        </div> 
                        <div className="form-group">
                            <label >Youtube</label>
                            <input type="text"  onChange = {(e)=>this.onChange(e)} 
                            className={["form-control", !isEmpty(errors.youtube)?  'is-invalid': ''].join(' ')}
                            name = "youtube"  value = {this.state.youtube}
                            placeholder= "Recipe youtube"/>
                            <small className="form-text text-muted">Recipe youtube</small>
                            {!isEmpty(errors.youtube) && <div className="invalid-feedback">{errors.youtube}</div>}
                        </div>
                        <div className="form-group">
                            <label >Recipe link</label>
                            <input type="text"  onChange = {(e)=>this.onChange(e)} 
                            className={["form-control", !isEmpty(errors.link)?  'is-invalid': ''].join(' ')}
                            name = "link"  value = {this.state.link}
                            placeholder= "Recipe link"/>
                            <small className="form-text text-muted">Recipe link</small>
                            {!isEmpty(errors.link) && <div className="invalid-feedback">{errors.link}</div>}
                        </div>
                        <div className="form-group">
                            <label >Cooktime</label>
                            <input type="text"  onChange = {(e)=>this.onChange(e)} 
                            className={["form-control", !isEmpty(errors.cooktime)?  'is-invalid': ''].join(' ')}
                            name = "cooktime"  value = {this.state.cooktime}
                            placeholder= "Recipe cooktime"/>
                            <small className="form-text text-muted">Cooktime</small>
                            {!isEmpty(errors.cooktime) && <div className="invalid-feedback">{errors.cooktime}</div>}
                        </div>
                        <div className="form-group">
                            <label >Preparation</label>
                            <input type="text"  onChange = {(e)=>this.onChange(e)} 
                            className={["form-control", !isEmpty(errors.preparation)?  'is-invalid': ''].join(' ')}
                            name = "preparation"  value = {this.state.preparation}
                            placeholder= "Recipe preparation"/>
                            <small className="form-text text-muted">preparation</small>
                            {!isEmpty(errors.preparation) && <div className="invalid-feedback">{errors.preparation}</div>}
                        </div>
                        <div className="form-group">
                            <label >Episode</label>
                            <input type="text"  onChange = {(e)=>this.onChange(e)} 
                            className={["form-control", !isEmpty(errors.episode)?  'is-invalid': ''].join(' ')}
                            name = "episode"  value = {this.state.episode}
                            placeholder= "Recipe episode"/>
                            <small className="form-text text-muted">Episode</small>
                            {!isEmpty(errors.episode) && <div className="invalid-feedback">{errors.episode}</div>}
                        </div>
                        
                        <div className="form-group">
                            <label >Seen</label>
                            <input type="text"  onChange = {(e)=>this.onChange(e)} 
                            className={["form-control", !isEmpty(errors.seen)?  'is-invalid': ''].join(' ')}
                            name = "seen"  value = {this.state.seen}
                            placeholder= "Recipe seen"/>
                            <small className="form-text text-muted">Number of people seen recipe</small>
                            {!isEmpty(errors.seen) && <div className="invalid-feedback">{errors.seen}</div>}
                        </div>
                        <div className="form-group">
                            <label >Serves</label>
                            <input type="text"  onChange = {(e)=>this.onChange(e)} 
                            className={["form-control", !isEmpty(errors.serves)?  'is-invalid': ''].join(' ')}
                            name = "serves"  value = {this.state.serves}
                            placeholder= "Recipe serves"/>
                            <small className="form-text text-muted">Recipe serves</small>
                            {!isEmpty(errors.serves) && <div className="invalid-feedback">{errors.serves}</div>}
                        </div>
                        <div className="groupborder">
                            <div className="form-group mb-0 row p-side-3">
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
                            {!isEmpty(errors.category) && <div className="myinvalid-feedback">{errors.category}</div>}
                            <div className = "cat_list">
                                <ul>
                                    {this.state.cats.map(cat=>{
                                        return(<li key = {cat._id} className = "flexbox-row">
                                                    <div className = "mr-auto">{cat.name}</div>
                                                    <button className = "mybtn btn-delete" 
                                                    onClick = {()=> this.removeSelectedCategory(cat)}>remove
                                                    </button>
                                                    
                                            </li>);
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className="groupborder">
                            <div className="form-group mb-0 row p-side-3">
                                <label  className = "col-sm-12">Instruction</label>
                                <input type="text"  onChange = {(e)=>this.onChange(e)} 
                                
                                className={["form-control", "col-sm-9","mb-3",  !isEmpty(errors.instruction)?  'is-invalid': ''].join(' ')}
                                name = "instruction"  value = {this.state.instruction}
                                placeholder= "Recipe Instruction"/>
                                <div className = "col-sm-1"></div>
                                <button className = "btn btn-purple col-sm-2 mb-3 " onClick = {()=>this.instuctionAdded()}>Select</button>
                            </div>
                            {!isEmpty(errors.preinstruction) && <div className="myinvalid-feedback">{errors.preinstruction}</div>}
                            <div className = "cat_list">
                                <ul className = "mylistol">
                                    {this.state.preinstruction.map((el, index)=>
                                                            {
                            if(!isEmpty(el.text))
                                return(
                                    <li key = {el.text} className = "flexbox-row"> <span> &nbsp;</span>
                                        {el.update ? 
                                        <div className = "mr-auto">
                                        <input type = "text" onChange = {(e)=> 
                                            {this.setState({preinstructiontemp: e.target.value}); }} 
                                            value = {this.state.preinstructiontemp}/> 
                                            </div>: 
                                            <div className = "mr-auto">{el.text}</div>
                                        }
                                    <button className = "mybtn btn-update"  
                                    onClick ={(  )=>this.updateInstruction(el)}>{el.update ? "Save" : "Update"}</button> 
                                    <button className = "mybtn btn-delete" onClick = {(e)=> this.deleteInstruction(el)} >delete</button>
                                    
                                    </li>
                                                );
                                            else return null;}
                                                
                                                
                                                )
                                    }
                                </ul>
                            </div>
                        </div>
                        
                        <div className="groupborder">
                                <div className="form-group mb-0 row p-side-3">
                                    <label  className = "col-sm-12">Ingredient for: </label>
                                    <input type="text"  onChange = {(e)=>this.onChange(e)} 
                                    
                                    className={["form-control", "col-sm-9","mb-3",  !isEmpty(errors.ingredientfor)?  'is-invalid': ''].join(' ')}
                                    name = "ingredientfor"  value = {this.state.ingredientfor}
                                    placeholder= "Ingredient for..."/>
                                    <div className = "col-sm-1"></div>
                                    <button className = "btn btn-purple col-sm-2 mb-3 " onClick = {()=>this.ingForAdded()}>Add</button>
                                    {!isEmpty(errors.ingredientfor) && <div className="invalid-feedback col-sm-12">{errors.ingredientfor}</div>}
                                </div>
                                
                                <div className = "ingredientmodalrow">
                                    
                                        {this.state.ingredients.map((cat, index)=>{
                                           // console.log(" ingreints ", cat);
                                            return(<div key = {index} className = "mr-3">
                                            <input type = "radio" id = {'ingfor'+index} name = "ingfor" onChange = {(e)=>this.selectForHandler(e)}  value = {cat.for} checked = {cat.for===this.state.selectedfor}/>
                                            <label htmlFor = {'ingfor'+index}>{cat.for}</label>
                                            </div>
                                            );
                                        })}
                                    
                                </div>
                                
                                <div className="form-group mb-0 row p-side-3">
                                    <label  className = "col-sm-12">Ingredient name size: </label>
                                    <input type="text"  onChange = {(e)=>this.onChange(e)} 
                                    
                                    className={["form-control", "col-sm-9","mb-3",  !isEmpty(errors.ingredient)?  'is-invalid': ''].join(' ')}
                                    name = "ingredient"  value = {this.state.ingredient}
                                    placeholder= "Ingredient"/>
                                    <div className = "col-sm-1"></div>
                                    <button className = "btn btn-purple col-sm-2 mb-3 " onClick = {()=>this.ingredientAdded()}>Select</button>
                                    {!isEmpty(errors.ingredient) && <div className="invalid-feedback col-sm-12">{errors.ingredient}</div>}
                                </div>
                                {!isEmpty(errors.ingredients) && <div className="myinvalid-feedback">{errors.ingredients}</div>}
                                <div className = "cat_list">
                                    <ul >
                                        {this.state.ingredients.map((cat, index)=>{
                                            return(<li key = {index}>
                                                        {cat.for}
                                                        <ol className = "mylist">
                                                        {
                                                            cat.description.map(el=>
                                                                {
                                                                if(!isEmpty(el.text))
                                                                    return(
                                                            <li key = {el.text} className = "flexbox-row">
                                                                {el.update ? 
                                                                <div className = "mr-auto">
                                                                
                                                                
                                                                <input type = "text" onChange = {(e)=> 
                                                                    {this.setState({ingreupdatetemp: e.target.value}); }} 
                                                                    value = {this.state.ingreupdatetemp}/> 
                                                                    </div>: 
                                                                    <div className = "mr-auto">{el.text}</div>
                                                                }
                                                                    <button className = "mybtn btn-update"  
                                                                    onClick ={(  )=>this.updateIngredient(cat.for, el)}>{el.update ? "Save" : "Update"}</button> 
                                                                    <button className = "mybtn btn-delete" onClick = {(e)=> this.deleteIngredient(cat.for, el)} >delete</button></li>
                                                                    );
                                                                    else return null;}
                                                                    )
                                                        }
                                                        </ol>
                                                </li>);
                                        })}
                                    </ul>
                                </div>
                        </div>
                        <div className="groupborder">
                            <label >Recipe status</label>
                            <div className="form-group p-side-3">
                                <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="status" id="inlineRadio1" onChange ={(e)=> this.onChangeRadio(e)} value="active" checked = {this.state.status ==='active'}/>
                                <label className="form-check-label" htmlFor="inlineRadio1">active</label>
                                </div>
                                <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="status" onChange ={(e)=> this.onChangeRadio(e)} checked = {this.state.status === 'inactive'} id="inlineRadio2" value="inactive"/>
                                <label className="form-check-label" htmlFor="inlineRadio2">inactive</label>
                                </div>
                                {!isEmpty(errors.status) && <div className="myinvalid-feedback">{errors.status}</div>}
                            </div>
                        </div>
                        
                </Modal>
               
                <div className = "templateBoard__second">
                <div className="table-responsive">  
                        
                    <table className="table table-hover table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th></th>
                            <th>Name</th>
                            <th>Link</th>
                            <th>Categories</th>
                            <th>Seen</th>
                            <th>Serves</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                                recipes.map((cat, index) =>{
                                    return(<tr key = {index}>
                                        <td>{index+1}</td>
                                        <td>
                                            <img src = {cat.image} className = "td__image" />
                                        </td>
                                        <td>{cat.title}</td>
                                        <td><a href = {`http://www.laurainthekitchen.com/${cat.link}`}>Link</a></td>
                                        <td>{cat.category.map(cate => (cate.name+", "))}</td>
                                        <td>{cat.seen}</td>
                                        <td>{cat.serves}</td>
                                        <td>
                                            <button className = "btn btn-blue mr-2" data-toggle="modal" onClick={()=>this.setUpdateRecipeValue(cat._id)}  data-target="#myModal">Update</button>
                                            
                                        </td>
                                        <td>
                                        <button className = "btn btn-orange" onClick = {()=>this.props.deleteRecipe(cat._id)} >Delete</button>
                                        </td>
                                        
                                    </tr>)
                                })
                            }
                        
                        
                        </tbody>
                    </table>
                    
                    </div>
                   <Pagination total = {this.props.recipe.total} page = {this.props.recipe.page}/>
                </div>
            </div>
        )
    }
}
const mapStateToProgs =(state)=>({
    auth: state.auth, 
    category: state.category, 
    maincategory: state.maincategory,
    errors: state.errors, 
    recipe: state.recipe
});
export default connect(mapStateToProgs, { allCategory, updateRecipe, addRecipe, deleteRecipe, getRecipeAll})(MainCategory);