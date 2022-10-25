import React, { Component } from 'react';

class CarouselHorizontal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      lg: this.props.data.length,
    };
  }

  goToPrevSlide() {
    let index = this.state.activeIndex;
    let lg = this.state.lg;
    if (index < 1) {
      index = lg - 1;
    } else {
      index--;
    }
    this.setState({
      activeIndex: index,
    });
  }

  goToNextSlide() {
    let index = this.state.activeIndex;

    let lg = this.state.lg;
    if (index === lg - 1) {
      index = 0;
    } else {
      index++;
    }
    this.setState({
      activeIndex: index,
    });
  }

  render() {
    return (
      <div className='parentH'>
        <div id='imgCarouselH'>
          <img
            className='mainImgH'
            src={this.props.data[this.state.activeIndex]}
            alt='Not found'
          />
          <p id='errowRight' onClick={() => this.goToNextSlide()}>
            {'>'}
          </p>
          <p id='errowLeft' onClick={() => this.goToPrevSlide()}>
            {'<'}
          </p>
        </div>
      </div>
    );
  }
}

export default CarouselHorizontal;
