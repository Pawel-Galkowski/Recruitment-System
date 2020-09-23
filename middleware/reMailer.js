"use strict";
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

async function recoveryMailer(user, secret_key) {
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const url = `http://localhost:3000/api/users/recovery/${secret_key}`;
    transporter.sendMail({
      to: user.email,
      subject: "Recovery passowrd",
      //html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
      html: `<div style="background-color: #F0F0F0; padding: 25px 0; font-size: 15px; font-family: Georgia; line-height: 25px;">
          <div style="max-width: 600px; min-width: 300px: width: auto; margin: 0 auto; text-align: center;">
              <p style="text-align: left;">
                  Hello!,<br />

                  You are receiving this email because we received a password reset request for your account.
              </p>
              <a href="${url}" style="padding: 10px 20px; width: 250px; height: 60px; background-color: #00BFFF; border-radius:10px; border: none; color: white; font-size: 20px; font-weight: bold; text-decoration:none;">Reset Password</a>
              <p style="text-align: left;">
                  If you did not request a password reset, no further action is required.
              </p>
              <p style="text-align: left;">
                  JoinJobs Team<br />
                  https://joinjobs.com
              </p>
          </div>
              </div>`
    });
    return true;
  } catch (err) {
    return err;
  }
}

module.exports = recoveryMailer;
