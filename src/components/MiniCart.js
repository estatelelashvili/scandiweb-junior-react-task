import React, { Component, Fragment } from 'react';

export class MiniCart extends Component {
  render() {
    const CURR = 'USD';
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

    const values = testItems.map((item) =>
      Object.keys(item).map((key) => item[key])
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
      <div className='mini-cart'>
        {uniqueProducts.map(
          ({ productName, prices, properties, ...rest }, k) => (
            <div key={k}>
              <p>{productName}</p>
              <p>
                {
                  prices.filter((price) => price.currency.label === CURR)[0]
                    .currency.label
                }{' '}
                {
                  prices.filter((price) => price.currency.label === CURR)[0]
                    .amount
                }
              </p>
              <p>
                Count:
                {
                  this.props.MyBag.filter(
                    (item) =>
                      JSON.stringify(item) === JSON.stringify(uniqueProducts[k])
                  ).length
                }
              </p>
              <button
                onClick={() =>
                  this.props.onAdd(uniqueProducts[k], productName, prices)
                }
              >
                +
              </button>
              <button onClick={() => this.props.onRemove(uniqueProducts[k], k)}>
                -
              </button>
              {properties
                ? properties.map(({ ProductId, name, type, items }, j) => (
                    <Fragment key={j}>
                      <p key={j}>{DeeperKeys[k][j]}</p>
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
                            <p
                              key={i}
                              className='swatch-attribute'
                              style={{ background: value }}
                            ></p>
                          </div>
                        );
                      })}
                    </Fragment>
                  ))
                : ''}
            </div>
          )
        )}
        <p>Total {TOTAL}</p>
      </div>
    );
  }
}
