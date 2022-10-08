import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
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
          currency
          amount
        }
        brand
      }
    }
  }
`;

export default GET_PRODUCTS;
