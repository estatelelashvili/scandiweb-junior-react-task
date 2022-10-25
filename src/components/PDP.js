import React, { Component, Fragment } from 'react';

export class PDP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: {},
      // selectedProductAttributes: {},
    };

    this.handleEvent = this.handleEvent.bind(this);
    this.handleEventSpecial = this.handleEventSpecial.bind(this);
    // this.retrieveSelectedProduct = this.retrieveSelectedProduct.bind(this);
  }

  retrieveSelectedProduct(productAttributes) {
    this.setState({ selectedProductAttributes: productAttributes });
  }
  handleEvent = (event) => {
    console.log(event.target.innerText.toLowerCase());
  };
  handleEventSpecial = (event) => {
    console.log(event.target.checked);
  };
  handleTest(a, b) {
    this.setState((prevState) => ({
      obj: {
        ...prevState.obj,
        [a]: b,
      },
    }));
  }

  pickAttributes = (attribute, value, index, attributes) => {
    // const currencyMap = { USD: '$', AUD: 'A$', RUB: '₽', GBP: '£', JPY: '¥' };
    this.setState({
      obj: {
        ...this.state.obj,
        [index]: {
          ...this.state.obj.index,
          [attribute]: value,
        },
        properties: attributes,
        // imgArr: images,
      },
    });
  };

  combinedFunctions() {
    const productKeysExist = this.props.product.attributes.map(
      ({ ProductId, name, type, items }, j) => Object.keys(items)
    );
    const { productName, prices, imgArr, properties, ...rest } = this.state.obj;
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
      alert('Please select all options!');
    } else {
      this.props.onAdd(
        this.state.obj,
        this.props.product.id,
        this.props.product.prices,
        this.props.product.gallery
      );
    }
  }

  render() {
    if (this.state.obj.imgArr !== undefined) {
      console.log(this.state.obj.imgArr[0]);
    }
    // localStorage.setItem('CartContent', JSON.stringify(this.props.MyBag));
    // console.log(JSON.parse(localStorage.getItem('CartContent')) || []);

    return this.props.isShown ? (
      <div className='PDP-container'>
        <button
          className='PDP-close-btn'
          onClick={() => this.props.togglePDP()}
        >
          X
        </button>
        <p onClick={this.handleEvent}>{this.props.product.id}</p>
        <img className='PDP-gallery' src={this.props.product.gallery[0]} />
        {this.props.product.attributes.map(
          ({ ProductId, name, type, items }, j) => {
            return (
              <div key={ProductId} className='button-prop-container'>
                {/* <ul className='property-option'> */}
                <p>{name}:</p>
                {items.map(({ displayValue, value, id }, optionsCount) => {
                  return type === 'text' ? (
                    <div
                      key={optionsCount}
                      className='button-prop'
                      // className='text-attribute'
                      onClick={() =>
                        this.pickAttributes(
                          name,
                          value,
                          j,
                          this.props.product.attributes
                        )
                      }
                    >
                      <input type='radio' id='option' name={j} value='option' />
                      <label htmlFor='option'>{value}</label>
                    </div>
                  ) : (
                    <div key={id}>
                      <p
                        onClick={() =>
                          this.pickAttributes(
                            name,
                            value,
                            j,
                            this.props.product.attributes
                          )
                        }
                        className='swatch-attribute'
                        style={{ background: value }}
                      ></p>
                    </div>
                  );
                })}
                {/* </ul> */}
              </div>
            );
          }
        )}
        <button
          className='PDP-add-to-cart'
          onClick={() =>
            //   this.props.onAdd(
            //     this.state.obj,
            //     this.props.product.id,
            //     this.props.product.prices,
            //   )
            this.combinedFunctions()
          }
        >
          Add to Cart
        </button>
      </div>
    ) : (
      ''
    );
  }
}
