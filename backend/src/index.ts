require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./api/schema');
const resolvers = require('./api/resolvers');
const { db, auth } = require('./config/firebase');
import express from 'express';

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }: { req: express.Request }) => {
        // Add the auth token to the context
        const token = req.headers.authorization || '';
        return { db, auth, token };
    },
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });

    const HOST = process.env.NODE_HOST || 'localhost';
    const PORT = process.env.NODE_PORT || 4000;
    app.listen(PORT, () => {
        console.log(
            `Server running at http://${HOST}:${PORT}${server.graphqlPath}`,
        );
    });
}

startServer();
