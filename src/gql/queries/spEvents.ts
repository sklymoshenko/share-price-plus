import gql from "graphql-tag";

export const EVENTS_QUERY = gql`
  query SpEvents($idIn: [ID!]) {
    spEvents(_id_in: $idIn) {
      _id
      name
      price
      each
      peopleCount
      participants {
        _id
        name
        paid
        ows
        exceed
      }
      isClosed
      closedAt
      createdAt
      updatedAt
    }
  }
`;
