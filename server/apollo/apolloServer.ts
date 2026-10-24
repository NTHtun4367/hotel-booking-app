import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { Application, Request, Response } from "express";
import { roomTypeDefs } from "../graphql/typeDefs/room";
import { roomResolvers } from "../graphql/resolvers/room";
import { userTypeDefs } from "../graphql/typeDefs/user";
import { userResolvers } from "../graphql/resolvers/user";

export const startApolloServer = async (app: Application) => {
  const typeDefs = [roomTypeDefs, userTypeDefs];
  const resolvers = [roomResolvers, userResolvers];

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const apolloServer = new ApolloServer({ schema });

  await apolloServer.start();

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }: { req: Request; res: Response }) => {
        return { req, res };
      },
    }),
  );
};
