import gql from "graphql-tag";

export const ADD_FRIEND_MUTATION = gql`
  mutation Mutation($userId: String!, $name: String!) {
    addFriend(userId: $userId, name: $name) {
      name
      _id
    }
  }
`;
