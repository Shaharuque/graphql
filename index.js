import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

//types
import { typeDefs } from "./schema.js";
import db from "./_db.js";

//resolvers
const resolvers = {
  Query: {
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
    author: (parent, args, context, info) => {
      const { id } = args;
      const author = db.authors.find((author) => author.id === id);
      return author;
    },
    games: () => {
      return db.games;
    },
    game: (parent, args, context, info) => {
      const { id } = args;
      const game = db.games.find((game) => game.id === id);
      return game;
    },
  },
  // Finding reviews for a game id
  Game: {
    reviews(parent) {
      // Filter the hardcoded array of books to only include
      // books that are located at the correct branch
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  // Finding reviews for a author id
  Review: {
    game(parent) {
      return db.games.find((g) => g.id === parent.game_id);
    },
    author(parent) {
      return db.authors.find((a) => a.id === parent.author_id);
    },
  },

  Author:{
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
  }
};

//server setup create a new apollo server instance
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs, //definations of types of data. now apollo server knows differnet types and query entry points
  resolvers, //contains bunch of functions that are called to execute these queries, mutations and return data to the clients
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
