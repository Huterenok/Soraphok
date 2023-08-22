import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import {processRequest} from 'graphql-upload-minimal'

import { AppModule } from "./modules/app.module";

import { exceptionFactory } from "./common/validation";
import path, { join } from "path";

async function bootstrap() {
  const adapter = new FastifyAdapter();
  const fastify = adapter.getInstance();

	//TODO: bring to another place
  fastify.addContentTypeParser('multipart', (request: any, payload: any, done: any) => {
    request.isMultipart = true;
		done()
  });
  fastify.addHook('preValidation', async function (request: any, reply: any) {
    if (!request.raw.isMultipart) {
      return;
    }
    request.body = await processRequest(request.raw, reply.raw);
  });
	console.log(join(__dirname))

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
  );

  app.useGlobalPipes(new ValidationPipe({ exceptionFactory }));


  await app.listen(process.env.SERVER_PORT!);
}

bootstrap();
