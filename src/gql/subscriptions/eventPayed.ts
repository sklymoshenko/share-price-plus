import gql from "graphql-tag";

export const EVENT_PAYED_SUBSCRIPTION = gql`
  subscription EventPayed {
    eventPayed {
      total
      each
    }
  }
`;
