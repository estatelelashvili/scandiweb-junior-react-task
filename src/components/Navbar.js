import React, { Component } from 'react';

export class NavBar extends Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            {this.props.data.map(({ name }) => {
              return (
                <li key={name}>
                  <a href='#all' onClick={this.props.passedHandlePickCategory}>
                    {name}
                  </a>
                </li>
              );
            })}
            <li className='active'>
              {/* <a></a>
               */}
              <img
                className='cart-icon'
                src=''
                alt='not found'
                onClick={() => this.props.toggleMiniCart()}
              />
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
