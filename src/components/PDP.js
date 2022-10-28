import React, { Component, Fragment } from 'react';
import CarouselVertical from './Carousel/CarouselVertical';
import '../styles/PDP.css';
export class PDP extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    obj: {},
  };

  pickAttributes = (attribute, value, index, attributes) => {
    this.setState({
      obj: {
        ...this.state.obj,
        [index]: {
          ...this.state.obj.index,
          [attribute]: value,
        },
        properties: attributes,
      },
    });
  };

  combinedPDPClose() {
    this.setState({
      obj: {},
    });
    this.props.togglePDP();
  }

  combinedFunctionsAddProduct() {
    if (this.props.product.inStock) {
      const productKeysExist = this.props.product.attributes.map(
        ({ ProductId, name, type, items }, j) => Object.keys(items)
      );
      const {
        productName,
        brand,
        prices,
        imgArr,
        properties,
        ...rest
      } = this.state.obj;
      let propertyHolder;
      if (properties === undefined) {
        propertyHolder = 404;
      } else {
        propertyHolder = properties.length;
      }
      if (
        productKeysExist.length &&
        (Object.entries(rest).length === 0 ||
          Object.entries(rest).length !== propertyHolder)
      ) {
        // alert('Please select all options!');
        this.props.toggleModal();
        // this.showModal();
      } else {
        this.props.onAdd(
          this.state.obj,
          this.props.product.name,
          this.props.product.brand,
          this.props.product.prices,
          this.props.product.gallery
        );
      }
    } else {
      this.props.toggleOutOfStockModal();
    }
  }

  render() {
    let CURR = this.props.SelectedCurrency;
    let symbol = this.props.currencySymbol;
    return this.props.isShown ? (
      <Fragment>
        <div className='allWrapperPDP'>
          <div className='close-btnPDP'>
            <button
              className='close-btnPDP-inner'
              onClick={() => this.combinedPDPClose()}
            >
              &#10060;
            </button>
          </div>
          <div className='cartWrapperPDP'>
            <div className='cartIconPDP'>
              <CarouselVertical data={this.props.product.gallery} />
            </div>
            <div className='productBrandPDP'>{this.props.product.brand}</div>
            <div className='productNamePDP'>{this.props.product.name}</div>
            <div className='itemPricePDP'>
              <p className='priceTagPDP'>Price:</p>
              <p className='actualPricePDP'>
                {symbol}
                {
                  this.props.product.prices.filter(
                    (x) => x.currency.label === CURR
                  )[0].amount
                }
              </p>
            </div>
            {this.props.product.attributes.map(
              ({ ProductId, name, type, items }, j) => {
                return (
                  <Fragment key={ProductId}>
                    <div className='attributeContainerPDP'>
                      <div key={ProductId} className='button-prop-container'>
                        <p className='attributeTitlePDP'>{name}:</p>
                        {items.map(
                          ({ displayValue, value, id }, optionsCount) => {
                            return type === 'text' ? (
                              <div
                                key={optionsCount}
                                className='button-prop'
                                onClick={() =>
                                  this.pickAttributes(
                                    name,
                                    value,
                                    j,
                                    this.props.product.attributes
                                  )
                                }
                              >
                                <input
                                  type='radio'
                                  id='option'
                                  name={j}
                                  value='option'
                                />
                                <label htmlFor='option'>{value}</label>
                              </div>
                            ) : (
                              <div key={optionsCount}>
                                <p
                                  onClick={() =>
                                    this.pickAttributes(
                                      name,
                                      value,
                                      j,
                                      this.props.product.attributes
                                    )
                                  }
                                  className='swatch-attribute swatchBoxGridPDP'
                                  style={{ background: value }}
                                ></p>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </Fragment>
                );
              }
            )}
            <div
              className='dangerouslySetInnerHTML'
              dangerouslySetInnerHTML={{
                __html: this.props.product.description,
              }}
            />
            <div className='addBtnCPDP'>
              <button
                className='addBtnPDP'
                onClick={() => this.combinedFunctionsAddProduct()}
              >
                add to cart
              </button>
            </div>
            {/* <button
            className='PDP-add-to-cart'
            onClick={() => this.combinedFunctions()}
          >
            Add to Cart
          </button> */}
          </div>
        </div>
      </Fragment>
    ) : (
      ''
    );
  }
}
