import { GraphQLClient } from 'graphql-request';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://harbour-movies.vercel.app';

export const GRAPHQL_ENDPOINT = `${BASE_URL}/api/graphql`;

export const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
  headers: {
    'Content-Type': 'application/json',
  },
});
