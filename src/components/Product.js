import React, { Component } from 'react';
import { PDP } from './PDP';
import productLogo from '../images/cartBuy.png';

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
    const product = this.props.data;
    let outOfStockTxt = '';
    let outOfStockID = '';
    const CURR = this.props.SelectedCurrency;
    const symbol = this.props.currencySymbol;

    if (!product.inStock) {
      outOfStockTxt = 'out of stock';
      outOfStockID = 'imageID';
    }

    return (
      <div key={product.id} className='card_item'>
        <div className='card_inner'>
          <div id={outOfStockID}>
            <img className='imgCard' src={product.gallery[0]} alt='not found' />
            <p>{outOfStockTxt}</p>
          </div>
          <div className='cardNameN'>{product.name}</div>
          <div className='cardPrice'>
            {' '}
            {symbol}
            {product.prices.filter((x) => x.currency.label === CURR)[0].amount}
          </div>
          <div className='overlay'></div>
          <div className='button'>
            <input
              type='image'
              src={productLogo}
              alt='Submit'
              width='28'
              height='28'
              onClick={() => this.togglePDP()}
            />
          </div>
          <div className='inStock'>{product.prices.amount}</div>
        </div>
        <PDP
          product={product}
          togglePDP={() => this.togglePDP()}
          isShown={this.state.isShown}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          MyBag={this.props.MyBag}
          SelectedCurrency={this.props.SelectedCurrency}
          currencySymbol={this.props.currencySymbol}
          toggleModal={this.props.toggleModal}
          toggleOutOfStockModal={this.props.toggleOutOfStockModal}
          toggleAddModal={this.props.toggleAddModal}
        />
      </div>
    );
  }
}
