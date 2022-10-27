import React, { Fragment, Component } from 'react';
import '../styles/Navbar.css';

export class CategoryLinks extends Component {
  render() {
    return this.props.data.map(({ name }) => (
      <Fragment key={name}>
        <ol>
          <li>
            <a
              href={`#/${name}`}
              key={name}
              onClick={this.props.passedHandlePickCategory}
            >
              {name}
            </a>
          </li>
        </ol>
      </Fragment>
    ));
  }
}
