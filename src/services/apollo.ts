import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";

const httpLink = new HttpLink({
  // You should use an absolute URL here

  // For development
  uri: "http://localhost:4000/graphql",

  // uri: "https://share-price-plus-server.herokuapp.com/graphql"
  credentials: "same-origin"
});

// Create the subscription websocket link
// const wsLink = new WebSocketLink({
//   uri: 'ws://localhost:3000/subscriptions',
//   options: {
//     reconnect: true,
//   },
// })

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
// const link = split(
//   // split based on operation type
//   ({ query }) => {
//     const { kind, operation } = getMainDefinition(query)
//     return kind === 'OperationDefinition' &&
//       operation === 'subscription'
//   },
//   wsLink,
//   httpLink
// )

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
  credentials: "include"
});
