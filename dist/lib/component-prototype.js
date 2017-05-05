import axios from 'axios/dist/axios';

const TRIGGER_EVENTS = [window.PointerEvent ? 'pointerdown' : 'ontouchstart' in window ? 'touchstart' : 'click', 'keydown' ],
      TRIGGER_KEYCODES = [13, 32],
      isGroupedInput = input => input.getAttribute('type') === 'checkbox' || input.getAttribute('type') === 'radio';
    
export default {
	init(){
		TRIGGER_EVENTS.forEach(ev => {
			this.btn.addEventListener(ev, e => {
				if(!!e.keyCode && !~TRIGGER_KEYCODES.indexOf(e.keyCode)) return;
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
		}, this.settings.notificationTimeout);
	},
	validate(){
		this.errors = this.fields.map(field => this.getError(field)).filter(field => field !== null)
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