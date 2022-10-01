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
app.get("/user", auth, async (req, res, next) => {
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

//  Sign Up validation
app.get("/validation/username", async(req,res,next)=>{
  try {
    const user = await User.findOne({ username: req.query.value})
    res.json(user);
  } catch (error) {
    next(error)
  }
}
)
app.get("/validation/email", async(req,res,next)=>{
  try {
    const user = await User.findOne({ email: req.query.value})
    res.json(user);
  } catch (error) {
    next(error)
  }
})

// Login
app.post("/user/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // 전달받은 email을 가진 user를 찾는다
    const user = await User.findOne({ email });
    // 만약 user가 존재하지 않는 경우 401에러(Not Authorized)를 발생
    if (!user) {
      const err = new Error("Authentication failed");
      err.status = 401;
      return next(err);
    }
    // 전달받은 비밀번호를 user의 salt로 암호화한다
    const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 310000, 32, "sha256").toString("hex");

    if (user.password !== hashedPassword) {
      const err = new Error("Authentication failed");
      err.status = 401;
      return next(err);
    }

    // 인증에 성공한 경우 jwt(Json Web Token)을 발급한다
    // user의 username을 secret key(shhhhh)를 가지고 token을 생성한다
    const token = jwt.sign({ username: user.username }, "shhhhh");
    res.json({ user, token });

  } catch (error) {
    next(error)
  }
})

// Profile 
app.get("/profiles/:username", auth, async (req, res, next) => {
  try {
    const loginUser = req.user;
    const username = req.params.username;
    // 파라미터로 전달받은 username으로 유저를 검색한다.
    const user = await User.findOne({ username });

    // 유저가 존재하지 않을 경우 404에러(Not found)를 발생
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
    // 팔로우 및 게시물 데이터
    const following = await Follow.findOne({ follower: loginUser._id, following: user._id });
    // 유저의 팔로잉 수
    const followingCount = await Follow.countDocuments({ follower: user._id });
    // 유저의 팔로워 수
    const followersCount = await Follow.countDocuments({ following: user._id });
    // 게시물 수 
    const articlesCount = await Article.countDocuments({ user: user._id });

    const profile = {
      username: user.username,
      bio: user.bio,
      image: user.image,
      isFollowing: following ? true : false,
      followersCount,
      followingCount,
      articlesCount
    }

    res.json(profile);
  } catch (err) {
    next(err)
  }
})

app.get("/profiles/:username/articles", auth, async (req, res, next) => {
  try {
    // 파라미터로 전달된 username으로 유저를 검색한다
    const username = req.params.username;
    const user = await User.findOne({ username });

    // 유저가 존재하지 않을 경우 404에러 발생
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }

    // 유저가 작성한 게시물을 검색 
    const articles = await Article.find({ user: user._id })
      .sort([["created", "descending"]])
      .populate("user")

    res.json(articles);

  } catch (err) {
    next(err)
  }
})

// Account Edit(정보 수정)
app.post("/accounts/edit", auth, async (req, res, next) => {
  try {
    const loginUser = req.user;
    // 로그인한 유저의 id를 가지고 user를 검색한다
    const user = await User.findById(loginUser._id);
    // bio : 자기소개
    const bio = req.body.bio;

    // 유저의 bio를 업데이트 한다
    user.bio = bio;
    await user.save();

    res.json(user.bio);

  } catch (error) {
    next(error)
  }
})
// 프로필 image 등록
app.post("/accounts/edit/image", auth, async (req, res, next) => {
  // 파일을 처리하기 위해서 formidable이 필요
  const form = formidable({});

  form.parse(req, async (err, fields, files) => {
    try {
      if (err) {
        return next(err);
      }

      const loginUser = req.user;
      const user = await User.findById(loginUser._id);
      // 전달받은 이미지를 image변수에 담는다
      const image = files.image;

      const oldpath = image.filepath;
      // 원본이미지의 확장자(extension)
      const ext = image.originalFilename.split(".")[1];
      // 이미지에 새로운 이름으로 변경 (hexstring + 확장자)
      const newName = image.newFilename + "." + ext;
      // __dirname : 프로젝트의 루트 경로를 return한다
      const newPath = __dirname + "/data/users/" + newName;

      // 전달받은 이미지를 data폴더에 저장
      fs.renameSync(oldpath, newPath);

      // 유저의 이미지를 업데이트한다
      user.image = newName;
      await user.save();

      res.json(newName);

    } catch (error) {
      next(error);
    }
  })
})

