import React, { Component, Fragment } from 'react';
import { gql } from '@apollo/client';
import { GET_PRODUCTS } from '../gql/queries';
import { client } from '../gql/queries';
import { NavBar } from './Navbar';
import { PLP } from './PLP';
import { currencySymbolMap } from './CurrencySymbolMap';

export class FrontStore extends Component {
  constructor(props) {
    super(props);
    this.handlePickCategory = this.handlePickCategory.bind(this);
    this.toggleMiniCart = this.toggleMiniCart.bind(this);
  }
  state = {
    data: [],
    categoryName: '',
    SelectedCurrency: '',
    MyBag: JSON.parse(localStorage.getItem('CartContent')) || [],
    MiniCartIsHidden: true,
    currencySymbol: '',
  };

  toggleMiniCart() {
    this.setState({ MiniCartIsHidden: !this.state.MiniCartIsHidden });
  }

  handleAddItem = (item, name, brand, costs, images) => {
    item.productName = name;
    item.brand = brand;
    item.prices = costs;
    item.imgArr = images;

    let allProducts = [...this.state.MyBag];
    allProducts.push(item);
    this.setState({ MyBag: allProducts });

    localStorage.setItem('CartContent', JSON.stringify(this.state.MyBag));
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
          categoryName: result.data.categories.map(
            (category) => category.name
          )[0],
          SelectedCurrency: result.data.categories
            .map(({ name, products }) =>
              products.map((product) =>
                product.prices.map((price) => price.currency.label)
              )
            )
            .map((item) => item[0])[0][0],
          currencySymbol:
            currencySymbolMap[
              result.data.categories
                .map(({ name, products }) =>
                  products.map((product) =>
                    product.prices.map((price) => price.currency.label)
                  )
                )
                .map((item) => item[0])[0][0]
            ],
        });
      });
  }

  SelectCurrency(arg) {
    this.setState({
      SelectedCurrency: arg,
      currencySymbol: currencySymbolMap[arg],
    });
  }

  componentDidMount() {
    this.getProducts();
  }
  render() {
    localStorage.setItem('CartContent', JSON.stringify(this.state.MyBag));
    return (
      <Fragment>
        <NavBar
          data={this.state.data}
          MyBag={this.state.MyBag}
          filteredData={this.state.data.filter(
            (category) => category.name === this.state.categoryName
          )}
          category={this.state.categoryName}
          passedHandlePickCategory={this.handlePickCategory}
          toggleMiniCart={this.toggleMiniCart}
          SelectCurrency={(e) => this.SelectCurrency(e)}
        />
        <PLP
          filteredData={this.state.data.filter(
            (category) => category.name === this.state.categoryName
          )}
          orders={this.state.orders}
          MyBag={this.state.MyBag}
          onAdd={this.handleAddItem}
          onRemove={this.handleRemoveItem}
          MiniCartIsHidden={this.state.MiniCartIsHidden}
          SelectedCurrency={this.state.SelectedCurrency}
          currencySymbol={this.state.currencySymbol}
          toggleMiniCart={this.toggleMiniCart}
        />
      </Fragment>
    );
  }
}
