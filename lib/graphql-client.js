import { useMemo } from 'react'
import { GraphQLClient } from 'graphql-hooks'
import memCache from 'graphql-hooks-memcache'

import config from "../utils/config";

let graphQLClient

const auth = "AUTH_TOKEN"
const token = `bearer ${config[auth]}`
function createClient(initialState) {
  return new GraphQLClient({
    ssrMode: typeof window === 'undefined',
    url: 'https://api.github.com/graphql',
    cache: memCache({ initialState }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
  },
  })
}

export function initializeGraphQL(initialState = null) {
  const _graphQLClient = graphQLClient ?? createClient(initialState)

  if (initialState && graphQLClient) {
    graphQLClient.cache = memCache({
      initialState: Object.assign(
        graphQLClient.cache.getInitialState(),
        initialState
      ),
    })
  }
  if (typeof window === 'undefined') return _graphQLClient
  if (!graphQLClient) graphQLClient = _graphQLClient

  return _graphQLClient
}

export function useGraphQLClient(initialState) {
  const store = useMemo(() => initializeGraphQL(initialState), [initialState])
  return store
}
