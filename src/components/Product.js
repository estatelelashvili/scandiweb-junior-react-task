import React, { Component, Fragment } from 'react';

export class Product extends Component {
  render() {
    return (
      <Fragment>
        {this.props.data.map(({ name, products }, i) => {
          return (
            <div key={i}>
              <h1 key={i}>{name}</h1>
              {products.map((product) => (
                <p key={product.id}>{product.name}</p>
              ))}
            </div>
          );
        })}
      </Fragment>
    );
  }
}
