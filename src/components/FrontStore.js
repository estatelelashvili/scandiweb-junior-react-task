import React, { Component, Fragment } from 'react';
import { gql } from '@apollo/client';
import { GET_PRODUCTS } from '../gql/queries';
import { client } from '../gql/queries';
import { NavBar } from './Navbar';
import { PLP } from './PLP';

export class FrontStore extends Component {
  constructor(props) {
    super(props);
    this.handlePickCategory = this.handlePickCategory.bind(this);
  }
  state = {
    data: [],
    categoryName: 'all',
  };

  handlePickCategory = (event) => {
    this.setState({
      categoryName: event.target.innerText.toLowerCase(),
    });
  };

  getProducts() {
    client
      .query({
        query: gql`
          ${GET_PRODUCTS}
        `,
      })
      .then((result) => {
        this.setState({
          data: result.data.categories,
        });
      });
  }
  componentDidMount() {
    this.getProducts();
  }
  render() {
    return (
      <Fragment>
        <NavBar
          data={this.state.data}
          category={this.state.categoryName}
          passedHandlePickCategory={this.handlePickCategory}
        />
        <PLP
          filteredData={this.state.data.filter(
            (category) => category.name === this.state.categoryName
          )}
        />
      </Fragment>
    );
  }
}
