const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileImput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';


    if (!Validator.isLenght(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to between 2 and 40 characters';
    };

    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    };

    if (Validator.isEmpty(data.status)) {
        errors.status = 'Profile status is required';
    };

    if (Validator.isEmpty(data.skills)) {
        errors.skills = 'Profile skills is required';
    };

    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = 'not a valid URL';
        }
    }

    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = 'not a valid URL';
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'not a valid URL';
        }
    }

    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = 'not a valid URL';
        }
    }

    if (!isEmpty(data.github)) {
        if (!Validator.isURL(data.github)) {
            errors.github = 'not a valid URL';
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}