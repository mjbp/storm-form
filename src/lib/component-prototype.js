import 'whatwg-fetch';

const TRIGGER_EVENTS = ['ontouchstart' in window ? 'touchstart' : 'click', 'keydown'],
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
	validate(){
		this.errors = this.fields.map(field => this.getError(field)).filter(field => field !== null)
	},
	handleSubmit: function(e){
		e.preventDefault();
		
		if(!this.form.checkValidity()) return;
		if(this.settings.async) this.submitJSON();
		else this.form.submit();

	},
	makeJSONFromForm(){
		return this.fields.reduce((data, field) => {
			if(!isGroupedInput(field)) data[field.name] = field.value;
			else if (field.checked) {
				if(data[field.name]) data[field.name].push(field.value);
				else data[field.name] = [field.value];
			}
			return data;
		}, {});
	},
	submitJSON(){
		this.btn.setAttribute('disabled', 'disabled');

		fetch(this.form.getAttribute('action'), {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(this.makeJSONFromForm())
			})
			.then(res => res.json())
			.then(res => {
				this.btn.removeAttribute('disabled');
				//window.notify({message: this.settings.messages.success});
				this.form.reset();
			})
			.catch(err => {
				console.warn(err);
				this.btn.removeAttribute('disabled');
				//window.notify({title: this.settings.messages.error});
			});
	},
};