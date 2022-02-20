import { pathToRegexp, match, parse, compile, Match } from 'path-to-regexp';
import {
  Constructor,
  MediaType,
  METHOD_METADATA,
  PARAM_METADATA,
  PATH_METADATA,
  PRODUCE_METADATA,
  RequestMethod,
  Route,
} from './constants';
import { isConstructor, isFunction } from './utils';

export class DispatcherTable {
  public map: Map<string, Map<string, Route>> = new Map();
  public resource: Constructor;

  constructor(resource: Constructor) {
    this.resource = resource;

    const prototype = resource.prototype;
    const methodsNames = Object.getOwnPropertyNames(prototype).filter(
      (item) => !isConstructor(prototype[item]) && isFunction(prototype[item])
    );

    const path = Reflect.getMetadata(PATH_METADATA, resource);
    methodsNames.forEach((methodName) => {
      const fn = prototype[methodName];
      const method = Reflect.getMetadata(METHOD_METADATA, fn);
      const childPath = Reflect.getMetadata(PATH_METADATA, fn);
      const mediaType = Reflect.getMetadata(PRODUCE_METADATA, fn);

      const key = childPath ? `${path}/${childPath}` : path;

      let routes = this.map.get(key);
      if (!routes) {
        routes = new Map<string, Route>();
      }
      let methodMap = routes.get(method) ?? {
        default: {
          fn,
          methodName,
        },
      };
      if (mediaType) {
        methodMap[mediaType] = {
          fn,
          methodName,
        };
      }
      routes.set(method, methodMap);
      this.map.set(key, routes);
    });
  }

  get(path: string, method: RequestMethod, mediaType?: MediaType): Function {
    let route: Route;

    const keys = Array.from(this.map.keys());
    const routePath = keys.find((item) => {
      return !!this.match(item, path);
    });

    try {
      route = this.map.get(routePath).get(method);
    } catch (error) {
      throw new Error('No route is matched.');
    }

    this.checkMediaType(mediaType, route);

    const routeParams = this.match(routePath, path);
    const paramsIndex = Reflect.getOwnMetadata(
      PARAM_METADATA,
      this.resource,
      route[mediaType ?? 'default'].methodName
    );

    const params = [];
    const paramKeys = [];
    pathToRegexp(routePath, paramKeys);

    if (paramKeys.length) {
      const keyName = paramKeys[0].name;
      params[paramsIndex] = routeParams.params[keyName];
    }

    return () => route[mediaType ?? 'default'].fn(...params);
  }

  match(path: string, target: string): Route {
    const route = match(path, { decode: decodeURIComponent })(target);
    return route || undefined;
  }

  checkMediaType(mediaType: MediaType, route: Route) {
    if (mediaType && !Object.keys(route).includes(mediaType)) {
      throw new Error('No media type is matched.');
    }
  }
}

// import { pathToRegexp, match, parse, compile, Match } from 'path-to-regexp';
// import {
//   Constructor,
//   METHOD_METADATA,
//   PARAM_METADATA,
//   PATH_METADATA,
//   RequestMethod,
//   Route,
// } from './constants';
// import { isConstructor, isFunction } from './utils';

// export class DispatcherTable {
//   public map: Map<string, Map<string, Route>> = new Map();
//   public resource: Constructor;

//   constructor(resource: Constructor) {
//     this.resource = resource;

//     const prototype = resource.prototype;
//     const methodsNames = Object.getOwnPropertyNames(prototype).filter(
//       (item) => !isConstructor(prototype[item]) && isFunction(prototype[item])
//     );

//     const path = Reflect.getMetadata(PATH_METADATA, resource);
//     methodsNames.forEach((methodName) => {
//       const fn = prototype[methodName];
//       const method = Reflect.getMetadata(METHOD_METADATA, fn);
//       const childPath = Reflect.getMetadata(PATH_METADATA, fn);

//       const key = childPath ? `${path}/${childPath}` : path;

//       let routes = this.map.get(key);
//       if (!routes) {
//         routes = new Map<string, Route>();
//       }
//       routes.set(method, {
//         method,
//         fn,
//         methodName,
//       });
//       this.map.set(key, routes);
//     });
//   }

//   get(path: string, method: RequestMethod): Function {
//     let route: Route;

//     const keys = Array.from(this.map.keys());
//     const routePath = keys.find((item) => {
//       return !!this.match(item, path);
//     });

//     try {
//       route = this.map.get(routePath).get(method);
//     } catch (error) {
//       throw new Error('No route is matched.');
//     }

//     const routeParams = this.match(routePath, path);
//     const paramsIndex = Reflect.getOwnMetadata(
//       PARAM_METADATA,
//       this.resource,
//       route.methodName
//     );

//     const params = [];
//     const paramKeys = [];
//     pathToRegexp(routePath, paramKeys);

//     if (paramKeys.length) {
//       const keyName = paramKeys[0].name;
//       params[paramsIndex] = routeParams.params[keyName];
//     }

//     return () => route.fn(...params);

//     // return {
//     //   ...route,
//     //   fn: () => route.fn(...params),
//     // };
//   }

//   match(path: string, target: string): Route {
//     const route = match(path, { decode: decodeURIComponent })(target);
//     return route || undefined;
//   }
// }
