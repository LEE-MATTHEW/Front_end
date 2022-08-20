const express = require("express");
const app = express();
const port = 3000;

const passport = require("passport");
const auth = passport.authenticate('jwt', { session: false });
require("./auth/passportJwt");
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
app.use(express.static("data"));

// # DATABASE
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/myapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


const {
  User, Follow, Article, Favorite, Comment, Token, FavoriteComment
} = require("./models/model");

// # Routes
app.get("/", async (req, res, next) => {
  res.json({ message: "Hello express" })
})

// auth에서 유저인증을 처리
// 성공할 경우 다음 callback을 실행한다
// 실패할 경우 401에러
app.get("/user",auth,async(req,res,next)=>{
  try {
    res.json(req.user);
  } catch (error) {
    next(error)
  }
})

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

// Login
app.post("/user/login", async (req,res,next)=>{
  try {
    const {email,password} = req.body;
    // 전달받은 email을 가진 user를 찾는다
    const user = await User.findOne({email});
    // 만약 user가 존재하지 않는 경우 401에러(Not Authorized)를 발생
    if(!user) {
      const err = new Error("Authentication failed");
      err.status = 401;
      return next(err);
    }
    // 전달받은 비밀번호를 user의 salt로 암호화한다
    const hashedPassword = crypto.pbkdf2Sync(password,user.salt,310000,32,"sha256").toString("hex");

    if (user.password !== hashedPassword) {
      const err = new Error("Authentication failed");
      err.status=401;
      return next(err);
    }

    // 인증에 성공한 경우 jwt(Json Web Token)을 발급한다
    // user의 username을 secret key(shhhhh)를 가지고 token을 생성한다
    const token = jwt.sign({username:user.username},"shhhhh");
    res.json({user, token});

  } catch (error) {
    next(error)
  }
})

// Profile 
// Account Edit(정보 수정)
app.post("/accounts/edit", auth, async(req,res,next)=>{
  try {
    const loginUser = req.user;
    // 로그인한 유저의 id를 가지고 user를 검색한다
    const user = await User.findById(loginUser._id);
    // bio : 자기소개
    const bio = req.body.bio;   

    // 유저의 bio를 업데이트 한다
    user.bio =bio;
    await user.save();

    res.json(user.bio);

  } catch (error) {
    next(error)
  }
})
// 프로필 image 등록
app.post("/accounts/edit/image", auth,async(req,res,next)=>{
  // 파일을 처리하기 위해서 formidable이 필요
  const form = formidable({});

  form.parse(req, async(err,fields,files)=>{
    try {
      if (err) {
        return next(err);
      }

      const loginUser = req.user;
      const user = await User.findById(loginUser._id);
      // 전달받은 이미지를 image변수에 담는다
      const image = files.image;

      const oldPath = image.filepath;
      // 원본이미지의 확장자(extension)
      const ext = image.originalFilename.split(".")[1];
      // 이미지에 새로운 이름으로 변경 (hexstring + 확장자)
      const newName = image.newFilename + "." + ext;
      // __dirname : 프로젝트의 루트 경로를 return한다
      const newPath = __dirname + "/data/users/" + newName;

      // 전달받은 이미지를 data폴더에 저장
      fs.renameSync(oldPath, newPath);

      // 유저의 이미지를 업데이트한다
      user.image=newName;
      await user.save();

      res.json(newName);

    } catch (error) {
      next(error);
    }
  })
})

// 프로필 이미지 삭제
app.delete("/accounts/edit/image", auth,async(req,res,next)=>{
  try {
    const loginUser=req.user;
    const user = await User.findById(loginUser._id);

    // 유저의 이미지를 업데이트 한다(삭제)
    user.image = null;
    await user.save();

    // 전달할 데이터가 없을 경우 서버는 응답을 종료
    res.end();

  } catch (err) {
    next(err)
  }
})


// # Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json(err);
})

// # Server running message
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
