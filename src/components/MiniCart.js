import React, { Component } from 'react';
import { Cart } from './Cart';

export class MiniCart extends Component {
  constructor(props) {
    super(props);
    this.toggleCart = this.toggleCart.bind(this);

    this.state = {
      cartIsShown: false,
    };
  }

  toggleCart() {
    this.setState({ cartIsShown: !this.state.cartIsShown });
  }
  render() {
    const CURR = this.props.SelectedCurrency;
    let TOTAL = this.props.MyBag.map(
      (item) => item.prices.filter((x) => x.currency.label === CURR)[0].amount
    ).reduce((prev, curr) => prev + curr, 0);
    const uniqueProducts = Array.from(
      new Set(this.props.MyBag.map((object) => JSON.stringify(object)))
    ).map((string) => JSON.parse(string));

    let testItems = uniqueProducts.map(
      ({ productName, price, symbol, properties, ...rest }) => rest
    );

    const keys = testItems.map((item) => Object.keys(item));
    const DeeperKeys = testItems
      .map((item) => Object.keys(item).map((key) => item[key]))
      .map((elements) =>
        elements.map((element) => Object.keys(element).map((keys) => keys))
      );

    const DeeperValues = testItems
      .map((item) => Object.keys(item).map((key) => item[key]))
      .map((elements) =>
        elements.map((element) =>
          Object.keys(element).map((keys) => element[keys])
        )
      );

    return this.props.MiniCartIsHidden ? (
      ''
    ) : (
      <div className='allWrapper'>
        <div className='myBagMC'>My Bag: {this.props.MyBag.length} items</div>
        <div className='cartWrapper'>
          {uniqueProducts.map(
            (
              { productName, brand, prices, imgArr, properties, ...rest },
              k
            ) => (
              <div className='cart-wrapper'>
                <hr className='lineRC' />
                <div className='cart-wrapper-main'>
                  <div key={k} className='mini-cart-intro-container'>
                    <p>{brand}</p>
                    <p>{productName}</p>
                    <p>
                      {this.props.currencySymbol}{' '}
                      {
                        prices.filter(
                          (price) => price.currency.label === CURR
                        )[0].amount
                      }
                    </p>
                  </div>
                  <div className='btn-trio-mini-cart'>
                    <button
                      onClick={() =>
                        this.props.onAdd(
                          uniqueProducts[k],
                          productName,
                          brand,
                          prices,
                          imgArr
                        )
                      }
                    >
                      +
                    </button>
                    <p className='item-counter'>
                      {
                        this.props.MyBag.filter(
                          (item) =>
                            JSON.stringify(item) ===
                            JSON.stringify(uniqueProducts[k])
                        ).length
                      }
                    </p>
                    <button
                      onClick={() => this.props.onRemove(uniqueProducts[k])}
                    >
                      -
                    </button>
                  </div>
                  <img className='mini-cart-img' src={imgArr[0]} />
                </div>
                {properties
                  ? properties.map(({ ProductId, name, type, items }, j) => (
                      <div key={j} className='prop-container'>
                        <p key={j} className='selected-attribute'>
                          {DeeperKeys[k][j]}
                        </p>
                        {items.map(({ displayValue, value, id }, i) => {
                          return type === 'text' ? (
                            <div key={id}>
                              {+keys[k][j] === j &&
                              DeeperValues[k][j][0] === value ? (
                                <p key={i} className='selected-attribute'>
                                  {value}
                                </p>
                              ) : (
                                <p key={i} className='text-attribute'>
                                  {value}
                                </p>
                              )}
                            </div>
                          ) : (
                            <div key={id}>
                              {+keys[k][j] === j &&
                              DeeperValues[k][j][0] === value ? (
                                <p
                                  key={i}
                                  className='selected-attribute-swatch'
                                  style={{ background: value }}
                                ></p>
                              ) : (
                                <p
                                  key={i}
                                  className='swatch-attribute'
                                  style={{ background: value }}
                                ></p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))
                  : ''}
              </div>
            )
          )}
        </div>
        <div className='totalAmount'>
          <div className='amountTitle'>Total</div>
          <div className='amountPrice'>
            {this.props.currencySymbol} {Math.floor(TOTAL)}
          </div>
        </div>
        <div className='buttonManagment'>
          <button className='viewBagBTN' onClick={() => this.toggleCart()}>
            view bag
          </button>

          <button
            className='checkOutBTN'
            onClick={() => this.props.toggleMiniCart()}
          >
            check out
          </button>
        </div>
        <Cart
          cartIsShown={this.state.cartIsShown}
          toggleCart={this.toggleCart}
          MyBag={this.props.MyBag}
          onAdd={this.props.onAdd}
          onRemove={this.props.onRemove}
          SelectedCurrency={this.props.SelectedCurrency}
        />
      </div>
    );
  }
}
