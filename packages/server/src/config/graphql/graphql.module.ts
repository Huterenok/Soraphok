import { Module } from "@nestjs/common";

import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLError, GraphQLFormattedError } from "graphql";

import { join } from "path";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ["./**/*.graphql"],
      definitions: {
        path: join(process.cwd(), "src/types/graphql.ts"),
      },
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            //TODO
            //@ts-ignore
            error.extensions.exception?.response?.message || error.message,
        };
        return graphQLFormattedError;
      },
    }),
  ],
})
export class GraphQLCongifModule {}
