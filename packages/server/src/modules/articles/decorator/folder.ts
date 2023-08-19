import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import { Folder } from "src/types/graphql";

export const FolderExt = createParamDecorator(
  (_data: unknown, context: ExecutionContext): Folder => {
    const { req } = GqlExecutionContext.create(context).getContext();
    return req.folder;
  },
);