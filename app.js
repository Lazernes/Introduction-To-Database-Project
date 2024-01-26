var express = require('express');
var app = express(); // 함수를 실행하면 application을 반환
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'localhost', // MySQL 서버 호스트
  user: 'root',   // MySQL 사용자 이름
  password: 'qpalzm7801@', // MySQL 비밀번호
  database: 'dbproj' // 사용할 데이터베이스 이름
});
conn.connect();

app.set('views', './views_mysql');
app.set('view engine', 'jade');
//app.set('views', './views_file');
app.locals.pretty = true;
app.use(bodyParser.urlencoded({extended: true})); // true Value의 타입을 제한하지 않는다. false Value가 문자열, 배열이 될 수 있다.

app.use(express.static('public'));

app.get('/', function(req, res) {
	res.sendfile('main.html');
}); // 사용자가 get 방식으로 접속, / : 그냥 홈에 접속


/// 캐릭터 등록
app.get('/char_data/new', function(req,res) {
  res.sendfile('enroll_char.html')
});

app.post('/char_data', function(req, res) {
  var name = req.body.name;
  var level = req.body.level;
  var gem_level = req.body.gem_level;
  var elixir = req.body.elixir;
  var transcendence = req.body.transcendence;
  var Devil = req.body.Devil;

  var sql = 'INSERT INTO char_data (name, level, gem_level, elixir, transcendence, Devil) values (?, ?, ?, ?, ?, ?)';
  var params = [name, level, gem_level, elixir, transcendence, Devil];

  conn.query(sql, params, function(err, rows, fields) {
    if(err)
      console.log(err);
    else {
      //res.send('Success!');
      res.sendfile('main.html')
    }
  });
});

app.get('/char_data', function(req, res) {
  var sql = 'SELECT * FROM char_data';

  conn.query(sql, function(err, rows, fields) {
    if(err)
      console.log(err);
    else{
      res.render('view', {char_datas: rows});
    }
  });
});

app.post('/char_data/:name/edit', function(req, res) {
  var name= req.body.name;
  var level = req.body.level;
  var gem_level =req.body.gem_level;
  var elixir = req.body.elixir;
  var transcendence = req.body.transcendence;
  var Devil = req.body.Devil;

  var sql = 'UPDATE char_data SET level=?, gem_level=?, elixir=?, transcendence=?, Devil=? WHERE name=?';
  var params = [level, gem_level, elixir, transcendence, Devil, name];

  conn.query(sql, params, function(err, rows, fields) {
    if(err)
      console.log(err);
    else {
      res.send('수정');
    }
  })
})
////// 캐릭터 등록 끝

////// 파티 등록
app.get('/party_data/new', function(req,res) {
  res.sendfile('enroll_party.html')
});

app.post('/party_data', function(req, res) {
  var Raid_Select = req.body.Raid_Select;
  var Raid = req.body.Raid;
  var captain_name = req.body.captain_name;
  var party_level = req.body.party_level;
  var cur_num = req.body.cur_num;
  var pref = req.body.pref;

  var sql = 'INSERT INTO party_data (Raid_Select, Raid, captain_name, party_level, cur_num, pref) values (?, ?, ?, ?, ?, ?)';
  var params = [Raid_Select, Raid, captain_name, party_level, cur_num, pref];
  
  conn.query(sql, params, function(err, rows, fields) {
    if(err)
      console.log(err);
    else {
      res.sendfile('main.html')
    }
  });
});

app.get('/party_data_Legend', function(req, res) {
  var sql = 'SELECT * FROM party_data WHERE Raid_Select = "군단장레이드"';

  conn.query(sql, function(err, rows, fields) {
    if(err)
      console.log(err);
    else{
      res.render('Legend', {party_datas: rows});
    }
  });
});

app.get('/party_data_Urbis', function(req, res) {
  var sql = 'SELECT * FROM party_data WHERE Raid_Select = "어비스레이드"';

  conn.query(sql, function(err, rows, fields) {
    if(err)
      console.log(err);
    else{
      res.render('Urbis', {party_datas: rows});
    }
  });
});

app.get('/party_data_Kazeros', function(req, res) {
  var sql = 'SELECT * FROM party_data WHERE Raid_Select = "카제로스레이드"';

  conn.query(sql, function(err, rows, fields) {
    if(err)
      console.log(err);
    else{
      res.render('Kazeros', {party_datas: rows});
    }
  });
});

app.get('/party_data_Epic', function(req, res) {
  var sql = 'SELECT * FROM party_data WHERE Raid_Select = "에픽레이드"';

  conn.query(sql, function(err, rows, fields) {
    if(err)
      console.log(err);
    else{
      res.render('Epic', {party_datas: rows});
    }
  });
});


// app.post('/char_data/:name/edit', function(req, res) {
//   var name= req.body.name;
//   var level = req.body.level;
//   var gem_level =req.body.gem_level;
//   var elixir = req.body.elixir;
//   var transcendence = req.body.transcendence;
//   var Devil = req.body.Devil;

//   var sql = 'UPDATE char_data SET level=?, gem_level=?, elixir=?, transcendence=?, Devil=? WHERE name=?';
//   var params = [level, gem_level, elixir, transcendence, Devil, name];

//   conn.query(sql, params, function(err, rows, fields) {
//     if(err)
//       console.log(err);
//     else {
//       res.send('수정');
//     }
//   })
// })

///// 파티 등록 끝


/////////////////////////////////
app.get('/topic/new', function(req,res) {
  res.sendfile('form.html')
})

app.post('/topic', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;

  fs.writeFile('data/'+title, description, function(err) {
    if(err){
      console.log(err);
      res.status(500).send('Inernal Server Error!');
    }
    res.send('Succeess!');
  });
//  res.send(title + ',' + description);
});

app.get('/topic', function(req, res) {
  fs.readdir('data', function(err, files) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error!');
    }
    res.render('view', {topics: files});
  });
});

app.get('/topic/:title', function(req, res) {
  var title = req.params.title;

  fs.readFile('data/' + title, 'utf-8', function(err, data) {
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error!');
    }
    res.send(data);
  })
});

///////////////////////////////////////////////////////
app.listen(3000, function() {
	console.log('connected 3000 port');
});