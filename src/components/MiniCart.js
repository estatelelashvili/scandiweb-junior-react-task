import React, { Component } from 'react';

export class MiniCart extends Component {
  state = {
    initialCategory: '',
  };
  render() {
    return this.props.MiniCartIsHidden ? (
      ''
    ) : (
      <div className='mini-cart'>
        <p>Test Mini Cart</p>
      </div>
    );
  }
}
