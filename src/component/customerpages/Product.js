import React from 'react';

class Product extends React.Component{
    render(){
        return(
            <div className="product" onClick = {this.props.onClick}>
                
                <img className = "product__image" src={this.props.image} alt=""/>
                <h3 className="product__title">{this.props.title}</h3>
                <p className="product__seen"> 
                    <i className="material-icons">remove_red_eye</i>
                    {this.props.seen}
                </p>
                <p className="product__serves"> 
                    <i className="material-icons">restaurant</i>
                    {this.props.serves}
                </p>
            </div>
        );
    }
}
export default Product;