// 프로필 이미지 삭제
app.delete("/accounts/edit/image", auth, async (req, res, next) => {
  try {
    const loginUser = req.user;
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

// 팔로우
app.post("/profiles/:username/follow", auth, async (req, res, next) => {

  try {
    const loginUser = req.user;
    const username = req.params.username;
    const user = await User.findOne({ username });
    // 팔로우 데이터 검색
    // 로그인 유저가 파라미터로 전달된 유저를 팔로잉 하는지 확인
    const follow = await Follow.findOne({ follower: loginUser._id, following: user._id });
    // 이미 팔로잉 중인 경우 400에러(Bad Request) 발생
    if (follow) {
      const err = new Error("Aleady Follow");
      err.status = 400;
      return next(err);
    }
    const newFollow = new Follow({
      follower: loginUser._id,
      following: user._id
    })
    await newFollow.save();
    res.json(newFollow)
  } catch (err) {
    next(err)
  }
});

app.delete("/profiles/:username/follow", auth, async (req, res, next) => {
  try {
    const loginUser = req.user;
    const username = req.params.username;
    const user = await User.findOne({ username });
    // 팔로우 데이터 검색
    const follow = await Follow.findOne({ follower: loginUser._id, following: user._id });

    // 팔로우 데이터가 존재하지 않을경우 400에러 발생
    if (!follow) {
      const err = new Error("Follow not found");
      err.status = 400;
      return next(err);
    }
    await follow.delete();
    res.end();
  } catch (err) {
    next(err);
  }
})

// 팔로워 및 팔로잉 리스트
app.get("/profiles/:username/followers", auth, async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    // 팔로우 데이터를 검색
    const follows = await Follow.find({ following: user._id }).populate("follower");
    res.json(follows);
  } catch (err) {
    next(err)
  }
})

app.get("/profiles/:username/following", auth, async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    // 팔로우 데이터를 검색
    const follows = await Follow.find({ follower: user._id }).populate("following");
    res.json(follows);
  } catch (err) {
    next(err)
  }
})

// 피드
app.get("/feed", auth, async (req, res, next) => {
  try {
    const loginUser = req.user;
    const follows = await Follow.find({ follower: loginUser._id });
    // 로그인 유저가 팔로우하는 유저의 게시물과 로그인 유저 본인의 게시물 검색
    const articles = await Article
      .find({ user: [...follows.map(follow => follow.following), loginUser._id] })
      .sort([["created", "descending"]])
      .populate("user");
    // 로그인한 유저가 좋아하는 게시물인지 아닌지 확인
    // article.isFavorite
    for (let article of articles) {
      const favorite = await Favorite.findOne({ user: loginUser._id, article: article._id })
      // article에 isFavorite 키를 추가
      article.isFavorite = favorite ? true : false;
    }

    res.json(articles)

  } catch (error) {
    next(error)
  }
})

