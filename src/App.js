import React, { Component } from 'react';
import { FrontStore } from './components/FrontStore';
import { ApolloProvider } from 'react-apollo';
import { client } from './gql/queries';
import './index.css';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <FrontStore />
      </ApolloProvider>
    );
  }
}

export default App;
