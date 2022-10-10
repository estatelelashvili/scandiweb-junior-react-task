import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';

const localGraphQL = 'http://localhost:4000/graphql';
export const client = new ApolloClient({
  uri: localGraphQL,
  cache: new InMemoryCache(),
});

export const GET_PRODUCTS = gql`
  query GetData {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          ProductId: id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
          }
          amount
        }
        brand
      }
    }
  }
`;

export default GET_PRODUCTS;