// 게시물
app.post("/articles", auth, async (req, res, next) => {

  // form에서 파일이 있는 경우 formidable을 사용한다
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    try {
      const loginUser = req.user;
      if (err) {
        return next(err);
      }
      // 파일이 여러개인 경우 Array의 형태로 전달된다
      // 파일이 하나인 경우 Object의 형태로 전달된다
      // photos 변수에 전달받은 파일을 담는다
      // photos는 파일 Array이다

      // res.json({fields, files})
      const photos = files.photos instanceof Array ? files.photos : new Array(files.photos);
      // return console.log(photos)
      // 파일이 없는 경우 400에러를 발생시킨다
      if (!photos[0].originalFilename) {
        const err = new Error("Image must be specified");
        err.status = 400;
        return next(err);
      }
      // image validation check needed
      const photoList = photos.map(photo => {
        // 파일을 정적폴더에 저장한다
        const oldpath = photo.filepath;
        const ext = photo.originalFilename.split(".")[1]
        const newName = photo.newFilename + "." + ext;
        const newpath = __dirname + "/data/articles/" + newName;

        fs.renameSync(oldpath, newpath);

        // 새로운 파일이름을 return한다
        return newName;
      })
      // 게시글을 저장한다
      const article = new Article({
        description: fields.description,
        photos: photoList,
        user: loginUser._id
      })
      await article.save();
      res.json(photoList)
    } catch (error) {
      next(error)
    }
  });
})


// 전체 게시물 가져오기
app.get("/articles", auth, async (req, res, next) => {
  try {
    const articles = await Article.find()
      .sort([["created", "descending"]]).populate("user")

    res.json(articles);

  } catch (error) {
    next(error)
  }
})

// 특정 게시물 가져오기
app.get("/articles/:id", auth, async (req, res, next) => {
  try {
    const loginUser = req.user;
    const id = req.params.id;
    // 파라미터로 전달된 id로 게시물을 검색
    // lean() : mongoDB Document 인스턴스를 일반 JavaScript Object로 변환
    // 변환이 된 경우, MongoDB Document를 일반 JavaScript Object로 다룰 수 있다
    // 예) MogoDB Document 에 새로운 key를 추가하는 등
    const article = await Article.findById(id).populate("user").lean();

    // 게시물이 존대하지 않는 경우 404에러를 발생
    if (!article) {
      const err = new Error("Article not found")
      err.status = 404;
      return next(err);
    }

    // 로그인 유저가 좋아요 누른 게시물인지 확인
    const favorite = await Favorite.findOne({ user: loginUser._id, article: article._id })
    // article에 isFavorite 키를 추가
    article.isFavorite = favorite ? true : false;

    res.json(article)
  } catch (error) {
    next(error)
  }
})

app.delete("/articles/:id", auth, async (req, res, next) => {
  try {
    const id = req.params.id;
    const article = await Article.findById(id);

    if (!article) {
      const err = new Error("Article not found");
      err.status = 404;
      return next(err);
    }
    await article.delete();
    res.end();
  } catch (err) {
    next(err)
  }
})

// 게시물 좋아요
app.post("/articles/:id/favorite", auth, async (req, res, next) => {
  try {
    // 로그인한 유저
    const loginUser = req.user;
    const id = req.params.id;
    // id에 일치하는 게시물을 찾는다
    const article = await Article.findById(id);
    // 로그인한 유저가 좋아요를 이미 누른 게시물인지 확인
    const favorite = await Favorite.findOne({ user: loginUser._id, article: article._id })

    // 이미 좋아요를 누른 게시물인 경우
    if (favorite) {
      const err = new Error("Aleady favorite article");
      err.status = 400;
      return next(err)
    }

    // 새로운 favorite 데이터를 만든다
    const newFavorite = new Favorite({
      user: loginUser._id,
      article: article._id
    })
    await newFavorite.save();

    // id에 일치하는 게시물의 좋아요를 1증가 
    article.favoriteCount++;
    await article.save();
    res.end();
  } catch (error) {
    next(error)
  }
})

// 좋아요 취소
app.delete("/articles/:id/favorite", auth, async (req, res, next) => {
  try {
    const loginUser = req.user;
    const id = req.params.id;
    const article = await Article.findById(id);
    const favorite = await Favorite.findOne({ user: loginUser._id, article: article._id })

    if (!favorite) {
      const err = new Error("Aleady unfavorite article");
      err.status = 400;
      return next(err)
    }

    // favorite document를 삭제
    await favorite.delete();

    // 게시물의 좋아요 1감소
    article.favoriteCount--;
    await article.save();

    res.end();

  } catch (error) {
    next(error)
  }
})

