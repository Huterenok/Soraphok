import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import { Article } from "src/entities";

export const ArticleExt = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Article => {
    const { req } = GqlExecutionContext.create(context).getContext();
    return req.article;
  },
);
