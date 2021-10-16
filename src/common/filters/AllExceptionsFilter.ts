import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

const map = {
  QueryFailedError: {
    message: 'duplicate key value violates unique constraint',
    response: 'Email já cadastrado'
  }
}

function findMessage(exception: Error): string {
  if (exception.name === 'QueryFailedError') {
    return 'Email já cadastrado'
  }
  return exception.message;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log("EXception", exception)
    console.log("Message", exception.message)
    console.log("Code", exception.name) 
    const message = findMessage(exception)

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}