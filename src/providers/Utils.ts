/**
 * Utils
 * @type {string}
 */

export const DEFAULT_ROOT_NODE = '/default'
export const PERSONAL_LISTS_NODE = '/personal_lists';
export const SHARED_LISTS_NODE = '/shared_lists';

/**
 * UUid Generator Credit to :
 *      https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
export function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); // use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export function formatEmail(user: string) {
  return user
    .replace('@', '_')
    .replace('.', '_');
}


export function notNullAndNotUndefined(object: any): boolean {
  return !(null === object || undefined === object);
}
