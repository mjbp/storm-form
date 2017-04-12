# Storm Form

[![Build Status](https://travis-ci.org/mjbp/storm-form.svg?branch=master)](https://travis-ci.org/mjbp/storm-form)
[![codecov.io](http://codecov.io/github/mjbp/storm-form/coverage.svg?branch=master)](http://codecov.io/github/mjbp/storm-form?branch=master)
[![npm version](https://badge.fury.io/js/storm-form.svg)](https://badge.fury.io/js/storm-form)




## Example
[https://mjbp.github.io/storm-form](https://mjbp.github.io/storm-form)

## Usage
HTML
```





```

JS
```
npm i -S storm-form
```
either using es6 import
```
import Form from 'storm-form';

Form.init('.js-Form');
```
asynchronous browser loading (use the .standalone version in the /dist folder) using the global name (Storm + capitalised package name)
```
import Load from 'storm-load';

Load('{{path}}/storm-form.standalone.js')
    .then(() => {
        StormForm.init('.js-form');
    });
```

## Options
```
{
}
```

## Tests
```
npm run test
```

## Browser support
This is module has both es6 and es5 distributions. The es6 version should be used in a workflow that transpiles.

The es5 version depends upon HTML5 Form Constraint Validation API, Object.assign, element.classList, and Promises so all evergreen browsers are supported out of the box, ie9+ is supported with polyfills. ie8+ will work with even more polyfills for Array functions and eventListeners.

## Dependencies
Axios

## License
MIT