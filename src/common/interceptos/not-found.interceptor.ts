import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class NotFoundInterceptor implements NestInterceptor {
  constructor(private readonly message?: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(data => {
        if (!data || Object.keys(data).length === 0)
          throw new NotFoundException(
            this.message || "The requested resource doesn't exist",
          );
      }),
    );
  }
}
