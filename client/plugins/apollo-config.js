import { getQueryParameters } from '~/apollo/queries/queryParameters.gql'

export default function ({ $config: { baseUrl } }) {
  const LOCAL_STORAGE_DATA_KEY = 'ff-app_queryParameters'

  return {
    httpEndpoint: baseUrl,
    resolvers: {
      Mutation: {
        queryParametersSet: (root, { sortBy, sortOrder }, { cache }) => {
          const data = {
            queryParameters: {
              __typename: 'queryParameters',
              sortBy,
              sortOrder
            }
          }
          cache.writeQuery({ query: getQueryParameters, data })
          try {
            global.localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify({ sortBy, sortOrder }))
          } catch (e) {
            console.log(e)
          }
        }
      }
    },
    onCacheInit: cache => {
      let apolloPersistData;
      if (process.client) {
        try {
          apolloPersistData = JSON.parse(global.localStorage.getItem(LOCAL_STORAGE_DATA_KEY))
        } catch (e) {
          console.log(e)
        }
      }
      const data = {
        queryParameters: {
          __typename: 'queryParameters',
          sortBy: apolloPersistData?.sortBy ?? null,
          sortOrder: apolloPersistData?.sortOrder ?? null,
        }
      }
      cache.writeQuery({ query: getQueryParameters, data })
    }
  }
}
