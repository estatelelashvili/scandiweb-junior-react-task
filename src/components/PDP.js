import React, { Component } from 'react';

export class PDP extends Component {
  constructor(props) {
    super(props);

    this.state = {
      obj: {},
    };

    this.handleEvent = this.handleEvent.bind(this);
  }
  handleEvent = (event) => {
    console.log(event.target.innerText.toLowerCase());
  };
  handleTest(a, b) {
    this.setState((prevState) => ({
      obj: {
        ...prevState.obj,
        [a]: b,
      },
    }));
  }

  pickAttributes = (attribute, value) => {
    // const currencyMap = { USD: '$', AUD: 'A$', RUB: '₽', GBP: '£', JPY: '¥' };
    this.setState({
      obj: {
        // productName: name,
        // price: cost,
        // symbol: currencyMap[currency],
        ...this.state.obj,
        [attribute]: value,
      },
    });
  };
  // pickAttributes = (name, cost, currency, attribute, value) => {
  //   const currencyMap = { USD: '$', AUD: 'A$', RUB: '₽', GBP: '£', JPY: '¥' };
  //   this.setState({
  //     obj: {
  //       productName: name,
  //       price: cost,
  //       symbol: currencyMap[currency],
  //       ...this.state.obj,
  //       [attribute]: value,
  //     },
  //   });
  // };

  render() {
    localStorage.setItem('CartContent', JSON.stringify(this.props.MyBag));
    console.log(JSON.parse(localStorage.getItem('CartContent')) || []);
    return this.props.isShown ? (
      <div>
        <button onClick={() => this.props.togglePDP()}>X</button>
        <p onClick={this.handleEvent}>{this.props.product.id}</p>
        {this.props.product.attributes.map(
          ({ ProductId, name, type, items }) => {
            return (
              <div key={ProductId}>
                <p>{name}</p>
                {items.map(({ displayValue, value, id }) => {
                  return type === 'text' ? (
                    <div key={id}>
                      <p
                        onClick={() => this.pickAttributes(name, value)}
                        className='text-attribute'
                      >
                        {value}
                      </p>
                      {/* <p>{this.props.product.attributes.length}</p> */}
                    </div>
                  ) : (
                    <div key={id}>
                      <p
                        onClick={() => this.pickAttributes(name, value)}
                        className='swatch-attribute'
                        style={{ background: value }}
                      ></p>
                    </div>
                  );
                })}
              </div>
            );
          }
        )}
        <button
          onClick={() =>
            this.props.onAdd(
              this.state.obj,
              this.props.product.id,
              this.props.product.prices.filter(
                (x) => x.currency.label === 'USD'
              )[0].amount,
              this.props.product.prices.filter(
                (x) => x.currency.label === 'USD'
              )[0].currency.label
            )
          }
        >
          buy
        </button>
      </div>
    ) : (
      ''
    );
  }
}
