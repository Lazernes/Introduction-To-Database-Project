const mysql = require('mysql2');

// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');

// MySQL 연결 설정
const connection = mysql.createConnection({
  host: 'localhost', // MySQL 서버 호스트
  user: 'root',   // MySQL 사용자 이름
  password: 'qpalzm7801@', // MySQL 비밀번호
  database: 'dbproj' // 사용할 데이터베이스 이름
});

// MySQL 연결
connection.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
  } else {
    console.log('MySQL 연결 성공!');
    // 여기서 쿼리 또는 다른 작업 수행
    // 예: connection.query('SELECT * FROM users', (error, results) => { /* 결과 처리 */ });
    // var sql1 = 'UPDATE char_data SET level=?, gem_level=?, elixir=?, transcendence=?, Devil=? WHERE name=?';
    // var params = ['1632.5', '9.6', '회심40', '75', '6.03', '티라미수프라페'];
    // connection.query(sql1, params, function(err,rows, fields) {
    //   if(err)
    //     console.log(err);
    //   else {
    //     for(var i=0; i<rows.length;i++) {
    //       console.log(row[i].description);
    //     }
    //   }
    // });
    var sql = 'INSERT INTO char_data (name, level, gem_level, elixir, transcendence, Devil) VALUES(?, ?, ?, ?, ?, ?)';
var params = ['짹키창', '1655', '10', '회심40', '105', '6.13'];
connection.query(sql, params, function(err, rows, fields) {
  if(err)
    console.log(err)
  else {
    console.log(rows);
  }
})

connection.end();
  }
});

// var sql = 'INSERT INTO char_data (name, level, gem_level, elixir, transcendence, Devil) VALUES(?, ?, ?, ?, ?, ?)';
// var params = ['사신대행소울이터', '1600', '7.5', 'null', '0', '6.01'];
// connection.query(sql, params, function(err, rows, fields) {
//   if(err)
//     console.log(err)
//   else {
//     console.log(rows);
//   }
// })

// var sql1 = 'UPDATE char_data SET level=?, gem_level=?, elixir=?, transcendence=?, Devil=? WHERE name=?';
// var params = ['1620', '9.0', '회심40', '30', '6.11', '사신대행소울이터'];
// connection.query(sql1, params, function(err,rows, fields) {
//   if(err)
//     console.log(err);
//   else {
//     for(var i=0; i<rows.length;i++) {
//       console.log(row[i].description);
//     }
//   }
// });
// connection.end();

// app.set('views', './views_mysql');
// app.set('view engine', 'jade');
// app.locals.pretty = true;

// app.use(bodyParser.urlencoded({extended: false}));

// 연결 종료 예제 (실제 애플리케이션에서는 필요에 따라 사용)
// connection.end();

// 에러 핸들링
connection.on('error', (err) => {
  console.error('MySQL 연결 에러:', err);
});

// 애플리케이션 종료 시 MySQL 연결 종료
process.on('SIGINT', () => {
  connection.end();
  process.exit();
});
