import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//types
import { typeDefs } from "./schema.js";
import db from "./_db.js";

//resolvers 
const resolvers={
    Query:{
        reviews: () => {
            return db.reviews;
        },
        review: (parent, args, context, info) => {
            const { id } = args;
            const review = db.reviews.find((review) => review.id === id);
            return review;
        },
        authors: () => {
            return db.authors;
        },
        games: () => {
            return db.games;
        },
    }
}

//server setup create a new apollo server instance
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,   //definations of types of data. now apollo server knows differnet types and query entry points
    resolvers,  //contains bunch of functions that are called to execute these queries, mutations and return data to the clients
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);


