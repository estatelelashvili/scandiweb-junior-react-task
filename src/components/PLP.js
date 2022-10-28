import React, { Component } from 'react';
import { MiniCart } from './MiniCart';
import { Product } from './Product';
import '../styles/PLP.css';

export class PLP extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleOutOfStockModal = this.toggleOutOfStockModal.bind(this);
    this.toggleAddModal = this.toggleAddModal.bind(this);
  }

  state = {
    modalIsShown: false,
    outOfStockPopUpIsShown: false,
    addModalIsShown: false,
  };

  toggleAddModal() {
    this.setState({ addModalIsShown: !this.state.addModalIsShown });
  }
  toggleModal() {
    this.setState({ modalIsShown: !this.state.modalIsShown });
  }
  toggleOutOfStockModal() {
    this.setState({
      outOfStockPopUpIsShown: !this.state.outOfStockPopUpIsShown,
    });
  }

  render() {
    return (
      <div>
        <div className='modal-PLP-parent'>
          {this.state.modalIsShown ? (
            <div className='modal-PLP'>
              <button
                className='close-btnPDP-inner'
                onClick={() => this.toggleModal()}
              >
                &#10060;
              </button>
              <p>Please select all of the options!</p>
            </div>
          ) : (
            ''
          )}
          {this.state.addModalIsShown ? (
            <div className='modal-PLP'>
              <button
                className='close-btnPDP-inner'
                onClick={() => this.toggleAddModal()}
              >
                &#10060;
              </button>
              <p>Product is added to cart!</p>
            </div>
          ) : (
            ''
          )}
          {this.state.outOfStockPopUpIsShown ? (
            <div className='modal-PLP'>
              <button
                className='close-btnPDP-inner'
                onClick={() => this.toggleOutOfStockModal()}
              >
                &#10060;
              </button>
              <p>Sorry, product is out of stock!</p>
            </div>
          ) : (
            ''
          )}
        </div>
        {this.props.filteredData.map(({ name, products }) => {
          return (
            <div key={name} className='minicart-parent-container'>
              <MiniCart
                MiniCartIsHidden={this.props.MiniCartIsHidden}
                MyBag={this.props.MyBag}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                SelectedCurrency={this.props.SelectedCurrency}
                currencySymbol={this.props.currencySymbol}
                toggleMiniCart={this.props.toggleMiniCart}
              />
              <h1 className='categoryName'>{name}</h1>
              <div className='cards_wrap'>
                {products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    MyBag={this.props.MyBag}
                    onAdd={this.props.onAdd}
                    onRemove={this.props.onRemove}
                    SelectedCurrency={this.props.SelectedCurrency}
                    currencySymbol={this.props.currencySymbol}
                    toggleModal={this.toggleModal}
                    toggleOutOfStockModal={this.toggleOutOfStockModal}
                    toggleAddModal={this.toggleAddModal}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
