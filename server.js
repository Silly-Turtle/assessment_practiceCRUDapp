const list = require('./models.js');
const controllers = require('./controllers')
const express = require('express');
app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const path = require('path');
var assert = require('assert');
const mongoose = require('mongoose');
const uri = 'mongodb://echoy20:password12@ds135747.mlab.com:35747/assessment'
const db = mongoose.connect(uri, {useNewUrlParser: true});
mongoose.connection.once('open', () => console.log('database up and running!'));

app.set('view engine', 'ejs');
app.get('/', controllers.find, (req,res) => {
  res.status(200).render(path.join(__dirname, 'index.ejs'), {tasks: res.locals.taskList})
})

app.post('/newtask', controllers.create, (req, res) => {
  res.redirect('/')
})

app.post('/updatetask', controllers.update, (req, res) => {
  res.redirect('/')
})

app.post('/deletetask', controllers.delete, (req,res) => {
  res.redirect('/')
})


app.listen(3000, () => console.log('listening live on port 3000!!!!'))
