ziras-di
==========

Minimal Dependency Injection

Example
-------

`` Di.global `` is a singleton of the Di class.

Register your dependency to a di instance.

```js
Di.global.YourDependency = YourDepedency;
Di.global.yourDependency = new YourDependency();
Di.global.yourDependency = (...args) => new YourDependency(...args);
```

Apply a Di instance to your class. It applies to both itself and its prototype.

```js
import Di from '@exosite/ziras-di';

class YourClass {}
Di.global(YourClass);
```

Use dependency depending on how it's registered.

```js
import Di from '@exosite/ziras-di';

class YourClass {
    static factory() {
        this.yourDependency = new this.di.YourDependency();
        this.yourDependency = this.di.yourDependency;
        this.yourDependency = this.di.yourDependency();
    }

    constructor() {
        this.yourDependency = new this.di.YourDependency();
        this.yourDependency = this.di.yourDependency;
        this.yourDependency = this.di.yourDependency();
    }
}
Di.global(YourClass);
```

Create a Di instance and register services.

```js
const di = new Di({
  YourDependency,
  yourDependency: new YourDependency(),
  yourDependency(...args) {
    return new YourDependency(...args);
  }
});
```

Of course you can still do the old-school way. But it's not recommended.

```js
const di = new Di();
di.YourDependency = YourDepedency;
di.yourDependency = new YourDependency();
di.yourDependency = (...args) => new YourDependency(...args);
```

Test a Di'ed class with a different Di instance.

```js
const di = new Di();
const SubclassYourClass = di.extends(YourClass);

// Test against SubclassYourClass
```

The reason a subclass is created and tested against is so that the original
class isn't modified and this should prevent us from making mistakes, e.g.
forgot to re-apply the original Di instance to the original class.

Apply di to an object is also possible.

```js
const yourObject = {};
Di.global(yourObject);
```

Development
-----------

Run test in Node.js

```sh
npm test -- watch
```

Run test in browser

```sh
npm start
```

License
-------

MIT
