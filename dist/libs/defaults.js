export default {
    messages: {
        invalid: 'Ensure the form is valid before submission', //form is invalid
        success: 'The form has been successfuly submitted', //form submitted
        error: 'There was an error submitting the form', //server cannot send
        submit: 'Submitting...'//form submitted, waiting for server
    },
    notificationTarget: document.body,
    notificationTimeout: 5000,
    async: true,
    callback: false
};