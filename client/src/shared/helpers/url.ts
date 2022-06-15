import queryString from 'query-string';
import { omit } from 'lodash';

export const queryStringToObject = (str: any, options = {}) =>
  queryString.parse(str, {
    arrayFormat: 'bracket',
    ...options,
  });

export const objectToQueryString = (obj: any, options = {}) =>
  queryString.stringify(obj, {
    arrayFormat: 'bracket',
    ...options,
  });

export const omitFromQueryString = (str: any, keys: any) => objectToQueryString(omit(queryStringToObject(str), keys));

export const addToQueryString = (str: any, fields: any) =>
  objectToQueryString({
    ...queryStringToObject(str),
    ...fields,
  });
