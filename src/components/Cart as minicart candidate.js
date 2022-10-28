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

    return this.props.cartIsShown ? (
      <div className='allWrapperCart'>
        <div className='close-btnCart'>
          <button
            className='close-btnCart'
            onClick={() => this.props.handlePopupClick()}
          >
            X
          </button>
        </div>
        <div className='wrapperCart'>
          <div className='mottoCart'>CART</div>
          {uniqueProducts.map(
            ({ productName, prices, imgArr, properties, ...rest }, k) => (
              <Fragment key={k}>
                <hr className='lineR' />
                <div className='productBrandCart'>
                  {uniqueProducts[k].brand}
                </div>
                <div className='productNameCart'>{uniqueProducts[k].name}</div>
                <div className='trio'>
                  <button
                    className='plusBTNCart'
                    onClick={() =>
                      this.props.onAdd(
                        uniqueProducts[k],
                        productName,
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
                  ? properties.map(({ ProductId, name, type, items }, j) => {
                      return type === 'text' ? (
                        <Fragment key={j}>
                          <div className='attributeContainerCart'>
                            <div className='attributeNameCart'>{name}</div>
                            {items.map(({ displayValue, value, id }, i) => (
                              <div className='attributeItemsCart' key={id}>
                                {value}
                              </div>
                            ))}
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment key={j}>
                          <div className='attributeContainerCart'>
                            <div className='attributeNameCart'>{name}</div>
                            {items.map(({ displayValue, value, id }, i) => (
                              <div
                                key={id}
                                className='attributeItemsCart swatchBoxGridCart'
                                style={{ background: value }}
                              ></div>
                            ))}
                          </div>
                        </Fragment>
                      );
                    })
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
