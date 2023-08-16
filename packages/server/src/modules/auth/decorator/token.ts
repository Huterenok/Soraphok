import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import { Token } from "src/types/graphql";

export const TOKEN = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Token => {
    const { req } = GqlExecutionContext.create(context).getContext();
    return req.token;
  },
);
