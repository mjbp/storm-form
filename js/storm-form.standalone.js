/**
 * @name storm-form: Extremely lightweight form wrapper to surface form-level validity state and asynchronously POST
 * @version 0.1.0: Wed, 12 Apr 2017 16:38:11 GMT
 * @author stormid
 * @license MIT
 */
(function(root, factory) {
   var mod = {
       exports: {}
   };
   if (typeof exports !== 'undefined'){
       mod.exports = exports
       factory(mod.exports)
       module.exports = mod.exports.default
   } else {
       factory(mod.exports);
       root.StormForm = mod.exports.default
   }

}(this, function(exports) {
   'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONSTANTS = {
	TRIGGER_EVENTS: ['click', 'keydown'],
	TRIGGER_KEYCODES: [13, 32]
},
    defaults = {
	messages: {
		invalid: 'Ensure the form is valid before submission', //form is invalid
		success: 'The form has been successfuly submitted', //form submitted
		error: 'There was an error submitting the form', //server cannot send
		submit: 'Submitting...' //form submitted, waiting for server
	},
	notificationTarget: document.body,
	async: true,
	callback: false
},
    isGroupedInput = function isGroupedInput(input) {
	return input.getAttribute('type') === 'checkbox' || input.getAttribute('type') === 'radio';
};

var StormForm = {
	init: function init() {
		var _this = this;

		CONSTANTS.TRIGGER_EVENTS.forEach(function (ev) {
			_this.btn.addEventListener(ev, function (e) {
				if (!!e.keyCode && !~CONSTANTS.TRIGGER_KEYCODES.indexOf(e.keyCode)) return;
				_this.handleSubmit(e);
			});
		});

		return this;
	},
	showNotification: function showNotification(type, msg) {
		var _this2 = this;

		document.querySelector('.js-form-status') && document.querySelector('.js-form-status').parentNode.removeChild(document.querySelector('.js-form-status'));

		this.settings.notificationTarget.insertAdjacentHTML('beforeend', '<div class="js-form-status form-status form-status--' + type + '">' + (msg || this.settings.messages[type]) + '</div>');

		window.setTimeout(function () {
			document.querySelector('.js-form-status') && document.querySelector('.js-form-status').parentNode.removeChild(document.querySelector('.js-form-status'));
			_this2.btn.removeAttribute('disabled');
		}, 5000);
	},
	validate: function validate() {
		var _this3 = this;

		this.errors = this.fields.map(function (field) {
			return _this3.getError(field);
		}).filter(function (field) {
			return field !== null;
		});
	},

	handleSubmit: function handleSubmit(e) {
		e.preventDefault();
		this.btn.setAttribute('disabled', 'disabled');
		if (!this.form.checkValidity()) {
			this.showNotification('invalid');
			return;
		}

		if (this.settings.async) {
			this.submitJSON();
			return;
		}

		this.form.submit();
	},
	makeJSONFromForm: function makeJSONFromForm() {
		var data = {};

		this.fields.forEach(function (field) {
			if (!isGroupedInput(field)) data[field.name] = field.value;else if (field.checked) {
				if (data[field.name]) data[field.name].push(field.value);else data[field.name] = [field.value];
			}
		});

		return data;
	},
	submitJSON: function submitJSON() {
		var _this4 = this;

		this.showNotification('submit');
		this.btn.setAttribute('disabled', 'disabled');

		_axios2.default.post(this.form.getAttribute('action'), this.makeJSONFromForm()).then(function (res) {
			window.setTimeout(function () {
				_this4.btn.setAttribute('disabled', 'disabled');
				_this4.showNotification('success');
				_this4.form.reset();
				!!_this4.settings.callback && typeof _this4.settings.callback === 'function' && _this4.settings.callback.call(_this4);
			}, 500);
		}).catch(function (err) {
			window.setTimeout(function () {
				console.warn(err);
				_this4.btn.setAttribute('disabled', 'disabled');
				_this4.showNotification('error', err);
			}, 500);
		});
	}
};

var init = function init(sel, opts) {
	var els = [].slice.call(document.querySelectorAll(sel));

	if (!els.length) throw new Error('Form cannot be initialised, no augmentable elements found');

	return els.map(function (el) {
		return Object.assign(Object.create(StormForm), {
			form: el,
			btn: el.querySelector('.js-submit__btn'),
			fields: [].slice.call(el.querySelectorAll('input:not([type=submit]), textarea, select')),
			settings: Object.assign({}, defaults, opts)
		}).init();
	});
};

exports.default = { init: init };;
}));
