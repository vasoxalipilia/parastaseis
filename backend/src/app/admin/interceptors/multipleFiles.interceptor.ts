import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';

@Injectable()
export class MultipleFilesInterceptor implements NestInterceptor<string[]> {
  constructor(private readonly fieldNames: string[]) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const uploadedFiles: any[] = [];

    this.fieldNames.forEach((fieldName) => {
      const file = request[fieldName];
      if (Array.isArray(file)) {
        uploadedFiles.push(...file);
      } else {
        uploadedFiles.push(file);
      }
    });

    // If you need to process the uploaded files or modify the request object, you can do it here.

    return next.handle();
  }
}
