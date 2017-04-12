import Form from './libs/storm-form';
import TextField from 'storm-text-field';

const onDOMContentLoadedTasks = [() => {
    Form.init('.js-form');
    TextField.init('.js-text-field');
}];
    
if('addEventListener' in window) window.addEventListener('DOMContentLoaded', () => { onDOMContentLoadedTasks.forEach((fn) => fn()); });