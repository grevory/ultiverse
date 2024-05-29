import { ApolloClient, InMemoryCache, createHttpLink, NormalizedCacheObject } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Define the URI of your GraphQL endpoint
const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql', // Ensure this is the correct endpoint
});

// Define the context setter with proper typing
const authLink = setContext((_, previousContext: { headers?: Record<string, string> }) => {
    // Get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // Return the headers to the context so httpLink can read them
    return {
        headers: {
            ...previousContext.headers,
            authorization: token ? `Bearer ${token}` : '',
        },
    };
});

// Create the Apollo Client
const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;