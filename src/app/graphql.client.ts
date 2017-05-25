import { ApolloClient, createNetworkInterface } from 'apollo-client';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({uri: 'https://swapi.apis.guru'})
});

export {
  client
}
