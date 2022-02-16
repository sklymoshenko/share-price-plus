import gql from "graphql-tag";

export const UPDATE_EVENT = gql`
  mutation UpdateEvent($data: UpdateEvent!, $updateEventId: String!) {
    updateEvent(data: $data, id: $updateEventId) {
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
