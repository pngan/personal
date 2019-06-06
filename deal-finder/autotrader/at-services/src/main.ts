import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const serverPort = process.env.OPENSHIFT_NODEJS_PORT || 3000;
  const serverIp = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

  const app = await NestFactory.create(AppModule);
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  app.enableCors();
  await app.listen(serverPort, serverIp);
  Logger.log(`Listening on <${serverIp}:${serverPort}>`);
}
bootstrap();
