import gql from "graphql-tag";

export const USERS_QUERY = gql`
  query SpUsers($idIn: [ID!], $spUsersId: String) {
    spUsers(_id_in: $idIn, id: $spUsersId) {
      _id
      name
      email
      eventsCount
      createdAt
      events
    }
  }
`;
