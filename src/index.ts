import { expressMiddleware } from "@apollo/server/express4";
import express, { Request, Response } from "express";
import gqlServer from "./graphql";

async function init() {
  const port = process.env.PORT || 5000;
  const app = express();

  // Middlewares
  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.send(`Server is up and running`);
  });

  app.use("/graphql", expressMiddleware(await gqlServer()));

  app.listen(port, () => {
    console.log("app is listening on port " + port);
  });
}
init();
