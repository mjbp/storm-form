import axios from 'axios';

const CONSTANTS = {
		TRIGGER_EVENTS: ['click', 'keydown'],
		TRIGGER_KEYCODES: [13, 32]
	},
	defaults = {
		messages: {
			invalid: 'Ensure the form is valid before submission', //form is invalid
			success: 'The form has been successfuly submitted', //form submitted
			error: 'There was an error submitting the form', //server cannot send
			submit: 'Submitting...'//form submitted, waiting for server
		},
		notificationTarget: document.body,
		async: true,
		callback: false
	},
	isGroupedInput = input => input.getAttribute('type') === 'checkbox' || input.getAttribute('type') === 'radio';

const StormForm = {
	init(){
		CONSTANTS.TRIGGER_EVENTS.forEach(ev => {
			this.btn.addEventListener(ev, e => {
				if(!!e.keyCode && !~CONSTANTS.TRIGGER_KEYCODES.indexOf(e.keyCode)) return;
				this.handleSubmit(e);
			});
		});

		return this;
	},
	showNotification(type, msg){
		document.querySelector('.js-form-status') && document.querySelector('.js-form-status').parentNode.removeChild(document.querySelector('.js-form-status'));

		this.settings.notificationTarget.insertAdjacentHTML('beforeend', `<div class="js-form-status form-status form-status--${type}">${msg || this.settings.messages[type]}</div>`);

		window.setTimeout(() => {
			document.querySelector('.js-form-status') && document.querySelector('.js-form-status').parentNode.removeChild(document.querySelector('.js-form-status'));
			this.btn.removeAttribute('disabled');
		}, 5000);
	},
	validate(){
		this.errors = this.fields.map(field => {
			return this.getError(field);
		}).filter(field => {
			return field !== null;
		})
	},
	handleSubmit: function(e){
		e.preventDefault();
		this.btn.setAttribute('disabled', 'disabled');
		if(!this.form.checkValidity()) {
			this.showNotification('invalid');
			return;
		}
		
		if(this.settings.async){
			this.submitJSON();
			return;
		}

		this.form.submit();

	},
	makeJSONFromForm(){
		let data = {};

		this.fields.forEach(field => {
			if(!isGroupedInput(field)) data[field.name] = field.value;
			else if (field.checked) {
				if(data[field.name]) data[field.name].push(field.value);
				else data[field.name] = [field.value];
			}
		});

		return data;
	},
	submitJSON(){
		this.showNotification('submit');
		this.btn.setAttribute('disabled', 'disabled');

		axios.post(this.form.getAttribute('action'), this.makeJSONFromForm())
			.then(res => {
				window.setTimeout(() => {
					this.btn.setAttribute('disabled', 'disabled');
					this.showNotification('success');
					this.form.reset();
					(!!this.settings.callback && typeof this.settings.callback === 'function') && this.settings.callback.call(this);
				}, 500);
			})
			.catch(err => {
				window.setTimeout(() => {
					console.warn(err);
					this.btn.setAttribute('disabled', 'disabled');
					this.showNotification('error', err);
				}, 500);
			});
	},
};

const init = (sel, opts) => {
	let els = [].slice.call(document.querySelectorAll(sel));
	
	if(!els.length) throw new Error('Form cannot be initialised, no augmentable elements found');

	return els.map((el) => {
		return Object.assign(Object.create(StormForm), {
			form: el,
			btn: el.querySelector('.js-submit__btn'),
			fields: [].slice.call(el.querySelectorAll('input:not([type=submit]), textarea, select')),
			settings: Object.assign({}, defaults, opts)
		}).init();
	});
};

export default { init };