// 댓글
app.post("/articles/:id/comments", auth, async (req, res, next) => {
  try {
    const loginUser = req.user;
    const id = req.params.id;
    const content = req.body.content;

    const comment = new Comment({
      article: id,
      content: content,
      user: loginUser._id
    })
    await comment.save();

    res.json(await comment.populate("user"));

  } catch (error) {
    next(error)
  }
})

// 댓글 가져오기
app.get("/articles/:id/comments", auth, async (req, res, next) => {
  try {
    const loginUser = req.user;
    const id = req.params.id;
    // id에 일치하는 댓글 가져오기
    const comments = await Comment.find({ article: id })
      .populate("user")
      .sort([["created", "descending"]])
      .lean();

    // 로그인한 유저의 댓글에 대한 좋아요 정보를 추가
    for (let comment of comments) {
      const favoriteComment = await FavoriteComment
      .findOne({ user: loginUser._id, comment: comment._id });
      comment.isFavorite = favoriteComment ? true : false;
    }
    res.json(comments);

  } catch (error) {
    next(error)
  }
})

// 댓글 삭제
app.delete("/comments/:id", auth, async (req, res, next) => {
  try {
    const loginUser = req.user;
    const id = req.params.id;
    // id에 일치하는 댓글을 검색
    const comment = await Comment.findById(id);

    // 로그인한 유저와 댓글의 작성자가 일치하지 않는 경우
    if(loginUser._id.toString() !== comment.user.toString()) {
      const err = new Error("User not mach")
      err.status = 400;
      return next(err)
    }
    
    await comment.delete();

    res.end();

  } catch (error) {
    next(error)
  }
})

// 댓글 좋아요
app.post("/comments/:id/favorite", auth, async (req, res, next) => {
  try {
    // 로그인한 유저
    const loginUser = req.user;
    const id = req.params.id;
    // id에 일치하는 댓글을 찾는다
    const comment = await Comment.findById(id);
    // favoriteComment document가 있는지 찾는다
    const favoriteComment = await FavoriteComment
    .findOne({ user: loginUser._id, comment: comment._id })

    // 이미 좋아요를 누른 댓글인 경우
    if (favoriteComment) {
      const err = new Error("Aleady favorite comment");
      err.status = 400;
      return next(err)
    }

    // 새로운 favoriteComment 데이터를 만든다
    const newFavoriteComment = new FavoriteComment({
      user: loginUser._id,
      comment: comment._id
    })
    await newFavoriteComment.save();

    // id에 일치하는 댓글의 좋아요를 1증가 
    comment.favoriteCount++;
    await comment.save();
    res.end();
  } catch (error) {
    next(error)
  }
})

// 댓글 좋아요 취소
app.delete("/comments/:id/favorite", auth, async (req, res, next) => {
  try {
    const loginUser = req.user;
    const id = req.params.id;
    // id에 일치하는 댓글을 찾는다
    const comment = await Comment.findById(id);
    // favoriteComment document가 있는지 찾는다
    const favoriteComment = await FavoriteComment.findOne({ user: loginUser._id, comment: comment._id })

    // 좋아요를 누른 게시물이 아닌 경우
    if (!favoriteComment) {
      const err = new Error("NO comment to unfavorite");
      err.status = 400;
      return next(err)
    }

    // favoriteComment document 를 삭제
    await favoriteComment.delete();

    // id에 일치하는 댓글의 좋아요를 1감소
    comment.favoriteCount--;
    await comment.save();

    res.end();

  } catch (error) {
    next(error)
  }
})

// 유저 검색
app.get("/search", auth, async(req,res,next)=>{
  try {
    const username = req.query.username;
    const patt = new RegExp("^"+username);
    // req.query로 전달된 username에 일치하는 유저를 검색한다
    const users = await User.find({
      username: {$regex: patt}
    });
    res.json(users)
  } catch (error) {
    next(error)
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
