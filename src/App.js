import React, { Component } from 'react';
import { NavBar } from './components/Navbar';
import { PLP } from './components/PLP';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from 'react-apollo';
import './index.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div>
          <NavBar />
          <PLP />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
