import React, { Component } from 'react';

import './CurrencySwitcher.css';

export class CurrencySwitcher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  change = (event) => {
    const currencySymbolMap = {
      USD: '$',
      AUD: 'A$',
      RUB: '₽',
      GBP: '£',
      JPY: '¥',
    };
    this.setState({ value: event.target.value });
    this.props.SelectCurrency(event.target.value);
  };

  render() {
    const currencySymbolMap = {
      USD: '$',
      AUD: 'A$',
      RUB: '₽',
      GBP: '£',
      JPY: '¥',
    };
    const PriceArr = this.props.data
      .map(({ name, products }) =>
        products.map((product) =>
          product.prices.map((price) => price.currency.label)
        )
      )
      .map((item) => item[0])[0];
    if (PriceArr) {
      console.log(
        this.props.data
          .map(({ name, products }) =>
            products.map((product) =>
              product.prices.map((price) => price.currency.label)
            )
          )
          .map((item) => item[0])[0][0]
      );
    }

    return (
      <form>
        <select
          className='currency-sign'
          onChange={this.change}
          value={this.state.value}
        >
          {PriceArr
            ? PriceArr.map((curr, i) => (
                <option key={i} value={curr}>
                  {currencySymbolMap[curr]} {curr}
                </option>
              ))
            : ''}
        </select>
      </form>
    );
  }
}
