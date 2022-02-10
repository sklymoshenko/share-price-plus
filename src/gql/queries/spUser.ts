import gql from "graphql-tag";

export const USER_QUERY = gql`
  query SpUsers($spUsersId: String) {
    spUsers(id: $spUsersId) {
      _id
      name
      email
      eventsCount
      createdAt
      events
    }
  }
`;
