# Storm Form

[![Build Status](https://travis-ci.org/mjbp/storm-form.svg?branch=master)](https://travis-ci.org/mjbp/storm-form)
[![codecov.io](http://codecov.io/github/mjbp/storm-form/coverage.svg?branch=master)](http://codecov.io/github/mjbp/storm-form?branch=master)
[![npm version](https://badge.fury.io/js/storm-form.svg)](https://badge.fury.io/js/storm-form)




## Example
[https://mjbp.github.io/storm-form](https://mjbp.github.io/storm-form)

## Usage
HTML
```
<form action="//httpbin.org/post" class="js-form">
    <div class="form__row">
        <div class="field__container">
            <label class="label" for="example-1">Label</label>
            <input class="field" type="text" id="example-1" name="example-1" value="" required>
        </div>
    </div>
    <div class="form__row">
        <div class="field__container">
            <label class="label" for="example-2">Label</label>
            <input class="field" type="email" id="example-2" name="example-2" value="" required>
        </div>
    </div>
    <button class="form__submit js-submit__btn">Submit</button>
</form>

```
CSS
Example notification CSS

```
@keyframes slideUp {
    0% {
        transform: translateY(100%)
    }
    100% {
        transform: translateY(0)
    }
}
.form-status {
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    padding:24px 48px;
    text-align:center;
    animation:slideUp 260ms ease;
}
.form-status--invalid {
    background-color:#C70933;
    color:#fff;
}
.form-status--error {
    background-color:#C70933;
    color:#fff;
}
.form-status--success {
    background-color:green;
    color:#fff;
}
.form-status--submit {
    background-color:blue;
    color:#fff;
}
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
messages: {
    invalid: 'Ensure the form is valid before submission', //form is invalid
    success: 'The form has been successfuly submitted', //form submitted
    error: 'There was an error submitting the form', //server cannot send
    submit: 'Submitting...'//form submitted, waiting for server
},
notificationTarget: document.body,
async: true,
callback: false
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