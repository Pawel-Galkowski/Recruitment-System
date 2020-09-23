"use strict";
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function activationMailer(user, secret_key) {
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });
    let aUser = user.email;
    let userId = user.id;

    let msgStyle = "background-color: #F0F0F0; padding: 25px 0; font-size: 15px; font-family: Georgia; line-height: 25px;";
    let buttonStyle = "padding: 10px 20px; width: 250px; height: 60px; background-color: #00BFFF; border-radius:10px; border: none; color: white; font-size: 20px; font-weight: bold; text-decoration:none;"

    const secret_token = await bcrypt.hash(user.id, secret_key);

    jwt.sign(
      {
        user: userId
      },
      secret_token,
      {
        expiresIn: "1d"
      },
      (err, secret_token) => {
        const url = `http://localhost:3000/api/users/confirmation/${secret_token}`;
        transporter.sendMail({
          to: aUser,
          subject: "Confirmation Email",
          //html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
          html: `<div style="${msgStyle}">
          <div style="max-width: 600px; min-width: 300px: width: auto; margin: 0 auto; text-align: center;">
              <p style="text-align: left;">
                  Hello ${user.name},<br />
      
                  Thanks for signing up with JoinJobs! <br />
                  In order to activate your account, we require that you confirm your email address.
              </p>
              <a href="${url}" style="${buttonStyle}">Confirmation</a>
              <p style="text-align: left;">
                  If you did not sign up to JoinJobs, you can safely ignore this email.
              </p>
              <p style="text-align: left;">
                  JoinJobs Team<br />
                  https://joinjobs.com
              </p>
          </div>
              </div>`
        });
      }
    );
    return true;
  } catch (err) {
    return err;
  }
}

module.exports = activationMailer;
