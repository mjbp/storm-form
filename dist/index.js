/**
 * @name storm-form: Lightweight async submit and constraint validation form wrapper.
 * @version 0.2.1: Fri, 05 May 2017 11:05:07 GMT
 * @author stormid
 * @license MIT
 */
import defaults from './lib/defaults';
import componentPrototype from './lib/component-prototype';

const init = (sel, opts) => {
	let els = [].slice.call(document.querySelectorAll(sel));
	
	if(!els.length) throw new Error('Form cannot be initialised, no augmentable elements found');

	return els.map((el) => {
		return Object.assign(Object.create(componentPrototype), {
			form: el,
			btn: el.querySelector('.js-submit__btn'),
			fields: [].slice.call(el.querySelectorAll('input:not([type=submit]), textarea, select')),
			settings: Object.assign({}, defaults, opts)
		}).init();
	});
};

export default { init };