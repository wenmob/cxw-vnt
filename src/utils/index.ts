import Vue from 'vue';

export { createNamespace } from './create';
export { addUnit } from './format/unit';

export const isServer: boolean = Vue.prototype.$isServer;

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function isDef(val: any): boolean {
  return val !== undefined && val !== null;
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isObject(val: any): val is Record<any, any> {
  return val !== null && typeof val === 'object';
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function get(object: any, path: string): any {
  const keys = path.split('.');
  let result = object;

  keys.forEach((key) => {
    result = isDef(result[key]) ? result[key] : '';
  });

  return result;
}

export const browser = (function () {
  var u = window.navigator.userAgent;
  var ios = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  var wechat = !!u.match(/MicroMessenger/);
  var android = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  var xlg = !!u.match(/@xlg/);
  var version = u.split('@xlg:')[1] || 0;
  var flag = wechat ? 'wechat' : xlg ? 'xlg' : ios ? 'ios' : 'android';
  var native = !!u.match(/&&/);
  return {
    userAgent: u,
    ios,
    wechat,
    android,
    xlg,
    version,
    flag,
    native,
  };
})();
