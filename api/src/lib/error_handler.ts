import { RequestHandler } from "express";

export function error_handler<T extends CallableFunction>(target: T, _?: any): T {
  const handler: RequestHandler = async function(req, res, next) {
    try {
      await target(req, res, next)
    } catch(error: any) {
      if(error.code) {
        res.status(error.code)
          .json(error)
      }
    }
  }
  return handler as unknown as typeof target;
}

export function ErrorProcessing<T extends { new (...args: any[]): {} }>(target_class: T) {
  return class extends target_class {
    constructor(...args: any[]) {
      super(...args)
      Object.keys(this).forEach((key) => {
        const property = this[key as keyof this];
        if (typeof property === 'function') {
          const descriptor: PropertyDescriptor = {
            value: error_handler(property),
            configurable: true,
            writable: true,
            enumerable: false,
          };
          Object.defineProperty(this, key, descriptor);
        }
      })
    }
  }
}