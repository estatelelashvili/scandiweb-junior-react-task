import React, { Component, Fragment } from 'react';
import { gql } from '@apollo/client';
import { GET_PRODUCTS } from '../gql/queries';
import { client } from '../gql/queries';
import { NavBar } from './Navbar';
import { PLP } from './PLP';
import { MiniCart } from './MiniCart';

export class FrontStore extends Component {
  constructor(props) {
    super(props);
    this.handlePickCategory = this.handlePickCategory.bind(this);
    this.toggleMiniCart = this.toggleMiniCart.bind(this);
  }
  state = {
    data: [],
    categoryName: 'all',
    // MyBag: [],
    MyBag: JSON.parse(localStorage.getItem('CartContent')) || [],
    MiniCartIsHidden: true,
  };

  toggleMiniCart() {
    this.setState({ MiniCartIsHidden: !this.state.MiniCartIsHidden });
  }

  handleAddItem = (item, name, costs, images) => {
    // const { productName, prices, properties, ...rest } = item;
    // const productKeysExist = attributes.map(
    //   ({ ProductId, name, type, items }, j) => Object.keys(items)
    // );
    // console.log(productKeysExist.length);
    // console.log(properties);
    // const currencyMap = { USD: '$', AUD: 'A$', RUB: '₽', GBP: '£', JPY: '¥' };
    // item.symbol = currencyMap[currency];

    // if (
    //   properties !== undefined &&
    //   rest !== undefined &&
    //   Object.entries(rest).length === properties.length
    // ) {
    item.productName = name;
    item.prices = costs;
    item.imgArr = images;

    let allProducts = [...this.state.MyBag];
    allProducts.push(item);
    this.setState({ MyBag: allProducts });

    localStorage.setItem('CartContent', JSON.stringify(this.state.MyBag));
    // }
    // else {
    //   alert('Please select all options!');
    // }
  };

  handleRemoveItem = (item) => {
    let allProducts = [...this.state.MyBag];
    const isMatch = (element) =>
      JSON.stringify(element) === JSON.stringify(item);
    let index = allProducts.findLastIndex(isMatch);
    if (index > -1) {
      allProducts.splice(index, 1);
    }

    this.setState({ MyBag: allProducts });
    localStorage.setItem('CartContent', JSON.stringify(this.state.MyBag));
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
    // localStorage.setItem('CartItems', JSON.stringify({ total: 999 }));
  }
  render() {
    // localStorage.setItem('CartContent', JSON.stringify({}));
    localStorage.setItem('CartContent', JSON.stringify(this.state.MyBag));
    // console.log(JSON.parse(localStorage.getItem('CartContent')) || []);
    return (
      <Fragment>
        <NavBar
          data={this.state.data}
          category={this.state.categoryName}
          passedHandlePickCategory={this.handlePickCategory}
          toggleMiniCart={this.toggleMiniCart}
        />
        {/* <MiniCart
          MiniCartIsHidden={this.state.MiniCartIsHidden}
          MyBag={this.state.MyBag}
          onAdd={this.handleAddItem}
          onRemove={this.handleRemoveItem}
        /> */}
        <PLP
          filteredData={this.state.data.filter(
            (category) => category.name === this.state.categoryName
          )}
          orders={this.state.orders}
          MyBag={this.state.MyBag}
          onAdd={this.handleAddItem}
          onRemove={this.handleRemoveItem}
          MiniCartIsHidden={this.state.MiniCartIsHidden}
        />
      </Fragment>
    );
  }
}
