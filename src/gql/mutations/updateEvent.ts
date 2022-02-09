import gql from "graphql-tag";

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($data: UpdateEvent!, $updateEventId: String!) {
    updateEvent(data: $data, id: $updateEventId) {
      _id
    }
  }
`;
