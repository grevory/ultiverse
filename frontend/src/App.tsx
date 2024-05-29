import { ApolloProvider } from '@apollo/client';
import client from './apollo-client';
import CreateLeague from './components/CreateLeague';

const App = () => {
    return (
        <ApolloProvider client={client}>
            <div>
                <h1>Ultimate Frisbee League Manager</h1>
                <CreateLeague />
                {/* Other components for league, team, and draft management */}
            </div>
        </ApolloProvider>
    );
};

export default App;
