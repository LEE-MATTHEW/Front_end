const express = require("express");
const app = express();
const port = 3000;

const passport = require("passport");
const auth = passport.authenticate('jwt', { session: false });
// require("./auth/passportJwt");
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const fs = require("fs")
const formidable = require("formidable");

const crypto = require("crypto");

// # MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// app.use(express.static(""));

// # DATABASE
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// # Routes
app.get("/", async (req, res, next) => {
  res.json({ message: "Hello express" })
})

const {
  User, Follow, Article, Favorite, Comment, Token, FavoriteComment
} = require("./models/model");

// Sign up
app.post("/users", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // 비밀번호를 암호화한다.
    // salt = 임의의 문자
    const salt = crypto.randomBytes(16).toString("hex");
    // hashedPassword = 암호화된 비밀번호
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 310000, 32, "sha256").toString("hex")
    // sha256 : 암호화 알고리즘
    // DB에 salt를 같이 저장해주어야한다. 암호화를 한후 다시 풀어야 하기 때문에
    const user = new User({
      username,
      email,
      password: hashedPassword,
      salt
    })

    await user.save();

    res.json(user);
  } catch (err) {
    next(err)
  }
})

// # Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).jsosn(err);
})

// # Server running message
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
