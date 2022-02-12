import gql from "graphql-tag";

export const ADD_FRIEND_MUTATION = gql`
  mutation Mutation($userId: String!, $email: String!) {
    addFriend(userId: $userId, email: $email) {
      name
      _id
    }
  }
`;
