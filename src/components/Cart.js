import React, { Fragment, Component } from 'react';
import './Cart.css';
import CarouselHorizontal from '../Carousel/CarouselHorizontal';
class Cart extends Component {
  render() {
    let CURR = this.props.SelectedCurrency;
    let symbol = this.props.currencySymbol;

    return this.props.isClicked ? (
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
          {this.props.MyBag.filter((x, i, a) => a.indexOf(x) === i).map(
            (filtered) => (
              <Fragment key={filtered.id}>
                <hr className='lineR' />
                <div className='productBrandCart'>{filtered.brand}</div>
                <div className='productNameCart'>{filtered.name}</div>
                <div className='trio'>
                  <button
                    className='plusBTNCart'
                    onClick={() => this.props.onAdd(filtered)}
                  >
                    +
                  </button>

                  <p className='itemCounterCart'>
                    {
                      this.props.MyBag.filter((element) => element === filtered)
                        .length
                    }
                  </p>
                  <button
                    className='minusBTNCart'
                    onClick={() => this.props.onRemove(filtered)}
                  >
                    -
                  </button>
                </div>
                <div className='carouselCart'>
                  <CarouselHorizontal data={filtered.gallery} />
                </div>
                <div className='itemPriceCart'>
                  {symbol}{' '}
                  {
                    filtered.prices.filter((x) => x.currency.label === CURR)[0]
                      .amount
                  }
                </div>
                {filtered.attributes.map((attribute) => {
                  return attribute.type === 'text' ? (
                    <Fragment key={attribute.ProductId}>
                      <div className='attributeContainerCart'>
                        <div className='attributeNameCart'>
                          {attribute.name}
                        </div>
                        {attribute.items.map((item) => (
                          <div className='attributeItemsCart' key={item.id}>
                            {item.value}
                          </div>
                        ))}
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment key={attribute.ProductId}>
                      <div className='attributeContainerCart'>
                        <div className='attributeNameCart'>
                          {attribute.name}
                        </div>
                        {attribute.items.map((item) => (
                          <div
                            key={item.id}
                            className='attributeItemsCart swatchBoxGridCart'
                            style={{ background: item.value }}
                          ></div>
                        ))}
                      </div>
                    </Fragment>
                  );
                })}
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

export default Cart;
