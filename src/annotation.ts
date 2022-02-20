import 'reflect-metadata';
import {
  PATH_METADATA,
  METHOD_METADATA,
  RequestMethod,
  PARAM_METADATA,
  PRODUCE_METADATA,
  MediaType,
} from './constants';

export const Path =
  (path: string): ClassDecorator =>
  (target) => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  };

const createMappingDecorator =
  (method: RequestMethod) =>
  (path?: string): MethodDecorator => {
    return (target, key, descriptor) => {
      Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
      Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
    };
  };

export const GET = createMappingDecorator(RequestMethod.GET);
export const POST = createMappingDecorator(RequestMethod.POST);

export const PathParam =
  (property?: string): ParameterDecorator =>
  (target, key, index) => {
    Reflect.defineMetadata(PARAM_METADATA, index, target.constructor, key);
  };

export const Produces = (mediaType: MediaType): MethodDecorator => {
  return (target, key, descriptor) => {
    Reflect.defineMetadata(PRODUCE_METADATA, mediaType, descriptor.value);
  };
};
