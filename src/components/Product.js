import React, { Component } from 'react';
import { PDP } from './PDP';
export class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShown: false,
    };
  }

  togglePDP() {
    this.setState({ isShown: !this.state.isShown });
  }

  render() {
    const product = this.props.data;
    return (
      <div key={product.id} className='product-card'>
        <img className='product-thumbnail' src={product.gallery[0]} />
        <p>{product.name}</p>
        <p>$ Money</p>
        <button onClick={() => this.togglePDP()}>Details</button>
        <PDP
          product={product}
          togglePDP={() => this.togglePDP()}
          isShown={this.state.isShown}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          MyBag={this.props.MyBag}
          retrieveSelectedProduct={this.props.retrieveSelectedProduct}
        />
      </div>
    );
  }
}
