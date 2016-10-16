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

const validateTarget = (target) => {
  const targetOrPrototype = typeof target === 'function' ?
    target.prototype : target;

  validateObject(targetOrPrototype, TARGET_TYPE_ERROR);

  return targetOrPrototype;
};

const defineDi = (target, value) => {
  const targetOrPrototype = validateTarget(target);

  Object.defineProperty(targetOrPrototype, 'di', { value });

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
