import gql from "graphql-tag";

export const USERS_QUERY = gql`
  query SpUsers(
    $name: String
    $spUsersId: String
    $idIn: [ID!]
    $email: String
    $createdAt: String
    $updatedAt: String
  ) {
    spUsers(name: $name, id: $spUsersId, _id_in: $idIn, email: $email, createdAt: $createdAt, updatedAt: $updatedAt) {
      _id
      name
      email
      eventsCount
      createdAt
      events
    }
  }
`;
