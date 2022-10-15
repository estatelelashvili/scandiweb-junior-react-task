import React, { Component } from 'react';

export class PDP extends Component {
  render() {
    return this.props.isShown ? (
      <div>
        <p>test</p>
        <button onClick={() => this.props.togglePDP()}>X</button>
      </div>
    ) : (
      ''
    );
  }
}
