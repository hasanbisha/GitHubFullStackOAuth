const express = require("express");
const qs = require("querystring");
const axios = require("axios");
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const app = express();

// Midleware
// Express sessions midleware
app.use(session({ secret: "ssshhhhh" }));
// Cors
app.use(cors());
// Cookie parser
app.use(cookieParser());
// Midleware

// Connect to mongoose
mongoose.connect("mongodb://localhost/GitUsers", { useNewUrlParser: true });

// Models
const User = require("./models/User");
const Repository = require("./models/Repositories");

const client_id = "2237242856abff508eea";
const redirect_uri = "http://localhost:5000/api/user/signin/callback";
const client_secret = "c62a58231e26409023dd994acde0f50bfd874a31";
let access_token = "";

// Authenticate with GITHUB //
app.get("/api/login", (req, res) => {
  const GitHubUrl =
    "https://github.com/login/oauth/authorize?" +
    qs.stringify({
      client_id: client_id,
      redirect_uri: redirect_uri
    });
  res.redirect(GitHubUrl);
});

app.get("/api/user/signin/callback", (req, res) => {
  code = req.query.code;

  axios
    .post("https://github.com/login/oauth/access_token", {
      client_id: client_id,
      client_secret: client_secret,
      code: code
    })
    .then(res => {
      req.session.access_token = res.data.slice(
        res.data.indexOf("n=") + 2,
        res.data.indexOf("&s")
      );
    })
    .then(() => {
      access_token = req.session.access_token;
      if (req.session.access_token) {
        axios({
          url: "https://api.github.com/user",
          method: "GET",
          headers: {
            Authorization: `token ${access_token}`
          }
        }).then(response => {
          res
            .cookie("access_token", req.session.access_token)
            .cookie("login", response.data.login)
            .redirect(`http://localhost:3000/`);
        });
      }
    });
});
// Authenticate with GITHUB //

// @GET /api/user/basic-credentials
// @ basic user credentials
app.get("/api/user/basic-credentials", (req, res) => {
  axios({
    url: "https://api.github.com/user",
    method: "GET",
    headers: {
      Authorization: `token ${access_token}`
    }
  }).then(response => {
    User.find({ name: response.data.login }, (err, UserNumber) => {
      // Saving on db
      // Creating the new user variable
      const newUser = new User({
        id: response.data.id,
        name: response.data.login,
        email: response.data.email,
        url: response.data.url,
        avatar_url: response.data.avatar_url,
        created_at: response.data.created_at
      });
      if (UserNumber.length > 0) {
        // console.log("User alredy exist");
      } else {
        newUser.save((err, User) => {
          if (err) {
            // console.log(err);
          } else {
            // console.log("User added");
          }
        });
      }
    });
    res.json(response.data);
  });
});

app.get("/api/user/repositories", (req, res) => {
  axios({
    method: "GET",
    url: `https://api.github.com/user/repos?visibility=all`,
    headers: {
      Authorization: `token ${access_token}`
    }
  }).then(response => {
    const Urls = response.data.map(repository => {
      return repository;
    });

    Urls.map(url => {
      Repository.find({ url: url.url }, (err, response) => {
        if (response.length > 0) {
          //console.log("Repository alredy exists");
        } else {
          const newRepo = new Repository({
            id: url.id,
            name: url.full_name,
            url: url.url,
            owner: url.owner.login
          });

          newRepo.save((err, response) => {
            if (err) {
              console.log(err);
            }
          });
        }
      });
    });

    res.json(response.data);
  });
});

app.listen(5000, () => console.log("App started on port 5000"));
