import React, { Component } from 'react';
import { CurrencySwitcher } from './CurrencySwitcher';
import cartLogo from '../images/cart.png';
import '../styles/MiniCart.css';

export class NavBar extends Component {
  render() {
    let badgeNum = 70;
    // const testValue = this.props.data.map((category) => category.name)[0];
    // const testValue = this.props.data.map(({ name, products }) => name)[0];
    // const testValue = this.props.data[0];
    // console.log(testValue);
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
                {/* <img
                  className='cart-icon'
                  src=''
                  alt='not found'
                  onClick={() => this.props.toggleMiniCart()}
                /> */}
              </div>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
