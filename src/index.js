import { IS_DI, SERVICES_TYPE_ERROR, TARGET_TYPE_ERROR } from './const';
import validateObject from './validateObject';

const diProperties = {
  [IS_DI]: {},
  extends: {
    value(target) {
      let clone;
      if (typeof target === 'function') {
        class Subclass extends target {}
        clone = Subclass;
      } else {
        clone = Object.create(target);
      }
      return this(clone);
    },
  },
};

const defineDi = (target, value) => {
  if (typeof target === 'function') {
    validateObject(target.prototype, TARGET_TYPE_ERROR);
    Object.defineProperty(target.prototype, 'di', { value });
  } else {
    validateObject(target, TARGET_TYPE_ERROR);
  }

  Object.defineProperty(target, 'di', { value });

  return target;
};

export default class Di {
  static isDi(target) {
    return Boolean(target) && {}.hasOwnProperty.call(target, IS_DI);
  }

  constructor(services = {}) {
    validateObject(services, SERVICES_TYPE_ERROR);

    const di = target => defineDi(target, di);
    Object.defineProperties(di, diProperties);
    Object.assign(di, services);

    return di;
  }
}

Object.defineProperty(Di, 'global', {
  value: new Di(),
});
