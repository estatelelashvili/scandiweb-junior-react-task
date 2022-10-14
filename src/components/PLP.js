import React, { Component } from 'react';
import { Product } from './Product';

export class PLP extends Component {
  state = {
    initialCategory: '',
  };
  render() {
    return <Product data={this.props.filteredData} />;
  }
}
