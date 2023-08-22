import { Module } from "@nestjs/common";

import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLError, GraphQLFormattedError } from "graphql";

import { join } from "path";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(
        process.cwd(),
        "src/config/graphql/schema/schema.gql",
      ),
      buildSchemaOptions: {
        numberScalarMode: "integer",
      },
			//TODO: FIX
			csrfPrevention: false,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            //TODO: type this
            //@ts-ignore
            error.extensions.exception?.response?.message || error.message,
        };
        return graphQLFormattedError;
      },
    }),
  ],
})
export class GraphQLCongifModule {}
