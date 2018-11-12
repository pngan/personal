import { Injectable, MiddlewareFunction, NestMiddleware, Logger } from '@nestjs/common';
import { IncomingMessage } from 'http';

@Injectable()
export class RestLoggingMiddleware implements NestMiddleware {
  resolve(request: IncomingMessage, ...args: any[]): MiddlewareFunction {
    return (req: IncomingMessage, res, next) => {
      Logger.log(`${JSON.stringify(req.method)} ${JSON.stringify(req.url)}`, 'REST Middleware');
      next();
    };
  }
}