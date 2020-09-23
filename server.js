"use strict";
var express = require("express");
var path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const forms = require("./routes/api/forms");
var fs = require("fs");
require("./middleware/mailer");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

const db = require("./config/keys");

mongoose
  .connect(db.mongoURI, db.options)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/forms", forms);

app.post("/uploads", (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    const file = req.files.file;
    const user = req.body.user;
    const url = `${__dirname}/client/public/uploads/${user}/`;

    if (!fs.existsSync(url)) {
      fs.mkdirSync(url);
    }

    file.mv(`${url + file.name}`, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      res.json({
        fileName: file.name,
        filePath: `/uploads/${user}/${file.name}`,
      });
    });
  } catch (err) {
    res.json({ msg: "File with that name exist" });
  }
});

app.post("/uploads/:company/:id", (req, res) => {
  try {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file uploaded" });
    }
    const file = req.files.file;
    const company = req.params.company;
    const user = req.params.id;
    const url = `${__dirname}/client/public/uploads/company/${company}/${user}/`;
    if (!fs.existsSync(url)) {
      fs.mkdirSync(url);
    }

    file.mv(`${url + file.name}`, (err) => {
      if (err) {
        console.error(err);
        res.json({msg: "File with that name exist"})
      }
      res.json({
        fileName: file.name,
        filePath: `/uploads/company/${company}/${user}/${file.name}`,
      });
    });
  } catch (err) {
    res.json({ msg: "File with that name exist" });
  }
});

//Serve static assets if in production

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'));

  app.get('*', (req, res)=> {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
