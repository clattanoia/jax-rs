export const PATH_METADATA = 'rest:path';
export const METHOD_METADATA = 'rest:method';
export const PARAM_METADATA = 'rest:param';
export const PRODUCE_METADATA = 'rest:produce';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
  PATCH = 'PATCH',
}

export enum MediaType {
  APPLICATION_ATOM_XML = 'application/atom+xml',
  APPLICATION_ATOM_XML_TYPE = 'application/atom+xml',
  APPLICATION_FORM_URLENCODED = 'application/x-www-form-urlencoded',
  APPLICATION_FORM_URLENCODED_TYPE = 'application/x-www-form-urlencoded',
  APPLICATION_JSON = 'application/json',
  APPLICATION_JSON_TYPE = 'application/json',
  APPLICATION_OCTET_STREAM = 'application/octet-stream',
  APPLICATION_OCTET_STREAM_TYPE = 'application/octet-stream',
  APPLICATION_SVG_XML = 'application/svg+xml',
  APPLICATION_SVG_XML_TYPE = 'application/svg+xml',
  APPLICATION_XHTML_XML = 'application/xhtml+xml',
  APPLICATION_XHTML_XML_TYPE = 'application/xhtml+xml',
  APPLICATION_XML = 'application/xml',
  APPLICATION_XML_TYPE = 'application/xml',
  MULTIPART_FORM_DATA = 'multipart/form-data',
  MULTIPART_FORM_DATA_TYPE = 'multipart/form-data',
  TEXT_HTML = 'text/html',
  TEXT_HTML_TYPE = 'text/html',
  TEXT_PLAIN = 'text/plain',
  TEXT_PLAIN_TYPE = 'text/plain',
  TEXT_XML = 'text/xml',
  TEXT_XML_TYPE = 'text/xml',
  WILDCARD = '*/*',
  WILDCARD_TYPE = '*/*',
}

export type Route = { [key: string]: any };

export type Constructor<T = any> = new (...args: any[]) => T;
