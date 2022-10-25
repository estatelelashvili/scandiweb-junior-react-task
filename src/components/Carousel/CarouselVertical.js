import React, { Component } from "react";
import "./CarouselVertical.css";
import alterImg from "../images/noImage.png";

class Slide extends Component {
  render() {
    return (
      <div className="parent">
        {this.props.data.map((s, index) => (
          <div key={index}>
            <img
              className="miniImg"
              onClick={() => this.props.getIndex(s, index)}
              id="imgTag"
              src={s}
              alt="not found text"
            />
          </div>
        ))}
      </div>
    );
  }
}

class CarouselVertical extends Component {
  constructor(props) {
    super(props);

    this.state = {
      src: this.props.data.map((s, index) => {
        return s;
      }),
    };
  }

  getIndex(param1, param2) {
    this.setState({
      src: param1,
    });
  }

  handleImageErrored() {
    this.setState({ src: alterImg });
  }

  render() {
    return (
      <div className="container-1">
        <Slide
          getIndex={(s, i) => this.getIndex(s, i)}
          data={this.props.data}
        />
        <div className="child-1">
          <img
            className="mainImg"
            src={this.state.src}
            onError={this.handleImageErrored.bind(this)}
            alt="not found text"
          />
        </div>
      </div>
    );
  }
}

export default CarouselVertical;
