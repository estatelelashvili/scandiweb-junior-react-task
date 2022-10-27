import React, { Component } from 'react';
import { MiniCart } from './MiniCart';
import { Product } from './Product';

export class PLP extends Component {
  constructor(props) {
    super(props);
    // this.retrieveSelectedProduct = this.retrieveSelectedProduct.bind(this);
  }

  // state = {
  //   selectedProductAttributes: {},
  // };

  // retrieveSelectedProduct(productAttributes) {
  //   this.setState({ selectedProductAttributes: productAttributes });
  // }
  render() {
    return (
      <div>
        {this.props.filteredData.map(({ name, products }) => {
          return (
            <div key={name} className='minicart-parent-container'>
              <MiniCart
                MiniCartIsHidden={this.props.MiniCartIsHidden}
                MyBag={this.props.MyBag}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                SelectedCurrency={this.props.SelectedCurrency}
                // productAttributes={this.state.selectedProductAttributes}
              />
              <h1>{name}</h1>
              <div className='PLP-grid'>
                {products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    MyBag={this.props.MyBag}
                    onAdd={this.props.onAdd}
                    onRemove={this.props.onRemove}
                    // retrieveSelectedProduct={this.retrieveSelectedProduct}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
