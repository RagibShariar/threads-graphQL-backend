import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express, { Request, Response } from "express";

async function init() {
  const port = process.env.PORT || 5000;
  const app = express();

  // Middlewares
  app.use(express.json());

  // Create graphQL server
  const gqlServer = new ApolloServer({
    typeDefs: `
    type Query{
      hello: String
      say(name: String!): String
    }`,
    resolvers: {
      Query: {
        hello: () => "Hello World",
        say: (_, { name }) => `hey ${name}! How are you?`,
      },
    },
  });

  await gqlServer.start();

  app.get("/", (req: Request, res: Response) => {
    res.send(`Server is up and running`);
  });

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(port, () => {
    console.log("app is listening on port " + port);
  });
}
init();
