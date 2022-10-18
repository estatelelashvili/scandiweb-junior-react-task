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
      <div>
        <p>{product.name}</p>
        <button onClick={() => this.togglePDP()}>Details</button>
        <PDP
          product={product}
          togglePDP={() => this.togglePDP()}
          isShown={this.state.isShown}
          onAdd={this.props.onAdd}
          MyBag={this.props.MyBag}
          // pickAttributes={this.props.pickAttributes}
        />
      </div>
    );
  }
}
