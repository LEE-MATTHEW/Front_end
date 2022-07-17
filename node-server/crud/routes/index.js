var express = require('express');
var router = express.Router();
var fs = require('fs');

// # 라우터
// 요청받은 url에 일치하는 controller에 연결시킨다

// # MVC 패턴 : model(데이터베이스)-view(사용자에게 보여지는 것)-controller(사용자의 요청을 라우터로 부터 받아 Model에 전달) 패턴으로 가장 많이 사용하는 소프트웨어 개발 패턴

// # CRUD : 유저의 모든 행동 (읽고, 쓰고, 수정, 삭제 등)

// # http method
// GET (Read) : 게시물을 읽는 요청
// -- 대부분의 요청이 GET이다
// POST (Create) : 게시물을 만드는 요청
// PUT (Update) : 게시물을 업데이트하는 요청
// DELETE (Delete) : 게시물을 삭제하는 요청

/* GET home page. */
// req : 클라이언트의 요청(request)
// res : 서버의 응답(response)
// next : error핸들러에 전달하는 callback
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Blogs' });
// });

router.get('/', (req,res,next)=> {
  // fs.readdir(경로, callback)
  // 경로에 있는 파일을 읽고 파일 이름을 array로 return한다
  fs.readdir('data/', (err, posts) => {
    console.log(posts)
    if (err) {
      return next(err);
    }
    res.render('index', {title: 'Blogs', posts})
  })
})

router.get('/about', (req,res,next)=> {
  res.render('about', {title: 'About'});
});

// # Create
router.get('/create', (req,res,next)=> {
  res.render('blog_form', {title: 'Blog Form'});
});

router.post('/create', (req,res,next)=>{
  console.log(req.body)
  // fs.writeFile(새로운 파일, 새로운 파일의 내용, callback)
  // 새로운 파일을 만들고 callback을 실행
  fs.writeFile(`data/${req.body.title}.txt`,req.body.content,(err)=>{
    if (err) {
      // error발생시 error handler에 전달
      return next(err);
    };

    // 에러가 없을 시에, blog list로 이동한다
    res.redirect('/');
  })
})

// # Read
router.get('/p/:postTitle', (req,res,next)=>{
  // req.params : url로 전달받은 parameter
  // fs.readFile(파일이름, callback) : 해당하는 파일을 읽고 callback 실행
  // callback의 인자로 error, 파일의 내용을 전달한다
  fs.readFile(`data/${req.params.postTitle}`,(err,content)=> {
    if (err) {
      return next(err);
    }
    const post = {title: req.params.postTitle, content};
    res.render('blog_detail', {title: 'Blog',post});
  })
})

// # Update
router.get('/p/:postTitle/update',(req,res,next) => {
  fs.readFile(`data/${req.params.postTitle}`,(err,content)=> {
    if (err) {
      return next(err)
    }
    const post = {title: req.params.postTitle, content}
    res.render('blog_form', {title:'Blog', post})
  })
})

// # Delete
router.post(`/p/:postTitle/delete`,(req,res,next)=> {
  // res.status(200).send({message:"OK"})
  fs.unlink(`data/${req.params.postTitle}`, (err) =>{
    if(err) {
      return next(err)
    }
    res.end();
  })
})

module.exports = router;
