import React, { Component, Fragment } from 'react';

export class MiniCart extends Component {
  render() {
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
          ({ productName, price, symbol, properties, ...rest }, k) => (
            <div key={k}>
              <p>{productName}</p>
              <p>
                {symbol} {price}
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
      </div>
    );
  }
}
