import React, { Component } from 'react';
import { Product } from './Product';

export class PLP extends Component {
  state = {
    initialCategory: '',
  };
  render() {
    return (
      <div>
        {this.props.filteredData.map(({ name, products }) => {
          return (
            <div key={name}>
              <h1>{name}</h1>
              {products.map((product) => (
                <Product
                  key={product.id}
                  data={product}
                  MyBag={this.props.MyBag}
                  onAdd={this.props.onAdd}
                  // pickAttributes={this.props.pickAttributes}
                />
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
