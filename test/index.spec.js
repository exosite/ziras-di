import Di from '../src/';
import { SERVICES_TYPE_ERROR, TARGET_TYPE_ERROR } from '../src/const';

describe('Feature: Di', () => {
  describe('Scenario: Di.extends a class', () => {
    const eg = {};

    describe('Given Car is a class', () => {
      class Car {}
      eg.Car = Car;
      eg.Car.should.be.an('function');
    });

    describe('And Di.global is applied to Car', () => {
      Di.global(eg.Car);
    });

    describe('And di is an instance of Di', () => {
      eg.di = new Di();
    });

    describe('And a subclass of Car is created by di.extend to Car', () => {
      eg.Subclass = eg.di.extends(eg.Car);
    });

    describe('When an instance of the subclass is created', () => {
      eg.instance = new eg.Subclass();
      eg.instance.should.be.instanceof(eg.Subclass);
    });

    describe('Then the instance is a subclass of Car', () => {
      eg.instance.should.be.instanceof(eg.Car);
    });

    describe('And the instance is using di', () => {
      eg.instance.should.have.property('di', eg.di);
    });
  });

  describe('Scenario: Di.extends an object', () => {
    const eg = {};

    describe('Given car is an object', () => {
      eg.car = {};
      eg.car.should.be.an('object');
    });

    describe('And Di.global is applied to the car', () => {
      Di.global(eg.car);
    });

    describe('And di is an instance of Di', () => {
      eg.di = new Di();
    });

    describe('When di.extends is applied to the car', () => {
      eg.returnValue = eg.di.extends(eg.car);
    });

    describe('Then the return value is a clone of car', () => {
      Object.getPrototypeOf(eg.returnValue).should.equal(eg.car);
    });

    describe('And the returnValue is using di', () => {
      eg.returnValue.should.have.property('di', eg.di);
    });
  });

  describe('Scenario: Di.global is a singleton of Di', () => {
    specify('Given Di.global ' +
      'Then Di.global should be an instance of Di', () => {
      Di.isDi(Di.global).should.be.true();
    });
  });

  describe('Scenario: Write to Di.global', () => {
    specify('Given Di.global ' +
      'When Di.global is written ' +
      'Then TypeError should be thrown', () => {
      (() => { Di.global = {}; }).should.throw(TypeError);
    });
  });

  describe('Scenario: Configure Di.global', () => {
    specify('Given Di.global ' +
      'When Di.global is configured ' +
      'Then TypeError should be thrown', () => {
      (() => { delete Di.global; }).should.throw(TypeError);
    });
  });

  describe('Scenario: use a di\'ed object', () => {
    const eg = {};

    specify('Given engine is an object', () => {
      eg.engine = {};
      eg.engine.should.be.an('object');
    });

    specify('And di is an instance of Di', () => {
      eg.di = new Di();
    });

    specify('And calling di.engine returns the engine', () => {
      eg.di.engine = () => eg.engine;
      eg.di.engine().should.equal(eg.engine);
    });

    specify('And car is an object ' +
      'And calling car.engine returns the engine from its di', () => {
      eg.car = {
        engine() {
          return this.di.engine();
        },
      };
      eg.car.should.be.an('object');
    });

    specify('And di is applied to car', () => {
      eg.di(eg.car);
    });

    specify('When car.engine is called', () => {
      eg.returnValue = eg.car.engine();
    });

    specify('Then the engine is returned', () => {
      eg.returnValue.should.equal(eg.engine);
    });
  });

  describe('Scenario: use a di\'ed class with prototype', () => {
    const eg = {};

    specify('Given engine is an object', () => {
      eg.engine = {};
      eg.engine.should.be.an('object');
    });

    specify('And di is an instance of Di', () => {
      eg.di = new Di();
    });

    specify('And calling di.engine returns the engine', () => {
      eg.di.engine = () => eg.engine;
      eg.di.engine().should.equal(eg.engine);
    });

    specify('And Car is a class ' +
      'And calling engine on itself returns the engine from its di' +
      'And calling engine on its instance returns the engine from its di', () => {
      class Car {
        static engine() {
          return this.di.engine();
        }
        engine() {
          return this.di.engine();
        }
      }
      eg.Car = Car;
      eg.Car.should.be.a('function');
    });

    specify('And di is applied to Car', () => {
      eg.di(eg.Car);
    });

    specify('And car is an instance of Car', () => {
      eg.car = new eg.Car();
      eg.car.should.be.instanceof(eg.Car);
    });

    specify('And Car.engine is called', () => {
      eg.returnValue1 = eg.Car.engine();
    });

    specify('When car.engine is called', () => {
      eg.returnValue2 = eg.car.engine();
    });

    specify('Then the engine is returned', () => {
      eg.returnValue1.should.equal(eg.engine);
      eg.returnValue2.should.equal(eg.engine);
    });
  });

  describe('Scenario: Create di with services', () => {
    const eg = {};

    specify('Given an engine', () => {
      eg.engine = {};
    });

    specify('And di is an instance of Di ' +
      'And it is created with engine', () => {
      eg.di = new Di({
        engine: eg.engine,
      });
    });

    specify('When di.engine is returned ', () => {
      eg.returnValue = eg.di.engine;
    });

    specify('Then it should equal to the engine', () => {
      eg.returnValue.should.equal(eg.engine);
    });
  });

  describe('Scenario: di an object', () => {
    const eg = {};

    specify('Given car is an object', () => {
      eg.car = {};
    });

    specify('When Di.global is applied to the car', () => {
      eg.returnValue = Di.global(eg.car);
    });

    specify('Then the car should be returned', () => {
      eg.returnValue.should.equal(eg.car);
    });
  });

  describe('Scenario: di a class', () => {
    const eg = {};

    specify('Given Car is a class', () => {
      class Car {}
      eg.Car = Car;
    });

    specify('When Di.global is applied to Car', () => {
      eg.returnValue = Di.global(eg.Car);
    });

    specify('Then Car should be returned', () => {
      eg.returnValue.should.equal(eg.Car);
    });
  });

  describe('Scenario: Create di with null', () => {
    specify('When an instance of Di is created with null ' +
      'Then TypeError should be throw', () => {
      (() => new Di(null)).should.throw(TypeError, SERVICES_TYPE_ERROR);
    });
  });

  describe('Scenario: Create di with non object', () => {
    specify('When an instance of Di is created with non object ' +
      'Then TypeError should be throw', () => {
      (() => new Di(1)).should.throw(TypeError, SERVICES_TYPE_ERROR);
    });
  });

  describe('Scenario: di null', () => {
    const eg = {};

    specify('Given di is an instance of Di', () => {
      eg.di = new Di();
    });

    specify('And car is null', () => {
      eg.car = null;
      (eg.car === null).should.be.true();
    });

    specify('When di is applied to car ' +
      'Then TypeError should be thrown', () => {
      (() => eg.di(eg.car)).should.throw(TypeError, TARGET_TYPE_ERROR);
    });
  });

  describe('Scenario: di a class without prototype', () => {
    const eg = {};

    specify('Given di is an instance of Di', () => {
      eg.di = new Di();
    });

    specify('And Car is a class ' +
      'And its prototype is not an object', () => {
      class Car {}
      Car.prototype = undefined;
      eg.Car = Car;
      eg.Car.should.not.be.an('object');
    });

    specify('When di is applied to Car ' +
      'Then TypeError should be thrown', () => {
      (() => eg.di(eg.Car)).should.throw(TypeError, TARGET_TYPE_ERROR);
    });
  });

  describe('Scenario: Check is Di on an di instance', () => {
    const eg = {};

    specify('Given di is created by Di', () => {
      eg.di = new Di();
    });

    specify('When Di.isDi is called with di', () => {
      eg.returnValue = Di.isDi(eg.di);
    });

    specify('Then the return value should be true', () => {
      eg.returnValue.should.be.true();
    });
  });

  describe('Scenario: Check is Di on null', () => {
    const eg = {};

    specify('When Di.isDi is called with null', () => {
      eg.returnValue = Di.isDi(null);
    });

    specify('Then the return value should be false', () => {
      eg.returnValue.should.be.false();
    });
  });

  describe('Scenario: Delete di', () => {
    const eg = {};

    specify('Given car is an object', () => {
      eg.car = {};
    });

    specify('And Di.global is applied to car', () => {
      Di.global(eg.car);
    });

    specify('When car.di is deleted ' +
      'Then TypeError should be thrown', () => {
      (() => delete eg.car.di).should.throw(TypeError);
    });
  });

  describe('Scenario: Write di to di', () => {
    const eg = {};

    specify('Given car is an object', () => {
      eg.car = {};
    });

    specify('And Di.global is applied to car', () => {
      Di.global(eg.car);
    });

    specify('When car.di is written ' +
      'Then TypeError should be thrown', () => {
      (() => { eg.car.di = new Di(); }).should.throw(TypeError);
    });
  });

  describe('Scenario: Enumerate di', () => {
    const eg = {};

    specify('Given car is an object', () => {
      eg.car = {};
    });

    specify('And Di.global is applied to car', () => {
      Di.global(eg.car);
    });

    specify('When keys for car are returned', () => {
      eg.keys = Object.keys(eg.car);
    });

    specify('Then di is not in keys', () => {
      eg.keys.indexOf('di').should.equal(-1);
    });
  });
});
