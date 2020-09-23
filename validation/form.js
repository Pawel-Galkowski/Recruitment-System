var Validator = require("validator");
var { isEmpty } = require("./is-empty");

module.exports = {
    validateFormInput: data => {
      let errors = {};
  
      data.text = !isEmpty(data.text) ? data.text : "";
  
      if (Validator.isEmpty(data.text)) {
        errors.text = "Field is required";
      }
  
      return {
        errors,
        isValid: isEmpty(errors)
      };
    }
  };