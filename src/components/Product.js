import React, { Component, Fragment } from 'react';
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
    return (
      <Fragment>
        {this.props.data.map(({ name, products }, i) => {
          return (
            <div key={i}>
              <h1 key={i}>{name}</h1>
              {products.map((product) => (
                <div key={product.id}>
                  <p key={product.id}>{product.name}</p>
                  <button onClick={() => this.togglePDP()}>Details</button>
                  <PDP
                    product={product}
                    togglePDP={() => this.togglePDP()}
                    isShown={this.state.isShown}
                  />
                </div>
              ))}
            </div>
          );
        })}
      </Fragment>
    );
  }
}
