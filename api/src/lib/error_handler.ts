import { RequestHandler } from "express";
import { InternalError } from "../errors/internal_error";
import { ValidationError } from "yup";
import { DefaultError } from "../errors/default_error";

export function error_handler<T extends CallableFunction>(target: T): T {
  const handler: RequestHandler = async function(req, res, next) {
    try {
      await target(req, res, next)
    } catch(error: any) {
      if(error instanceof DefaultError) {
        res.status(error.code)
          .json({ error })
      } else if(error instanceof ValidationError) {
        res.status(400)
          .json({ error })
      } else {
        console.error(error);
        res.status(500)
          .json({ error: new InternalError(error) })
      }
    }
  }
  return handler as unknown as typeof target;
}

export function ErrorProcessing<T extends { new (...args: any[]): any }>(target_class: T) {
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