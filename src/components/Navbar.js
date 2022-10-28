import React, { Component } from 'react';
import { CurrencySwitcher } from './CurrencySwitcher';
import cartLogo from '../images/cart.png';
import '../styles/MiniCart.css';

export class NavBar extends Component {
  render() {
    let badgeNum = this.props.MyBag.length;
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
              <div className='nav-flex-container'>
                <CurrencySwitcher
                  data={this.props.filteredData}
                  SelectCurrency={(e) => this.props.SelectCurrency(e)}
                />
                <div onClick={() => this.props.toggleMiniCart()}>
                  <span>
                    <img
                      className='cartImg'
                      src={cartLogo}
                      alt='cart logo text'
                    />
                    <span className='cartImg badge'>{badgeNum}</span>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
