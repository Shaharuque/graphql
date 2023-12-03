// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Game" type defines the queryable fields for every book in our data source.
  # ! means value can not be null
  type Game {
    id: ID!
    title: String!
    platform: [String]!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
#   type Query {
#     books: [Book]
#   }


type Review {
    id: ID!
    rating: Int!
    content: String!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
  }

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. In this
# case, the "reviews" query returns an array of zero or more Review (defined above).
  type Query {
    reviews: [Review]  #query for returns array of reviews
    review(id:ID!): Review     #query for returns single review 
    authors: [Author]
    games: [Game]
  }
`;

//This snippet defines a simple, valid GraphQL schema. Clients will be able to execute a query named reviews, and our server will return an array of zero or more Reviews.
