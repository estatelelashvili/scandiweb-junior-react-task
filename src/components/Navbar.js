import React, { Component } from 'react';

export class NavBar extends Component {
  render() {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <a href='#all'>All</a>
            </li>
            <li>
              <a href='#clothes'>Clothes</a>
            </li>
            <li>
              <a href='#tech'>Tech</a>
            </li>
            <li className='active'>
              <a href='#buy'>Buy</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
