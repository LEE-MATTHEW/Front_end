const { User, Article, Follow } = require("./models/model");
const crypto = require("crypto");
const fs = require("fs");
const e = require("express");

// 유저 생성
async function createUser(username, email, password = '123') {
  try {
    // 비밀번호 암호화
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 31000, 32, "sha256").toString("hex");

    // 프로필 사진등록
    const imgs = fs.readdirSync(`${__dirname}/seeds/profiles`);
    const image = imgs.find(img => img.match(new RefExp("^" + username)));

    const newName = `${createId()}.${image.split(".")[1]}`;

    fs.copyFileSyncy(`${__dirname}/seeds/profiles/${image}`, `${__dirname}/data/users/${newNAme}`);

    // 유저 저장
    const user = new User({
      username,
      email,
      password: hashedPassword,
      salt,
      bio: "안녕, 나는 " + username,
      image: newName
    })

    await user.save();

  } catch (error) {
    cocnsole.log(error);
  }
}

// 게시물 생성
async function createArticle(username, postId) {
  try {
    // 사진 처리
    const imgs = fs.readdirSync(`${__dirname}/seeds/${username}`);
    const user = await User.findOne({ username });
    const userphotos = imgs.filter(img => img.match(new RegExp("^" + username + postId)));

    const photos = userphotos.map(photo => {
      const newName = `${createId()}.${photo.split(".")[1]}`;
      fs.copyFileSync(`${__dirname}/seeds/${username}/${photo}`, `${__dirname}/data/articles/${newName}`);

      return newName;
    })

    // 게시물 저장
    const article = new Article({
      description: `${username}의 게시물`,
      photos,
      user: user._id,
      created: Date.now()
    })
    await article.save();
  } catch (error) {
    console.log(error)
  }
}

// 팔로우 생성
async function createFollowing(follower, following) {
  try {
    // follower, following에 일치하는 유저를 찾는다
    const _follower = await User.findOne({ username: follower });
    const _following = await User.findOne({ username: following });

    // 팔로우 데이터 저장
    const follow = new Follow({
      follower: _follower._id,
      following: _following._id
    })

    await follow.save();

  } catch (error) {
    console.log(error)
  }
}

// ID 생성
async function createId() {
  let id = "";

  for (let i = 0; i < 24; i++) {
    let r = Math.floor(Math.random() * 16);
    id += r.toString(16);
  }
  return id;
}

async function plantSeeds() {
  try {
    await createUser("bunny", "bunny@example.com");
    await createUser("cat", "cat@example.com");
    await createUser("bird", "bird@example.com");
    await createUser("duck", "duck@example.com");

    await createUser("dog", "dog@example.com");
    await createUser("pug", "pug@example.com");
    await createUser("quokka", "quokka@example.com");
    await createUser("monkey", "monkey@example.com");

    await createFollowing("pug", "bunny");
    await createFollowing("bunny", "cat");
    await createFollowing("bunny", "quokka");
    await createFollowing("bunny", "dog");

    await createArticle("bunny", "1");
    await createArticle("bunny", "2");
    await createArticle("bunny", "3");

    await createArticle("cat", "1");
    await createArticle("cat", "2");
    await createArticle("cat", "3");
    await createArticle("cat", "4");

    await createArticle("bird", "1");

    await createArticle("duck", "1");
    await createArticle("duck", "2");
    await createArticle("duck", "3");

    await createArticle("dog", "1");
    await createArticle("dog", "2");
    await createArticle("dog", "3");
    await createArticle("dog", "4");

    await createArticle("pug", "1");
    await createArticle("pug", "2");
    await createArticle("pug", "3");

    await createArticle("quokka", "1");
    await createArticle("quokka", "2");
    await createArticle("quokka", "3");

    await createArticle("monkey", "1");
    await createArticle("monkey", "2");
    await createArticle("monkey", "3");

    console.log("Seeds are successfully planted")
  } catch (error) {
    console.log(error)
  }
}