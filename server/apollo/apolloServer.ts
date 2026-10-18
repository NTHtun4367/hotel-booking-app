import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Application } from "express";

export const startApolloServer = async (app: Application) => {
  const typeDefs = `#graphql
    type Query {
      health: String!
    }
  `;

  const resolvers = {
    Query: {
      health: () => "ok",
    },
  };

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const apolloServer = new ApolloServer({ schema });

  await apolloServer.start();

  app.use("/graphql", expressMiddleware(apolloServer));
};
