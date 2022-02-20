import * as Koa from 'koa';
import { MediaType, RequestMethod } from '../constants';
import { DispatcherTable } from '../DispatcherTable';

export const router =
  (dispatcherTable?: DispatcherTable) =>
  async (ctx: Koa.Context, next: Koa.Next) => {
    const {
      method,
      url,
      request: {
        header: { ['content-type']: mediaType },
      },
    } = ctx;

    const resourceMethod = dispatcherTable.get(
      url,
      method as RequestMethod,
      mediaType as MediaType
    );
    ctx.body = resourceMethod();
    await next();
  };
