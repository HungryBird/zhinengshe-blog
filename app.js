const mysql = require('mysql');
const express = require('express');
const static = require('express-static');
const bodyParser = require('body-parser');
const multer = require('multer');  //处理上传的文件
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const consolidate = require('consolidate');
const ejs = require('ejs');
const opn = require('opn');

const db = mysql.createPool({host: 'localhost', user: 'root', password: '123456', database: 'blog'});

const app = express();

//解析cookie
app.use(cookieParser('1g321jkj21a87sd80a8sd7089asd'));

//使用session
let arr = [];
for(let i = 0; i < 100000; i++) {
	arr.push('keys_' + Math.random());
}
app.use(cookieSession({name: 'demo_id', keys: arr, maxAge: 20*60*60*1000}));

//输出什么东西

app.set('view engine', 'html');

//模板引擎放在哪

app.set('views', './template');

//哪种模板引擎

app.engine('html', consolidate.ejs);

//接受用户请求

app.get('/', (req, res, next)=>{
	//查询banner的东西
	db.query("SELECT * FROM banner_table", (err, data)=> {
		if(err) {
			res.status(500).send('database err').end();
		}else{
			res.banners = data;

			next();
		}
	});
});

app.get('/', (req, res, next)=>{
	//查询news列表
	db.query("SELECT ID, title, summary FROM article_table", (err, data)=> {
		if(err) {
			res.status(500).send('database error').end();
		}else{
			res.news = data;
			next();
		}
	})
});

app.get('/', (req, res, next)=>{
	res.render('index.ejs', {
		banners: res.banners, 
		articles: res.news
	});
});


app.get('/article', (req, res, next)=> {
	res.render('conText.ejs', {});
});

app.use(static('./www'));

app.listen(3001);

opn('http://localhost:3001');