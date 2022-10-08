import React, { Component } from 'react';
import { Query } from 'react-apollo';
import GET_PRODUCTS from '../gql/queries';

export class PLP extends Component {
  render() {
    return (
      <main>
        <div>
          <p>Product listing page2</p>
          <Query query={GET_PRODUCTS}></Query>
        </div>
      </main>
    );
  }
}
