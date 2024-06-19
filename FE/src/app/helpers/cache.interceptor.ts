import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Only cache GET requests
    if (req.method !== "GET") {
      return next.handle(req);
    }

    if (req.urlWithParams.includes("category/findAll")) {
      console.log("get cache", req.urlWithParams);
      const cachedResponse = this.cache.get(req.urlWithParams);
      if (cachedResponse) {
        // Serve from cache
        return of(cachedResponse);
      }

      return next.handle(req).pipe(
        tap((event) => {
          if (event instanceof HttpResponse) {
            // Cache the new response
            console.log("save cache", req.urlWithParams);
            this.cache.set(req.urlWithParams, event);
          }
        })
      );
    }

    return next.handle(req);
  }
}
export const cacheInterceptor = [
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
];
