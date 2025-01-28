import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function gqlServer() {
  // Create graphQL server
  const createApolloGraphQLServer = new ApolloServer({
    typeDefs: `
            type Query {
               hello: String
            }
            type Mutation {
               ${User.mutations}
            }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await createApolloGraphQLServer.start();

  return createApolloGraphQLServer;
}

export default gqlServer;
