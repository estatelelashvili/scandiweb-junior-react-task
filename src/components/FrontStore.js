import React, { Component } from 'react';
import { gql } from '@apollo/client';
import { GET_PRODUCTS } from '../gql/queries';
import { client } from '../gql/queries';
import { NavBar } from './Navbar';

export class FrontStore extends Component {
  constructor(props) {
    super(props);
    this.handlePickCategory = this.handlePickCategory.bind(this);
  }
  state = {
    data: [],
    categoryName: '',
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
    console.log(
      this.state.data.filter(
        (category) => category.name === this.state.categoryName
      )
    );

    return (
      <NavBar
        data={this.state.data}
        category={this.state.categoryName}
        passedHandlePickCategory={this.handlePickCategory}
      />
    );
  }
}
