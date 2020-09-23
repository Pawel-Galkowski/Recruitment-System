var Form = require("../models/Forms");
var Profile = require("../models/Profile");
var Promise = require("bluebird");
var validation = require("../validation");

function checkErrors(user, params, callback) {
  const { errors, isValid } = validation.form.validateFormInput(params);
  if (!isValid) {
    callback(errors, null);
    return;
  }

  const newCompany = {
    company: params.company,
    nip: params.nip,
    admins: {
      id: user.id,
    },
  };

  callback(null, newCompany);
}

module.exports = {
  post: (user, params) => {
    return new Promise((resolve, reject) => {
      checkErrors(user, params, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        Form.create(data, (err, form) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(form);
        });
      });
    });
  },
  get: (params) => {
    return new Promise((resolve, reject) => {
      Form.find(params)
        .sort({
          timestamp: -1,
        })
        .exec((err, forms) => {
          if (err) {
            reject({
              not_found: "No forms found",
            });
            return;
          }
          resolve(forms);
        });
    });
  },
  getById: (params) => {
    return new Promise((resolve, reject) => {
      Form.findById(params, (err, form) => {
        if (err) {
          reject({
            not_found: "No form found with that ID",
          });
          return;
        }
        resolve(form);
      });
    });
  },
  delete: (user, params) => {
    return new Promise((resolve, reject) => {
      const errors = {};
      Profile.findOne(
        {
          user: user.id,
        },
        (err, profile) => {
          if (err) {
            reject(err);
            return;
          }
          if (!profile) {
            errors.profile = "There is no profile for this user";
            reject(errors);
            return;
          }
          Form.findById(params, (err, form) => {
            if (err) {
              reject(err);
              return;
            }
            if (form.company.admins.id.toString() !== user.id) {
              errors.notAuthorized = "User not authorized";
              reject(errors);
              return;
            }
            form.remove((err, form) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(form);
            });
          });
        }
      );
    });
  },
  addAnswer: (user, id, params) => {
    return new Promise((resolve, reject) => {
      checkErrors(user, params, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        Form.findById(id, (err, form) => {
          if (err) {
            reject({ not_found: "No form found" });
            return;
          }
          form.comments.unshift(data);
          form.save((err, form) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(form);
          });
        });
      });
    });
  },
  addQuestions: (user, id, params) => {
    return new Promise((resolve, reject) => {
      checkErrors(user, params, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        Form.findById(id, (err, form) => {
          if (err) {
            reject({ not_found: "No form found" });
            return;
          }
          form.comments.unshift(data);
          form.save((err, form) => {
            if (err) {
              reject(err);
              return;
            }
            resolve(form);
          });
        });
      });
    });
  },
};
