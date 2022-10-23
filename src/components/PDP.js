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
      },
    });
  };

  render() {
    // localStorage.setItem('CartContent', JSON.stringify(this.props.MyBag));
    // console.log(JSON.parse(localStorage.getItem('CartContent')) || []);

    return this.props.isShown ? (
      <div>
        <button onClick={() => this.props.togglePDP()}>X</button>
        <p onClick={this.handleEvent}>{this.props.product.id}</p>
        {this.props.product.attributes.map(
          ({ ProductId, name, type, items }, j) => {
            return (
              <div key={ProductId}>
                <p>{name}</p>
                {items.map(({ displayValue, value, id }) => {
                  return type === 'text' ? (
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
                        className='text-attribute'
                      >
                        {value}
                      </p>
                      {/* <p>{this.props.product.attributes.length}</p> */}
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
              </div>
            );
          }
        )}
        <button
          onClick={() =>
            this.props.onAdd(
              this.state.obj,
              this.props.product.id,
              this.props.product.prices
            )
          }
        >
          buy
        </button>
        <button onClick={() => this.props.onRemove(this.state.obj)}>
          sell
        </button>
      </div>
    ) : (
      ''
    );
  }
}
