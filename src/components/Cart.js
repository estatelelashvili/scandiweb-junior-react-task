import React, { Fragment, Component } from 'react';
import '../styles/Cart.css';
import CarouselHorizontal from './Carousel/CarouselHorizontal';

export class Cart extends Component {
  render() {
    let CURR = this.props.SelectedCurrency;
    // let symbol = this.props.currencySymbol;
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

    return this.props.cartIsShown ? (
      <div className='allWrapperCart'>
        <div className='close-btnCart'>
          <button
            className='close-btnCart'
            onClick={() => this.props.toggleCart()}
          >
            X
          </button>
        </div>
        <div className='wrapperCart'>
          <div className='mottoCart'>CART</div>
          {uniqueProducts.map(
            (
              { productName, brand, prices, imgArr, properties, ...rest },
              k
            ) => (
              <Fragment key={k}>
                <hr className='lineR' />
                <div className='productBrandCart'>{brand}</div>
                <div className='productNameCart'>{productName}</div>
                <div className='trio'>
                  <button
                    className='plusBTNCart'
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

                  <p className='itemCounterCart'>
                    {
                      this.props.MyBag.filter(
                        (item) =>
                          JSON.stringify(item) ===
                          JSON.stringify(uniqueProducts[k])
                      ).length
                    }
                  </p>
                  <button
                    className='minusBTNCart'
                    onClick={() => this.props.onRemove(uniqueProducts[k])}
                  >
                    -
                  </button>
                </div>
                <div className='carouselCart'>
                  <CarouselHorizontal data={imgArr} />
                </div>
                <div className='itemPriceCart'>
                  {
                    prices.filter((price) => price.currency.label === CURR)[0]
                      .currency.label
                  }{' '}
                  {
                    prices.filter((price) => price.currency.label === CURR)[0]
                      .amount
                  }
                </div>
                {properties
                  ? properties.map(({ ProductId, name, type, items }, j) => (
                      <Fragment key={j}>
                        <div className='attributeContainerCart'>
                          <p className='attribute-title-cart' key={j}>
                            {DeeperKeys[k][j]}
                            {':'}
                          </p>
                          {items.map(({ displayValue, value, id }, i) => {
                            return type === 'text' ? (
                              <Fragment key={j}>
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
                              </Fragment>
                            ) : (
                              <Fragment key={j}>
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
                              </Fragment>
                            );
                          })}
                        </div>
                      </Fragment>
                    ))
                  : ''}
              </Fragment>
            )
          )}
        </div>
      </div>
    ) : (
      ''
    );
  }
}
